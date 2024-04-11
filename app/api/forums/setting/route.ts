import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
        const reqBody = await req.json();
        const {type, sendMsg} = reqBody;
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
        
        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string
            },
            include:{
                manager:true
            }
        });

        if(!forumChannel) return NextResponse.json({error:"Forum Channel not found"}, {status:409});
        
        let hasPermission = false;
        const whoHavePermission = forumChannel?.whoCanMakePublicToPrivate;
        const managers = forumChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = forumChannel.createdBy===member.id;
        const isMember = forumChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        const updatedType = forumChannel.type==="public" && type===true ? "private" : "public";

        if(!isAdmin && updatedType==="public"){
            return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        }
  
        
        const updateForumChannel = await db.forumsChannel.update({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string
            },
            data:{
                isEveryonePost:sendMsg,
                type:updatedType
    
            }
        })
        console.log(`channel changed to ${forumChannel?.isEveryonePost}`)
        // console.log(section); 
        if(forumChannel?.type!==updateForumChannel?.type){
            await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumChannelId as string, activityType:"Update", schemaType:"Test Channel", memberId:member.id, memberId2:null, oldData:forumChannel.type, newData:updateForumChannel.type, name:"Type Change", message:`Update the test channel ${forumChannel.type} to ${updateForumChannel.type}`}); 
        }
        return NextResponse.json({
            success:true,
            forumChannel:updateForumChannel
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
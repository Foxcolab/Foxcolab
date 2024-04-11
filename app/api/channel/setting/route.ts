import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
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
        
        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
                serverId:serverId as string
            },
            include:{
                manager:true
            }
        });
        if(!channel) return NextResponse.json({error:"Channel not found"}, {status:409});
        
        let hasPermission = false;
        const whoHavePermission = channel?.whoCanMakePublicToPrivate;
        const managers = channel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = channel.createdBy===member.id;
        const isMember = channel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        const updatedType = channel.type==="public" && type===true ? "private" : "public";

        if(!isAdmin && updatedType==="public"){
            return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        }
        
        const updatedChannel = await db.channel.update({
            where:{
                id:channelId as string,
                serverId:serverId as string,
                sectionId:channel.sectionId
            },
            data:{
                type:updatedType,                
            }
        })
        if(channel?.type!==updatedChannel?.type){
            await SchemaActivity({serverId:serverId as string, sectionId:channel?.sectionId as string, schemaId:channelId as string, activityType:"Update", schemaType:"Channel", memberId:member.id, memberId2:null, oldData:channel.type, newData:updatedChannel.type, name:"Type Change", message:`Update the test channel ${channel.type} to ${updatedChannel.type}`}); 
        }
        return NextResponse.json({
            success:true,
            channel:updatedChannel
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
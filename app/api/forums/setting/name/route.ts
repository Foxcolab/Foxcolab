import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {name} = reqBdoy;

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
    const whoHavePermission = forumChannel?.whoCanUpdateForums;
    const managers = forumChannel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isAdmin = forumChannel.createdBy===member.id;
    const isMember = forumChannel.memberIds.includes(member.id);
    if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
        hasPermission = true;
    }
    if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
    
    const updateForumChannel = await db.forumsChannel.update({
        where:{
            id:forumChannelId as string,
            serverId:serverId as string
        },
        data:{
            name

        }
    })



    await SchemaActivity({serverId:serverId as string, sectionId:forumChannel.sectionId as string, schemaId:forumChannelId as string, activityType:"Update", schemaType:"Forum Channel", memberId:member.id, memberId2:null, oldData:forumChannel.name, newData:updateForumChannel.name, name:"Name", message:"Updated the name"});
    return NextResponse.json({
        success:true,
        ForumChannel:updateForumChannel
    }, {status:200});


} catch (error) {
    
}
}
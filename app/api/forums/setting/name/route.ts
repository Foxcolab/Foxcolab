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

    console.log(forumChannelId, serverId, name)
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

    const managers = forumChannel?.manager?.memberIds;
    const isAdmin = managers?.some(m => m === member?.id);
    
    if(!isAdmin) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});

    // const section = await db.section.update({
    //     where:{
    //         id:forumChannel?.sectionId as string,
    //         serverId:serverId as string
    //     },
    //     data:{
    //         forumsChannel:{
    //             update:{
    //                 where:{
    //                     id:forumChannelId as string,
    //                     createdBy:userId,
    //                 },
    //                 data:{
    //                     name

    //                 }
    //             }
    //         }
    //     }
    // });

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
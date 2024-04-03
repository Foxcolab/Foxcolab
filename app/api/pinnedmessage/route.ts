import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        const serverId = req.nextUrl.searchParams.get('serverId');

        
        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            },
            include:{
                member:true
            }
        });
        if(!message) return NextResponse.json({error:"Message not found"}, {status:404});



        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:message?.serverId as string,
            },
            include:{
                user:true
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this sever"}, {status:404});

        const pinnedPost = await db.pinnedPost.create({
            data:{
                messageId:message?.id,
                createdBy:member.id,
                serverId:message.serverId as string,
                sectionId:message.sectionId as string,
                channelId:message.channelId as string
            },
            include:{
                message:true
            }
        });
        
        return NextResponse.json({
            success:true,
            message:"Pinned a message",
            pinnedPost
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        const pinnedId = req.nextUrl.searchParams.get('pinnedId');
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!messageId || !pinnedId) return NextResponse.json({error:"Message Id or Pinned Id is missing"}, {status:404});
        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            },
            include:{
                member:true
            }
        });
        if(!message) return NextResponse.json({error:"Message not found"}, {status:404});



        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:message?.serverId as string,
            },
            include:{
                user:true
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this sever"}, {status:404});
        const pinnedPost = await db.pinnedPost.findFirst({
            where:{
                id:pinnedId as string,
                serverId:message.serverId as string
            }
        });
        if(!pinnedPost) return NextResponse.json({error:"Pinned post not found"}, {status:404});

        const channel = await db.channel.findFirst({
            where:{
                id:pinnedPost.channelId as string,
                serverId:message.serverId as string
            },
            include:{
                manager:true
            }
        });

        const managers = channel?.manager?.memberIds;
        console.log(managers);
        const isAdmin = pinnedPost.createdBy===member.id;
        const isManager = managers?.some(m => m === member?.id);
        const hasPermission = isAdmin || isManager;
        if(!hasPermission) return NextResponse.json({error:"Permission denied"},{status:404});

         await db.pinnedPost.delete({
            where:{
                id:pinnedId as string,
                messageId:message?.id,
                serverId:message.serverId as string
            }
        });
        
        return NextResponse.json({
            success:true,
            message:"Unpinned a message",
            pinnedPost
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
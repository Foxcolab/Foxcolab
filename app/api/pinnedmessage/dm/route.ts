import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        const serverId = req.nextUrl.searchParams.get('serverId');
        const conversationId = req.nextUrl.searchParams.get('conversationId');

        
        const message = await db.directMessage.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            },
            include:{
                member:true
            }
        });
        if(!message) return NextResponse.json({error:"Message not found"}, {status:409});

        const conversation = await db.conversation.findFirst({
            where:{
                id:conversationId as string,
            },

        });
        console.log("Conversation:",conversation);

        if(!conversation) return NextResponse.json({error:"Convesation not found"}, {status:409});


        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:message?.serverId as string,
            },
            include:{
                user:true
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});

        const pinnedPost = await db.pinnedPost.create({
            data:{
                directMessageId:message.id,
                createdBy:member.id,
                serverId:message.serverId as string,
                conversationId:conversationId as string
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


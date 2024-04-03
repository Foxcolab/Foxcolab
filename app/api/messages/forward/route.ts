import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST =async(req:NextRequest)=>{
    try {
        const messageId = req.nextUrl.searchParams.get('messageId');
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');

        if(!messageId ||!serverId || !channelId) return NextResponse.json({
            error:"Something is missing"
        }, {status:400});
        const reqBody = await req.json();
        const { channelIds, content} = reqBody;
        if(!channelIds) return NextResponse.json({error:"Please enter the fields", success:false}, {status:409});
        const userId = GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            },
            include:{
                user:true
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            }
        });
        if(!message) return NextResponse.json({error:"Message not found", success:false}, {status:409});

        const forwardMessage = await db.message.create({
            data:{
                content,
                memberId:member.id,
                forwardedMessages:{
                    connect:{
                        id:messageId as string
                    }
                }
            }
        });
        


    } catch (error) {
        console.log(error)
    }
}
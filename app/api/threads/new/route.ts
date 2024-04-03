import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = await req.nextUrl.searchParams.get('serverId');
        const messageId = await req.nextUrl.searchParams.get('messageId');

        const reqBody = await req.json();
        const {content, fileUrl}  =reqBody;
        if(!content) return NextResponse.json({error:"Please enter the fields", success:false}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId,
                serverId:serverId as string
            } 
        });
        if(!member) return NextResponse.json({error:"You are not a member", success:false}, {status:400});
        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            }
        });

        if(!message) return NextResponse.json({error:"Message not found", success:false}, {status:409});

         await db.message.update({
            where:{
                id:messageId as string,
                serverId:serverId
            }, 
            data:{
                threads:{
                    create:{
                        content,
                        fileUrl,
                        createdBy:member.id,
                        serverId:serverId as string,
                        messageId:message.id

                    }
                }
            }
        });


        return NextResponse.json({
            success:true,
            message

        }, {status:200});

    } catch (error) {
        console.log(error);
         
    }
}
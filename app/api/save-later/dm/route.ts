import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        if(!messageId) return NextResponse.json({error:"Invalid message Id"}, {status:404});
        
        const reqBody = await req.json();
        const {time} = reqBody;
        console.log(time)
        const message = await db.directMessage.findFirst({
            where:{
                id:messageId as string
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
        
        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});

        const isActive = await db.later.findFirst({
            where:{
                createdBy:member.id as string,
                directMessageId:message?.id as string,
                serverId:message.serverId as string
            }
        });

        console.log("IS ACTIVE", isActive);
        let SaveLater;
        if(isActive!==null){
            SaveLater = await db.later.update({
                where:{
                    id:isActive.id as string,
                    directMessageId:isActive.messageId
                },
                data:{
                    time:time
                    // time:new Date().toISOString(),
                },
                // include:{
                //     message:true
                // }
            });
        }else {
            SaveLater = await db.later.create({
                data:{
                    directMessageId:message?.id,
                    createdBy:member?.id as string,
                    serverId:message.serverId as string,
                    time:time
                    // time:new Date().toISOString(),
                },
                // include:{
                //     message:true
                // }
            });
        }

        console.log("Saved for later");
        
        return NextResponse.json({
            success:true,
            // message:"Pinned a message",
            SaveLater
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}



export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        const laterId = req.nextUrl.searchParams.get('laterId');
        
        const message = await db.directMessage.findFirst({
            where:{
                id:messageId as string
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
        const later = await db.later.findFirst({
            where:{
                id:laterId as string,
                serverId:message.serverId as string,
                directMessageId:message.id
            }
        })
        if(!later) return NextResponse.json({error:"Pinned post not found"}, {status:404});


        const isAdmin = later.createdBy===member.id;
        if(!isAdmin) return NextResponse.json({error:"Permission denied"},{status:404});

         await db.later.delete({
            where:{
                id:laterId as string,
                directMessageId:message?.id,
                serverId:message.serverId as string
            }
        });
        
        return NextResponse.json({
            success:true,
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}



export const GET =async(req:NextRequest)=>{
    try {
        const userId =await GetDataFromToken(req);
        const member =await db.member.findFirst({
            where:{
                userId
            }
        });

        const SavedLaters = await db.later.findMany({
            where:{
                createdBy:member?.id,
                serverId:member?.serverId
            }
        });

        return NextResponse.json({
            success:true,
            SavedLaters
        }, {status:200});
    } catch (error) {
        
    }
}
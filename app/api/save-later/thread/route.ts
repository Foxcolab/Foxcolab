import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const threadId = req.nextUrl.searchParams.get('threadId');
        if(!threadId) return NextResponse.json({error:"Invalid thread Id"}, {status:404});
        // console.log
        const reqBody = await req.json();
        const {time} = reqBody;
        console.log(time)
        const thread = await db.threads.findFirst({
            where:{
                id:threadId as string
            },
            include:{
                member:true
            }
        });
        if(!thread) return NextResponse.json({error:"Message not found"}, {status:404});



        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:thread?.serverId as string,
            },
            include:{
                user:true
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});

        const isActive = await db.later.findFirst({
            where:{
                createdBy:member.id as string,
                threadId:threadId as string,
                // messageId:message?.id as string,
                serverId:thread.serverId as string
            }
        });

        console.log("IS ACTIVE", isActive);
        let SaveLater;
        if(isActive!==null){
            SaveLater = await db.later.update({
                where:{
                    id:isActive.id as string,
                    threadId:isActive.threadId as string
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
                    threadId:threadId as string,
                    createdBy:member?.id as string,
                    serverId:thread.serverId as string,
                    // sectionId:message.sectionId as string,
                    channelId:thread.channelId as string,
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
        
        const threadId = req.nextUrl.searchParams.get('threadId');
        const laterId = req.nextUrl.searchParams.get('laterId');
        
        
        const thread = await db.threads.findFirst({
            where:{
                id:threadId as string
            },
            include:{
                member:true
            }
        });
        if(!thread) return NextResponse.json({error:"Message not found"}, {status:404});



        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:thread?.serverId as string,
            },
            include:{
                user:true
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this sever"}, {status:404});
        const later = await db.later.findFirst({
            where:{
                id:laterId as string,
                serverId:thread.serverId as string,
                threadId:thread.id
            }
        })
        if(!later) return NextResponse.json({error:"Pinned post not found"}, {status:404});

        const channel = await db.channel.findFirst({
            where:{
                id:thread.channelId as string,
                serverId:thread.serverId as string
            },
            include:{
                manager:true
            }
        });

        const managers = channel?.manager?.memberIds;
        console.log(managers);
        const isAdmin = later.createdBy===member.id;
        const isManager = managers?.some(m => m === member?.id);
        const hasPermission = isAdmin || isManager;
        if(!hasPermission) return NextResponse.json({error:"Permission denied"},{status:404});

         await db.later.delete({
            where:{
                id:laterId as string,
                threadId:thread?.id,
                serverId:thread.serverId as string
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
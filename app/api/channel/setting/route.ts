import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



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
        
        const managers = channel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        
        if(!isManager) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});
  
        
        const section = await db.section.update({
            where:{
                id:channel?.sectionId as string,
                serverId:serverId as string
            },
            data:{
                channels:{
                    update:{
                        where:{
                            id:channelId as string,
                            createdBy:userId,
                        },
                        data:{
                            sendMsg,
                            type

                        }
                    }
                }
            }
        });
        console.log(`channel changed to ${channel?.sendMsg}`)
        console.log(section); 
        
        return NextResponse.json({
            success:true,
            section
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
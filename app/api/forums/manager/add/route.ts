import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, forumChannelId, managerId);
        const reqBody = await req.json();
        const {managerIds} = reqBody;
        if(managerIds.length===0) return NextResponse.json({error:"Member not found"}, {status:200})
        console.log(managerIds)
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });

        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        const managers = forumChannel?.manager?.memberIds;
        console.log(managers)
        const isManager = managers?.some(m => m === member?.id);
        console.log(isManager)

        if(!isManager) return NextResponse.json({error:"You are not authorized to add this member"}, {status:403});

        await db.forumsChannel.update({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string
            },
            data:{
                manager:{
                    update:{
                        where:{
                            id:managerId as string,
                            
                        },
                        data:{
                            memberIds:{
                                push:managerIds
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}
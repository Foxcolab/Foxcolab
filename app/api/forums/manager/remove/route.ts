import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, forumChannelId, managerId);
        const reqBody = await req.json();
        const {managerIds} = reqBody;
        console.log(managerIds)
        if(!managerIds) return NextResponse.json({error:"Member not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });

        if(!member) return NextResponse.json({error:"You are not a authorized member"}, {status:409});
        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!forumChannel) return NextResponse.json({error:"Channel not found"}, {status:409});

        const isAdmin = forumChannel.memberIds[0]===managerIds;
        if(isAdmin) return NextResponse.json({error:"You are not authorized to remove the admin from channel manager"}, {status:400});
        
        const managers = forumChannel?.manager?.memberIds;
        console.log(managers);
        
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
                                 set: forumChannel?.manager?.memberIds.filter((id)=>id!==managerIds)
                                
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
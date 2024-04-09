import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, channelId, managerId);
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
        if(!member) return NextResponse.json({error:"You are not a authorized member"}, {status:200})

        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!channel) return NextResponse.json({error:"Channel not found"}, {status:200})
        const managers = channel?.manager?.memberIds;
        console.log(managers)
        const isManager = managers?.some(m => m === member?.id);
        console.log(isManager)

        if(!isManager) return NextResponse.json({error:"You are not authorized to add this member"}, {status:403});

        await db.channel.update({
            where:{
                id:channelId as string,
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

        for(let i=0; i<managerIds.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:channel?.sectionId as string, schemaId:channelId as string, activityType:"Make Manager", schemaType:"Channel", memberId:member.id as string, memberId2:managerIds[i], oldData:null, newData:null, name:null, message:null});
        }
        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}
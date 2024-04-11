import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        const reqBody = await req.json();
        let {members} = reqBody;
        
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
                manager:{
                    include:{
                        member:true
                    }
                }
            }
        });
        if(!channel) return NextResponse.json({error:"Channel not found"}, {status:409})

        let hasPermission = false;
        const whoHavePermission = channel?.whoCanManageMember;
        const managers = channel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = channel.createdBy===member.id;
        const isMember = channel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
            

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
                            memberIds:{
                                push:members
                            }
                        }
                    }
                }
            }
        });
        console.log(section);
        for(let i=0; i<members.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:channelId as string, activityType:"Add Member", schemaType:"Channel", memberId:member.id, memberId2:members[i], oldData:null, newData:null, name:null, message:"Add a new member"});
        }
        
        
        // console.log(section.channels.member);
        
        return NextResponse.json({
            success:true,
            section
        }, {status:200});

    } catch (error) {
        
    }
}
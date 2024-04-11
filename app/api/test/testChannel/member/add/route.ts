import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testChannelId = req.nextUrl.searchParams.get('testChannelId');
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
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                // serverId:serverId as string
            },
            include:{
                manager:{
                    include:{
                        member:true
                    }
                }
            }
        });
        if(!testChannel) return NextResponse.json({
            error:"Test Channel Not Found"
        });

        let hasPermission = false;
        const whoHavePermission = testChannel?.whoCanManageMember;
        const managers = testChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = testChannel.createdBy===member.id;
        const isMember = testChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
  
        const section = await db.section.update({
            where:{
                id:testChannel?.sectionId as string,
                serverId:serverId as string
            },
            data:{
                TestChannels:{
                    update:{
                        where:{
                            id:testChannelId as string,
                            createdBy:userId,
                        },
                        data:{
                            memberIds:{
                                push:members
                            }
                            // Members:{
                            //     connect: members.map(member => ({ id: member })),
                            // }
                        }
                    }
                }
            }
        });
        // console.log(section);

       
        // console.log(section.channels.member);
        
        for(let i=0; i<members.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:testChannelId as string, activityType:"Add Member", schemaType:"Test Channel", memberId:member.id, memberId2:members[i], oldData:null, newData:null, name:null, message:"Added a member"});
        }


        return NextResponse.json({
            success:true,
            section
        }, {status:200});

    } catch (error) {
        
    }
}
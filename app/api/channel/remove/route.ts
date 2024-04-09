



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const channelId = req.nextUrl.searchParams.get('channelId');
       
        const userId = GetDataFromToken(req);
        // const user = await db.user.findFirst({where:{id:userId}});

        const currentMember = await db.member.findFirst({
          where:{
            userId:userId as string,
            serverId:serverId as string
          }
        })
        if(!currentMember) return NextResponse.json({error:"Member not found"}, {status:409});

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
        if(!channel) return NextResponse.json({error:"Channel not found"}, {status:409});
        const sectionId= channel?.sectionId;
        const managers = channel?.manager?.memberIds;
    
        const isAdmin = managers?.some(m => m === member?.id);
        if(!isAdmin) return NextResponse.json({error:"You are not authorized to remove this member"}, {status:403});

        const member = await db.member.findFirst({
          where:{
            id:memberId as string,
            serverId: serverId as string
          }
        });
        if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
      
        
        const section = await db.section.update({
          where:{
            id:sectionId as string,
            serverId:serverId as string,
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
                          set: channel?.memberIds.filter((id)=>id!==memberId)
                        },
                        manager:{
                          update:{
                            where:{
                              channelId:channelId as string,
                            },
                            data:{
                              memberIds:{
                                set: channel?.manager?.memberIds.filter((id)=>id!==memberId)
                              }
                            }
                          }
                        }
                    }
                }
              }
            
         }
        })


          await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:channelId as string, activityType:"Remove Member", schemaType:"Channel", memberId:member.id, memberId2:memberId, oldData:null, newData:null, name:null, message:null});


        return NextResponse.json({
            success:true,
            section
        }, {status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}






import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const channelId = req.nextUrl.searchParams.get('channelId');
       
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

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
                        createdBy:user?.id,
                        
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

        console.log(section);
        


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


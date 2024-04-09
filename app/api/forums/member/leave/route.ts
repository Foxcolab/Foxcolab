



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
       
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const member = await db.member.findFirst({
            where:{
              userId:userId as string,
              serverId: serverId as string
            }
          });
          if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
        


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string,
                Members:{
                    some:{
                        userId:userId as string
                    }
                },
            },
            include:{
                manager:true
            }
        });
        if(!forumChannel) return NextResponse.json({error:"Something is wrong"}, {status:403});

        const sectionId= forumChannel?.sectionId;
   
        
        const section = await db.section.update({
          where:{
            id:sectionId as string,
            serverId:serverId as string,
          },
            data:{
              forumsChannel:{
                update:{
                    where:{
                        id:forumChannelId as string,
                        createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: forumChannel?.memberIds.filter((id)=>id!==member.id)
                        },
                        manager:{
                          update:{
                            where:{
                              forumId:forumChannelId as string,
                            },
                            data:{
                              memberIds:{
                                set: forumChannel?.manager?.memberIds.filter((id)=>id!==member.id)
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
        
        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumChannelId as string, activityType:"Left", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:null, name:"Member", message:"Left the forum"});

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






import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
       
        const userId =await GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const member = await db.member.findFirst({
            where:{
              userId:userId as string,
              serverId: serverId as string
            }
          });
          if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
        


        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
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
        if(!channel) return NextResponse.json({error:"Something is wrong"}, {status:403});

        const sectionId= channel?.sectionId;
   
        
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
                        // createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: channel?.memberIds.filter((id)=>id!==member.id)
                        },
                        manager:{
                          update:{
                            where:{
                              channelId:channelId as string,
                            },
                            data:{
                              memberIds:{
                                set: channel?.manager?.memberIds.filter((id)=>id!==member.id)
                              }
                            }
                          }
                        }
                    }
                }
              }
            
         }
        })

        await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:channelId as string, activityType:"Left", schemaType:"Channel", memberId:member.id, memberId2:null, oldData:null, newData:null, name:null, message:"Left the channel"});


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






import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testChannelId = req.nextUrl.searchParams.get('testChannelId');
       
        const userId =await GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const member = await db.member.findFirst({
            where:{
              userId:userId as string,
              serverId: serverId as string
            }
          });
          if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
        


        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                Members:{
                    some:{
                        // userId:userId as string
                    }
                },
            },
            include:{
                manager:true
            }
        });
        if(!testChannel) return NextResponse.json({error:"Something is wrong"}, {status:403});

        const sectionId= testChannel?.sectionId;
   
        
        const section = await db.section.update({
          where:{
            id:sectionId as string,
            serverId:serverId as string,
          },
            data:{
              TestChannels:{
                update:{
                    where:{
                        id:testChannelId as string,
                        // createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: testChannel?.memberIds.filter((id)=>id!==member.id)
                        },
                        manager:{
                          update:{
                            where:{
                              testChannelId:testChannelId as string,
                            },
                            data:{
                              memberIds:{
                                set: testChannel?.manager?.memberIds.filter((id)=>id!==member.id)
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
        await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:testChannelId as string, activityType:"Left", schemaType:"Test Channel", memberId:member.id, memberId2:null, oldData:null, newData:null, name:null, message:"Member left from test channel"});


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


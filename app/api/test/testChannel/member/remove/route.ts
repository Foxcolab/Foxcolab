



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const testChannelId = req.nextUrl.searchParams.get('testChannelId');

       
        const userId = GetDataFromToken(req);
        if(!userId) return NextResponse.json({error:"User Id not found"}, {status:409});

        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
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
        if(!testChannel) return NextResponse.json({error:"Test Channel not found"}, {status:409});
        console.log(testChannel.id)
        const sectionId= testChannel?.sectionId;
    
        const member = await db.member.findFirst({
          where:{
            userId:userId as string,
            serverId: serverId as string
          }
        });
        if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
      
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
            id:sectionId as string,
            serverId:serverId as string,
          },
            data:{
              TestChannels:{
                update:{
                    where:{
                        id:testChannelId as string,
                        serverId:serverId as string,
                        
                    },
                    data:{
                        memberIds:{
                          set: testChannel?.memberIds.filter((id)=>id!==memberId)
                        },
                        manager:{
                          update:{
                            where:{
                              testChannelId:testChannelId as string,
                            },
                            data:{
                              memberIds:{
                                set: testChannel?.manager?.memberIds.filter((id)=>id!==memberId)
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
        
        await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:testChannelId as string, activityType:"Remove Member", schemaType:"Test Channel", memberId:member.id, memberId2:memberId, oldData:null, newData:null, name:null, message:"Remove a member"});

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


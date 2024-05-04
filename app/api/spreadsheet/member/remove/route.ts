



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
       
        const userId = GetDataFromToken(req);
        // const user = await db.user.findFirst({where:{id:userId}});

        const currentMember = await db.member.findFirst({
          where:{
            userId:userId as string,
            serverId:serverId as string
          }
        })
        if(!currentMember) return NextResponse.json({error:"Member not found"}, {status:409});

        const spreadsheets = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
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
        if(!spreadsheets) return NextResponse.json({error:"Channel not found"}, {status:409});
        const sectionId= spreadsheets?.sectionId;

        let hasPermission = false;
        const whoHavePermission = spreadsheets?.whoCanManageMember;
        const managers = spreadsheets?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadsheets.createdBy===currentMember.id;
        const isMember = spreadsheets.memberIds.includes(currentMember.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
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
              spreadsheets:{
                update:{
                    where:{
                        id:spreadsheetId as string,
                        // createdBy:userId,
                        
                    },
                    data:{
                        memberIds:{
                          set: spreadsheets?.memberIds.filter((id)=>id!==memberId)
                        },
                        manager:{
                          update:{
                            where:{
                              spreadsheetId:spreadsheetId as string,
                            },
                            data:{
                              memberIds:{
                                set: spreadsheets?.manager?.memberIds.filter((id)=>id!==memberId)
                              }
                            }
                          }
                        }
                    }
                }
              }
            
         }
        })


          await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:spreadsheetId as string, activityType:"Remove Member", schemaType:"SpreadSheet", memberId:member.id, memberId2:memberId, oldData:null, newData:null, name:null, message:null});


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


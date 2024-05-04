



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
       
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const member = await db.member.findFirst({
            where:{
              userId:userId as string,
              serverId: serverId as string
            }
          });
          if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
        


        const spreadsheets = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
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
        if(!spreadsheets) return NextResponse.json({error:"Something is wrong"}, {status:403});

        const sectionId= spreadsheets?.sectionId;
   
        
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
                        // createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: spreadsheets?.memberIds.filter((id)=>id!==member.id)
                        },
                        manager:{
                          update:{
                            where:{
                              spreadsheetId:spreadsheetId as string,
                            },
                            data:{
                              memberIds:{
                                set: spreadsheets?.manager?.memberIds.filter((id)=>id!==member.id)
                              }
                            }
                          }
                        }
                    }
                }
              }
            
         }
        })

        await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:spreadsheetId as string, activityType:"Left", schemaType:"SpreadSheet", memberId:member.id, memberId2:null, oldData:null, newData:null, name:null, message:"Left the spreadsheet spreadsheets"});


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


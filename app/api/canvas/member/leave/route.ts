



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
       
        const userId =await GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const member = await db.member.findFirst({
            where:{
              userId:userId as string,
              serverId: serverId as string
            }
          });
          if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
        


        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
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
        if(!canvas) return NextResponse.json({error:"Something is wrong"}, {status:403});

        const sectionId= canvas?.sectionId;
   
        
        const section = await db.section.update({
          where:{
            id:sectionId as string,
            serverId:serverId as string,
          },
            data:{
              canvas:{
                update:{
                    where:{
                        id:canvasId as string,
                        // createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: canvas?.memberIds.filter((id)=>id!==member.id)
                        },
                        manager:{
                          update:{
                            where:{
                              canvasId:canvasId as string,
                            },
                            data:{
                              memberIds:{
                                set: canvas?.manager?.memberIds.filter((id)=>id!==member.id)
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
        
        await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Left", schemaType:"Canvas", memberId:member.id as string, memberId2:null, oldData:null, newData:null, name:"Member", message:"Added a new member"});

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


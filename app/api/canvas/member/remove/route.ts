



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
       
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});

        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
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
        const sectionId= canvas?.sectionId;
        const managers = canvas?.manager?.memberIds;
    
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
              canvas:{
                update:{
                    where:{
                        id:canvasId as string,
                        createdBy:user?.id,
                        
                    },
                    data:{
                        memberIds:{
                          set: canvas?.memberIds.filter((id)=>id!==memberId)
                        },
                        manager:{
                          update:{
                            where:{
                              canvasId:canvasId as string,
                            },
                            data:{
                              memberIds:{
                                set: canvas?.manager?.memberIds.filter((id)=>id!==memberId)
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


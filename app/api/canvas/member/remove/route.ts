



import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const memberId = req.nextUrl.searchParams.get('memberId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
       
        const userId = GetDataFromToken(req);
        // const user = await db.user.findFirst({where:{id:userId}});

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
        if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});
        const member = await db.member.findFirst({
          where:{
            userId:userId as string,
            serverId: serverId as string
          }
        });
        if(!member){return NextResponse.json({error:"Member not found"}, {status:400})};
      
        const sectionId= canvas?.sectionId;
        let hasPermission = false;
        const whoHavePermission = canvas?.whoCanManageMember;
        const managers = canvas?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = canvas.createdBy===member.id;
        const isMember = canvas.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        console.log(hasPermission)
        
        // const section = await db.section.update({
        //   where:{
        //     id:sectionId as string,
        //     serverId:serverId as string,
        //   },
        //     data:{
        //       canvas:{
        //         update:{
        //             where:{
        //                 id:canvasId as string,
        //                 createdBy:user?.id,
                        
        //             },
        //             data:{
        //                 memberIds:{
        //                   set: canvas?.memberIds.filter((id)=>id!==memberId)
        //                 },
        //                 manager:{
        //                   update:{
        //                     where:{
        //                       canvasId:canvasId as string,
        //                     },
        //                     data:{
        //                       memberIds:{
        //                         set: canvas?.manager?.memberIds.filter((id)=>id!==memberId)
        //                       }
        //                     }
        //                   }
        //                 }
        //             }
        //         }
        //       }
            
        //  }
        // })
        const Updatecanvas = await db.canvas.update({
          where:{
            id:canvasId as string,
            serverId:serverId as string
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
          
        })

        console.log(Updatecanvas);
        await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Remove Member", schemaType:"Canvas", memberId:member.id as string, memberId2:memberId, oldData:null, newData:null, name:"Member", message:"Removed a member"});


        return NextResponse.json({
            success:true,
            Updatecanvas
        }, {status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}


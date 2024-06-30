import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import { CreateActivityLog } from "../../activityLog/ActivityLog";

export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const { name, description, type  } = reqBody;
        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        if(!serverId || !sectionId) return NextResponse.json({error:"Semething went wrong"}, {status:409});
        
        const userId =await GetDataFromToken(req);
        const server = await db.server.findFirst({
          where:{
              id:serverId as string,
              Members:{
                  some:{
                      userId:userId
                  }
              },

          },
          include:{
              Members:{
                  where:{
                      userId:userId
                  }
              }
          }
      })

      if(!server ) return NextResponse.json({success:false, message:"Server not found"}, {status:409});

      const member = server.Members[0];
      let hasPermission = false;
      const whoCanUpdate = server.whoCreateSpreadsheet;
      if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
          hasPermission = true;
      }

      if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
            


        const channel = await db.spreadsheets.create({
          data:{
                  name,
                  description,
                  type,
                  createdBy:member.id as string,
                  serverId:serverId as string,
                  sectionId:sectionId as string,
                  memberIds:[member.id],
                  Members:{
                    connect:[{id:member.id}]
                  },
                  manager:{
                    create:{
                      serverId:serverId as string,
                      sectionId:sectionId as string,
                      memberIds:[member.id],
                      member:{
                        connect:{
                          id:member.id
                        }
                      }
                    }
                  }
          },
          include:{
            manager:{
              include:{
                member:true
              }
            }
          }
        })
 
       
        await CreateActivityLog(serverId, member.id, "Created", "Spreadsheet", name, '' );


        return NextResponse.json({
            success:true,
        }, {status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}


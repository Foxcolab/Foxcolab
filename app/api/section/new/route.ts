import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";
import { CreateActivityLog } from "../../activityLog/ActivityLog";
export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const { name,serverId  } = reqBody;
        
        if(!name) return NextResponse.json({success:false, message:"Please enter all the fields"}, {status:409});
        // const serverId = req.nextUrl.searchParams.get('serverId');
        console.log(serverId);

        const userId = GetDataFromToken(req);
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
      const whoCanUpdate = server.whoCreateSection;
      if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
          hasPermission = true;
      }

      if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
      
    
    
       const updatedServer = await db.server.update({
        where: {
          id: serverId,
          Members: {
            some: {
              userId: userId,
              role: {
                in: [MemberRole.admin, MemberRole.moderator]
              }
            }
          }
        },
        data: {
          sections: {
            create: {
              createdBy: userId,
              name,
            }
          }
        }
      });

        await CreateActivityLog(serverId, member.id, "Created", "Section", name, "" );
        
        return NextResponse.json({
            success:true,
            updatedServer
        }, {status:200})

    }catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}
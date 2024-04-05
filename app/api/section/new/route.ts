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
        const member = await db.member.findFirst({
          where:{
            userId:userId as string,
            serverId:serverId as string
          }
        })
        if(!member) return NextResponse.json({success:false, message:"Member not found"}, {status:409});
       const server = await db.server.update({
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
        console.log(server);

        await CreateActivityLog(serverId, member.id, "Created", "Section", name, "" );
        
        return NextResponse.json({
            success:true,
            server
        }, {status:200})

    }catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}
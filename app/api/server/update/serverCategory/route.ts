import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({error:"Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        
        const reqBody = await req.json();
        const {serverType} = reqBody;
        console.log(serverType)
        if(!serverType) return NextResponse.json({error:"ServerType not found"}, {status:409});
        let server = await db.server.findFirst({
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
        const whoCanUpdate = server.whoCanUpdateServer;
        if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});



         server = await db.server.update({
            where:{
                id:serverId as string
            },
            data:{
                serverType:serverType
            }
        });
        await CreateActivityLog(serverId, member.id, "Updated", "Server", serverType, "Server Type" );
        return NextResponse.json({success:true, server}, {status:200});
    } catch (error) {
        
    }
}
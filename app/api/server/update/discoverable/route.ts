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
        let {discoverable, type} = reqBody;
        console.log("NAME->>>>", discoverable, type);
        if(!type) return NextResponse.json({error:"Type not found"}, {status:409});

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
        const whoCanUpdate = server.whoCanUpdateServer;
        if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});

        discoverable = type==="private" ? false : discoverable;
        console.log(discoverable);

        const updatedServer = await db.server.update({
            where:{
                id:serverId as string
            },
            data:{
                type:type,
                discoverable:discoverable
            }
        });
        console.log(server);
        console.log("name updated successfully");
        return NextResponse.json({success:true, server:updatedServer}, {status:200});
    } catch (error) {
        
    }
}
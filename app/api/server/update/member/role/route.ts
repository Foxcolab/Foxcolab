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
        const {role, memberId} = reqBody;
        console.log("NAME->>>>", role, memberId);
        if(!role || !memberId) return NextResponse.json({error:"Name not found"}, {status:409});

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
        if(!server) return NextResponse.json({success:false, message:"Server not found"}, {status:409});
        let updatedMember = await db.member.findFirst({
            where:{
                id: memberId,
                serverId:serverId as string
            }
        });
        if(!updatedMember) return NextResponse.json({error:"Member not found"}, {status:409});
        const member = server.Members[0];
        let hasPermission = false;
        // const whoCanUpdate = server.whoCanUpdateServer;
        if(updatedMember?.role==="admin"){
            hasPermission = false;
        }else if((updatedMember?.role==="moderator" || updatedMember?.role==="user") && (member.role==="admin" || (member.role==="moderator" && role!=="admin"))){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        

        
     

        updatedMember = await db.member.update({
            where:{
                id:memberId,
                serverId:serverId as string
            },
            data:{
               role:role
            }
        })

        console.log("Member updated successfully");
        return NextResponse.json({success:true, updatedMember}, {status:200});
    } catch (error) {
        console.log(error);
    }
}
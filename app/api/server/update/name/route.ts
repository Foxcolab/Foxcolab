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
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member || (member.role!=="admin" && member.role!=="moderator")) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {name} = reqBody;
        console.log("NAME->>>>", name);
        if(!name) return NextResponse.json({error:"Name not found"}, {status:409});
        const server = await db.server.update({
            where:{
                id:serverId as string
            },
            data:{
                name:name
            }
        });
        console.log("name updated successfully");
        await CreateActivityLog(serverId, member.id, "Updated", "Server", name, "Name" );

        return NextResponse.json({success:true, server}, {status:200});
    } catch (error) {
        
    }
}
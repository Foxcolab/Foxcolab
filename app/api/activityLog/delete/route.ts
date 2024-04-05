import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const activityLogId = req.nextUrl.searchParams.get('activityLogId');

        if(!serverId || !activityLogId) return NextResponse.json({error:"Something went wrong"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

        const isAdmin = member.role==="admin" || member.role==="moderator";
        if(!isAdmin) return NextResponse.json({error:"You are not authorized to delete the activity logs. "}, {status:409});

        const activityLog = await db.activityLog.findFirst({
            where:{
                id:activityLogId,
                serverId:serverId
            }
        });
        if(!activityLog) return NextResponse.json({error:"Activity log not found"}, {status:409});
        const deletedActivityLog = await db.activityLog.delete({
            where:{
                id:activityLogId,
                serverId:serverId
            }
        });

        return NextResponse.json({
            success:true,
        }, {status:200})
        

    } catch (error) {
        console.log(error);
    }
}
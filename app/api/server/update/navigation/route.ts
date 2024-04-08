import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({error:"Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        let member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member ) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const { navigations } = reqBody;
        console.log(navigations);
        
        member = await db.member.update({
            where:{
                id:member.id,
                serverId:serverId as string
            },
            data:{
                navigations:navigations
            }
        })
        console.log("Navigation");
        return NextResponse.json({success:true, member}, {status:200});
    } catch (error) {
        
    }
}
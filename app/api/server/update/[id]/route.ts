import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";

export const PUT =async(req:NextRequest)=>{
    try {
        const id = req.nextUrl.searchParams.get('id');
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const member = await db.member.findFirst({where:{userId:userId}})
        if(!member || member.role==="user" || member.role==="guest") return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {name, description, type, displayPic, coverPic} = reqBody;
        
        // const server = await db.server.update({where:{id:id}, data:{}})


    } catch (error) {
        
    }

}


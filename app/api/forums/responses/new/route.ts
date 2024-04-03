import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST =async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {serverId, sectionId, forumsId, content, fileUrl} = reqBody;
        if(!forumsId || !serverId || !sectionId || !content) return NextResponse.json({message:"Something went wrong"}, {status:409});
        const userId = await GetDataFromToken(req);
        const response = await db.forumsResponse.create({
            data:{
                forumsId,
                serverId,
                sectionId,
                content,
                fileUrl,
                userId:userId
            }
        })

        return NextResponse.json({
            message:"Message submitted successfully",
            success:true
        }, {status:200});
    } catch (error) {
        console.log(error);
        
    }
}
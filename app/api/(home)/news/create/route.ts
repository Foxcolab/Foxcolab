import { NextRequest, NextResponse } from "next/server";
import {db} from "@/prisma"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";


export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {title, content} = reqBody;
        if(!title || !content ) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"User Id not found"
        }, {status:409});

       const news = await db.news.create({
        data:{
            title,
            content
        }
       })

        return NextResponse.json({
            success:true,
            news
        }, {status:200});
    } catch (error) {
        
    }
}
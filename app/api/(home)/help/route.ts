import { NextRequest, NextResponse } from "next/server";
import {db} from "@/prisma"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";


export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {title, content, categoryId} = reqBody;
        if(!title || !content || !categoryId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"User Id not found"
        }, {status:409});

       const help = await db.help.create({
        data:{
            title,
            content,
            categoryId
        }
       })

        return NextResponse.json({
            success:true,
            help
        }, {status:200});
    } catch (error) {
        
    }
}
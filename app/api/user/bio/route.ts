import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const userId =await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const reqBody =await req.json();
        const {bio} = reqBody;
        if(!bio) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });
        if(!user) return NextResponse.json({
            error:"User not found"
        }, {status:404});

        const updateUser = await db.user.update({
            where:{
                id:userId
            },
            data:{
                bio:bio
            }
        })

        return NextResponse.json({
            message:"Bio updated successfully"
        }, {status:200})
       

    } catch (error) {
        
    }
}
import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";



export const GET =async(req:NextRequest)=>{
    try {
        const userId =await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

       
        cookies().set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });



        return NextResponse.json({
            message:"Logout successfully"
        }, {status:200})
       

    } catch (error) {
        
    }
}
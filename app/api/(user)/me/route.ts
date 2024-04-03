import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";

export const GET =()=>async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);

        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });
        return NextResponse.json({
            success:true,
            user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export const PUT = async(req:NextRequest)=>{
    try {
    const reqBody = req.json();
    const userId = await GetDataFromToken(req);
    const user = await db.user.findFirst({
        where:{
            id:userId
        }
    })

    return NextResponse.json({
        success:true,
        status:200,
        message:"User Updated successfully",
        user
    })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export const DELETE = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const user = await db.user.delete({
            where:{
                id:userId
            }
        })
        return NextResponse.json({
            success:true,
            status:200,
            message:"User deleted successfully"
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}




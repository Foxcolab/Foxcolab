import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";




export const PUT = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const user =await db.user.findFirst({
            where:{
                id:userId
            }
        });
        // const user = await User.findById(userId);
        if(user?.role!=="admin"){
            return NextResponse.json({error:"You are not authorized to use this feature"},{status:400});
        }
        // const id = param 
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
        
    }
}
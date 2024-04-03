import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";


export const GET = async(req:NextRequest)=>{
    try {
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });
        if(user?.role!=="admin"){
            return NextResponse.json({error:"You are not authorized to use this feature"},{status:400});
        }
        // const users = await User.find({role:"user"});

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
        
    }
}







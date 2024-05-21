import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {email} = reqBody;
        if(!email) return NextResponse.json({error:"Email id missing"}, {status:409});
        const user = await db.user.findFirst({
            where:{
                email:email
            }
        });
        let isFound = false;
        let isSpecial = false;

        if(user){
            isFound = true;
            if(user.googleId!==null || user.githubId!==null){
                isSpecial = true;
            }
        }
        
        console.log(user, isFound, isSpecial)

        return NextResponse.json({
            success:true,
            isSpecial, isFound
        }, {status:200});

    } catch (error) {
        console.log(error);
    }
}
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import {cookies} from "next/headers"




export const POST = async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {userId, otp} = reqBody;
        console.log(userId, otp);
        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });

        if(!user) return NextResponse.json({error:"Something went wrong"}, {status:409});
        if(user.otp!= otp) return NextResponse.json({error:"OTP is incorrect"}, {status:409});

        const currentTime = new Date();
        console.log(currentTime, user.resetTokenExpiryIn);
        console.log(currentTime.getTime(), user.resetTokenExpiryIn?.getTime());
        console.log(currentTime.getTime()<=user.resetTokenExpiryIn?.getTime())
        if(currentTime.getTime()>user?.resetTokenExpiryIn?.getTime()){
            return NextResponse.json({error:"OTP is expired"}, {status:409});
        }

        const updatedUser = await db.user.update({
            where:{
                id:userId
            },
            data:{
                verified:true,
                otp:null,
                resetTokenExpiryIn:null
            }
        });

        const tokenData = {
                id:updatedUser.id,
                name:updatedUser.name,
                email:updatedUser.email
            }
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"30d"});
            cookies().set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",     
            })

        return NextResponse.json({success:true}, {status:200});


    } catch (error) {
        
    }
}
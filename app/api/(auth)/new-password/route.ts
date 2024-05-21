
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { db } from "@/prisma";
import { cookies } from "next/headers";



export const POST = async(req:NextRequest)=>{
    const reqBody = await req.json();
    const {userId, password} = reqBody;
    if(!userId || !password) return NextResponse.json({error:"Please enter the fields"}, {status:409});
    // const user = await User.findOne({email});
    const user = await db.user.findFirst({where:{id:userId}});
    if(!user) {
        return NextResponse.json({
            error:"Please enter your registered email id",
           
        }, {status:401})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateUser = await db.user.update({
        where:{
            id:userId as string
        },
        data:{
            password:password
        }
    }) 
   
  
    const tokenData = {
        id:user.id,
        username:user.name,
        email:user.email
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn:"30d"});
    
    cookies().set("token",token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",     
    });

    return NextResponse.json({
        message: "Login successful",
        success: true,
        user
    })

};


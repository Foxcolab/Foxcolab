
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { db } from "@/prisma";
import { cookies } from "next/headers";



export const POST = async(req:NextRequest)=>{
    const reqBody = await req.json();
    const {email, password} = reqBody;
    
    if(!email || !password) return NextResponse.json({error:"Please enter the fields"}, {status:409});
    // const user = await User.findOne({email});
    const user = await db.user.findFirst({where:{email:email}});
    if(!user) {
        return NextResponse.json({
            error:"Please enter your registered email id",
           
        }, {status:401})
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return NextResponse.json({
            error:"Incorrect email id or password",
        }, {status:401})
    }
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


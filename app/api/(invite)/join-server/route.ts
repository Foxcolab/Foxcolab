import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const POST =async(req:NextRequest)=>{
    try {
        const reqody = await req.json();
        const {email, otp, inviteCode} = reqody;
        console.log(email, otp, inviteCode);
        
        if(!email || !otp) return NextResponse.json({success:false, error:"Please provide all the details"},{status:400});

        const user = await db.user.findFirst({
            where:{
                email,
                otp
            }
        });
        console.log("USER", user?.id);
        
        if(!user)return NextResponse.json({success:false, error:"Wrong OTP"},{status:400});

        
        const server = await db.server.findFirst({
            where:{
                inviteCode
            }
        });
        if(!server){return NextResponse.json({success:false, error:"Invitation code has expired."},{status:400});}
        const exitingServer = await db.server.findFirst({
            where:{
                inviteCode,
                Members:{
                    some:{
                        userId:user.id
                    }
                }
            },
        });
        if(exitingServer) return NextResponse.json({
            success:true,
            message:`OTP verified.`,
            serverId: server.id,
        }, {status:200}); 

        
        console.log("SERVER",server);
        
        await db.server.update({
            where:{
                id:server.id
            },
            data:{
                Members:{
                    create:[{
                        userId:user.id,
                        role:'user'
                    }]
                }
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
        console.log("OTP VERIFIED");
        if(user.verified===false){
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{
                    otp:null,
                    verified:true
                }
            });
        }
        return NextResponse.json({
            success:true,
            message:`OTP verified.`,
            serverId: server.id,
        }, {status:200}); 

    } catch (error) {
        console.log(error);
        
    }
    
}
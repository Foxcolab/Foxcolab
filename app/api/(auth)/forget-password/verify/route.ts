
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "@/prisma";
import {cookies} from "next/headers"

function test_str(str:any){
    var idx = str.indexOf('@');
    var res = str.replace(str.slice(2, idx-1), "*".repeat(5));
    return res;
}

      
export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {userId, otp} = reqBody;
            
            if(!userId) return NextResponse.json({error:"Enter all the fields"},{status:400})
            
 // hash password
            
            
            
            const user = await db.user.findFirst({
                where:{
                    id:userId,
                }
            })
            console.log(user);
            if(!user) return NextResponse.json({
                error:"Email id not found!"
            }, {status:409});
     
                const update = await db.user.update({
                    where:{
                        id:userId
                    },
                    data:{
                        verified:true,
                        otp:null,
                    }
                });

                return NextResponse.json({success:true,userId:user.id}, {status:200});
            
   

          
            
    } catch (error:any) {        
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
    
    };



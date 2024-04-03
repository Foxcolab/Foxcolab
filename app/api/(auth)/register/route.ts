
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
        const {username,name, email, password} = reqBody;
            console.log(username, name, email, password);
            
            if(!username || !email || !password) return NextResponse.json({error:"Enter all the details"},{status:400})
            

            const user = await db.user.findFirst({where:{email:email}});
            console.log(user);
            
            if(user){
                return NextResponse.json({error:"User already exists"}, {status:400})
            }
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // const otp = Math.floor(100000 + Math.random() * 900000);
            // const resetTokenExpiryIn = Date.now() + 1000*60*60;
        
            // const newUser = new User({
            //     username,
            //     name,
            //     password:hashedPassword,
            //     email
            //     // emailOTP: otp,
            //     // resetTokenExpiryIn
            // })
            
            // await newUser.save();
            const newUser = await db.user.create({
                data:{
                    username,
                    name,
                    password:hashedPassword,
                    email,
                    // emailOTP: otp,
                    // resetTokenExpiryIn
                },
            })
        
            console.log(newUser);
            const tokenData = {
                id:newUser.id,
                username:newUser.name,
                email:newUser.email
            }
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"15d"});
            cookies().set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",     
            })
            return NextResponse.json({                
                success:true,
                user:newUser
            }, {status:200});
            // return response.cookies.set("token",token, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none",     
            // });
            
    } catch (error:any) {        
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
    
    };


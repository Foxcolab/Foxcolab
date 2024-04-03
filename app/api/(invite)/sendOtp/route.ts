import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt"
export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {email,name, password} = reqBody;
        console.log(email, name);
        if(!email || !name || !password){return NextResponse.json({error:"Enter all the fields"},{status:400})}
        const existingUser = await db.user.findFirst({
            where:{
                email
            }
        });
        // if(existingUser) return NextResponse.json({error:"Email id already used."}, {status:400});
        const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(!existingUser){
            const user = await db.user.create({
                data:{
                    email,
                    name,
                    password:hashedPassword,
                    verified:false,
                    otp
                    
                }
            });
    }else {
        await db.user.update({
            where:{
                id:existingUser?.id,
            },
                data:{
                    otp
                }
            
        })
    }
        const subject = `Foxcolab Confirmation code ${otp}`;
        
        const message = `
        
        <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
      
      <h1>Foxcolab</h1>
      <h2>Hello ${name}</h2>
        <h2>Confirm your email address</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the OTP to continue.</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>
        `;







        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_EMAIL_ADDRESS,
              pass: process.env.GMAIL_APP_PASSWORD,
            },
          });
          const Options = {
            from: process.env.SMTP_USER,
            to:email,
            subject:subject,
            html: message
          }
      
            transporter.sendMail(Options,(err:any, info:any)=>{
                if (err) {
                    console.log(`Connection refused at ${err.address}`);
                    
                    return NextResponse.json({
                        error:`Connection refused at ${err.address}`
                    }, {status:404});
                  } else {
                    console.log(`Message sent to ${email}`);
                    console.log(info);
                    
                    return NextResponse.json({
                        message:`Invitation sent to ${email}`
                    }, {status:200});
            } });
            return NextResponse.json({
                success:true,
                message:`Invitation sent to ${email}`
            }, {status:200}); 
    } catch (error) {
        console.log(error);
    }
}
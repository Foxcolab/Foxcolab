import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";



export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        if(!email || !password) return NextResponse.json({error:"Password missing"}, {status:409});

        const user = await db.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user) return NextResponse.json({error:"Something went wrong"}, {status:409});
        const validPassword = await bcrypt.compare(password, user.password);


        if(!validPassword) return NextResponse.json({error:"Incorrect password"}, {status:409});

        const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false });
        const currentTime = new Date();
        const update = await db.user.update({
            where:{
                id:user.id,
            },
            data:{
                otp:parseInt(otp),
                otpGenerate:currentTime
            }
        });
        const subject = `Foxcolab Confirmation code ${otp}`;

        
        const message = `
        
        <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
      
      <h1>Foxcolab</h1>
      <h2>Hello ${user.name}</h2>
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
            
        }, {status:200});

    } catch (error) {
        console.log(error);
    }
}
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";

export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {to,name, link} = reqBody;
        console.log(to, name);
        
        const userId = GetDataFromToken(req);
        console.log(userId);
        
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const user = await db.user.findFirst({where:{id:userId}});
        const subject = `${user?.name} has invited you to work with them in Foxcolab`;
        const message = `
        
        <div style="margin:3rem 10%; color:black; background-Color:white;padding:1rem 1rem; border-radius:0.3rem"> 
        <h1> Foxcolab </h1>
        <h2>Join your team on Foxcolab </h2>
        <h4> ${user?.name} (${user?.email}) has invited you to use Foxcolab with them, in a server called ${name}.</h4>
        <div>
        <div style="text-align:center">
          <a style="background-Color:#0C2D57; padding:0.7rem 1.1rem; outline:none; border:none; border-radius:0.3rem;color:white; text-align-center; text-decoration:none; margin-top:5rem;" target='_blank' href=${link} >Join Now </a>
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
            to:to,
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
                    console.log(`Message sent to ${to}`);
                    console.log(info);
                    
                    return NextResponse.json({
                        message:`Invitation sent to ${to}`
                    })
            } });
            
    } catch (error) {
        console.log(error);
    }
}
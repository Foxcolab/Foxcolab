import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";

export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {to,name, link, userName, serverAvatar} = reqBody;
        console.log(to, name);
        
        const userId =await GetDataFromToken(req);
        console.log(userId);
        
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const user = await db.user.findFirst({where:{id:userId}});
        const subject = `${user?.name} has invited you to work with them in Foxcolab`;
        // const message = `
        
        // <div style="margin:3rem 10%; color:black; background-Color:white;padding:1rem 1rem; border-radius:0.3rem"> 
        // <h1> Foxcolab </h1>
        // <h2>Join your team on Foxcolab </h2>
        // <h4> ${user?.name} (${user?.email}) has invited you to use Foxcolab with them, in a server called ${name}.</h4>
        // <div>
        // <div style="text-align:center">
        //   <a style="background-Color:#0C2D57; padding:0.7rem 1.1rem; outline:none; border:none; border-radius:0.3rem;color:white; text-align-center; text-decoration:none; margin-top:5rem;" target='_blank' href=${link} >Join Now </a>
        // </div>
              
        // `;

      const message = `

      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
      
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
          </o:OfficeDocumentSettings>
        </xml>
        
      
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
     
          <title>Foxcolab Invitation Email</title>

        <head>
          <style> 
            a,a[href],a:hover, a:link, a:visited {
             text-decoration: none!important;
              color: #f8921e; 
            }
            .link {
              text-decoration: underline!important;
            }
            p, p:visited {
              /* Fallback paragraph style */
              font-size:15px;
              line-height:24px;
              font-family:'Raleway',Raleway, sans-serif;
              font-weight:300;
              text-decoration:none;
              color: #000000;
            }
            h1 {
              /* Fallback heading style */
              font-size:22px;
              line-height:24px;
              font-family:'Raleway', Raleway, sans-serif;
              font-weight:normal;
              text-decoration:none;
              color: #fb9000;
              
            }
            .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
            .ExternalClass {width: 100%;}
            .fcc-btn {
        background-color: #4f4480;
        color: white;
        padding: 15px 25px;
        text-decoration: none;
      }
            /* Button Styleee
      * 
      */
      button, button a, .button{
        position:relative;
        /* style|variant|weight|size/line-height|family */
        font: 500 14px Raleway;
        letter-spacing: 0.5px;
        color:#fff !important;
        border: 0;
        border-radius: 5px;
        cursor:pointer;
        text-decoration:none;
      }
      
      button, .button{
        min-width: 100px;
        margin: 10px 5px;
        padding:8px 10px;
        background-color: #4f4680;/* for non linear-gradient browsers */
        background: linear-gradient(to bottom, #9d7eb9 5%, #4f4680 100%) repeat scroll 0 0 #9d7eb9;
      }
      
      .button{display:inline-block;min-width:80px;text-align:center;white-space:nowrap;}
      
      button:hover,a.button:hover{
        background:linear-gradient(to bottom, #4f4680 5%, #9d7eb9 100%) repeat scroll 0 0 #9d7eb9;
      }
      button:active{top:1px;}
      
      
      body{
        background-color:#222; 
      }
      #buttonC{margin:0px auto;width:500px;}
      
      
           
          </style>
        
      
      </head>
      
        <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #ffffff; color: #000000" align="center">
        
        <div style="text-align: center;">
      
          
          <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="596">
            <tbody>
              <tr>
                <td style="width: 600px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 0px; padding-bottom: 0px;" width="600; font-size:24px">
                <h1 style="font-size: 26px; line-height: 20px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none; color:#000000;">Foxcolab</h1>
                
                  
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End container for logo -->

          <!-- Hero image -->
          <h1 style="font-size: 20px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none;color:#000000; ">   Join your team on Foxcolab</h1>
       
          <!-- Hero image -->
      
          <!-- Start single column section -->
          
          <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
              <tbody>
                <tr>
                  <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">
      
                   
                    
                    <h1 style="font-size:24px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none; color: #4d467c;">
                    ${userName} has invited you to use foxcolab in a workspace called <b>${name}</b>.</h1>
                    
       
      
                    <h1 style="font-size: 20px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none; color: #ed9520; text-align:left;">What is Foxcolab?</h1>
                    
                    
                    <p style="font-size: 15px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 400; text-decoration: none; color: #919293;text-align: justify;">Foxcolab is a messaging app for teams, a place you can collaborate on projects and organize conversations — so you can work together, no matter where you are.</p> 
                    
                    
                   <a class="button" href=${link} target="_blank">Join Now</a>
                    
                    
                    <!-- button link with CSS start -->
                    <!-- bigger
      
   
                    
     
                </tr>
              </tbody>
            </table>
          
        </div>
      
        </body>
      
      </html>`





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
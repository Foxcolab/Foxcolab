
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "@/prisma";
import {cookies} from "next/headers"
import { sendMail } from "../../(invite)/sendmail/verifyMail/route";

function test_str(str:any){
    var idx = str.indexOf('@');
    var res = str.replace(str.slice(2, idx-1), "*".repeat(5));
    return res;
}

      
export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const {email} = reqBody;
            
            if(!email) return NextResponse.json({error:"Enter all the fields"},{status:400})
            
 // hash password
            
            
            const otp = Math.floor(100000 + Math.random() * 900000);
            let resetTokenExpiryIn = Date.now() + 1000*60*60;
            const resetTime = new Date(resetTokenExpiryIn);
            
            const user = await db.user.findFirst({
                where:{
                    email:email,
                }
            })
            console.log(user);
            if(!user) return NextResponse.json({
                error:"Email id not found!"
            }, {status:409});
     
                const update = await db.user.update({
                    where:{
                        email:email
                    },
                    data:{
                        verified:false,
                        otp:otp,
                        resetTokenExpiryIn:resetTime,
                    }
                });

                EmailVerify(email,otp);
                return NextResponse.json({success:true,userId:user.id, message:`OTP has been sent to your email id ${test_str(user.email)}`}, {status:200});
            
   

          
            
    } catch (error:any) {        
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
    
    };




 const EmailVerify = (to:string, otp:number)=>{
    try {
        
        const subject = `Your Foxcolab regisration OTP is ${otp}`;
        const message = `

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        
        <head>
        
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          
        
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
       
            <title>Foxcolab registration OTP</title>
  
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
            <h1 style="font-size: 20px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none;color:#000000; ">  Finishing registration into Foxcolab</h1>
         
            <!-- Hero image -->
        
            <!-- Start single column section -->
            
            <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
                <tbody>
                  <tr>
                    <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">
        
                     
                      
                      <h1 style="font-size:24px; line-height: 24px; font-family: Releway, sans-serif; font-weight: 600; text-decoration: none; color: #4d467c;">
                      Your OTP is ${otp}. Enter it in your browser and we'll get you signed in. 
                     </h1>
                      
         
        
                     
                      
                      
                      
                      
                      <!-- button link with CSS start -->
                      <!-- bigger
        
     
                      
       
                  </tr>
                </tbody>
              </table>
            
          </div>
        
          </body>
        
        </html>`
        
        
        sendMail(to, subject, message);
    } catch (error) {
        
    }

}   
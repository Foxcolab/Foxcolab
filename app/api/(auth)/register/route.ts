
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
        const {name, email, password} = reqBody;
            console.log( name, email, password);
            
            if(!name || !email || !password) return NextResponse.json({error:"Enter all the fields"},{status:400})
            
 // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const otp = Math.floor(100000 + Math.random() * 900000);
            let resetTokenExpiryIn = Date.now() + 1000*60*60;
            const resetTime = new Date(resetTokenExpiryIn);
            
            const user = await db.user.findFirst({
                where:{
                    email:email,
                }
            })
            console.log(user);
            
            if(user && user.verified){
                return NextResponse.json({error:"Email id already exists"}, {status:400})
            }else if(user && !user.verified){
                const user = await db.user.update({
                    where:{
                        email:email
                    },
                    data:{
                        verified:false,
                        otp:otp,
                        resetTokenExpiryIn:resetTime,
                        password:hashedPassword
                    }
                });

                EmailVerify(email,otp);
                return NextResponse.json({success:true,userId:user.id, message:`OTP has been sent to your email id ${test_str(user.email)}`}, {status:200});
            }
   
            const newUser = await db.user.create({
                data:{
                    name:name,
                    password:hashedPassword,
                    email,
                    verified:false,
                    otp:otp,
                    resetTokenExpiryIn:resetTime
                },
            })
        
            console.log(newUser)
            EmailVerify(email,otp);

            return NextResponse.json({success:true, userId:newUser.id, message:`OTP has been sent to your email id ${test_str(newUser.email)}`}, {status:200});

          
            
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
        <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}
		.social_img img{
			width: 2.2rem;
    		height: 2.2rem;
		}

		@media (max-width:620px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body class="body" style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
	
<td class="pad " style="display: flex; align-items: center; gap: 0.5rem;">
	<!-- <img src="https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Black+%26+White+Minimalist+Business+Logo.png" alt="" style="height: 3.0rem; width: auto;"> -->
<h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder" style="display: flex;border-radius: 0.25rem;overflow: hidden;"><span style="background-color: #E04D6C;padding: 0.2rem 0.5rem;border: 1px solid #E04D6C;color: white;">Fox</span> <span style="padding: 0.2rem 0.5rem;border: 1px solid hsl(97, 5%, 28%);border-left: none;border-top-right-radius: 0.25rem;border-bottom-right-radius: 0.25rem;">Colab</span></span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 35px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 42px;"><span class="tinyMce-placeholder">Confirm your email address</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#2c2e30;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">Your confirmation code is below – enter it in your open browser window and we'll help you to sign in.I'm a new paragraph block.</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f7; border-radius: 2px; color: #000000; width: 600px; margin: 0 auto;" width="600">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:30px;">
<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:35px;font-weight:400;letter-spacing:8px;line-height:200%;text-align:center;mso-line-height-alt:70px;">
<p style="margin: 0;"><strong><span style="background-color: #f5f5f7;">${otp}</span></strong></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:30px;">
<div style="color:#585d62;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:18px;">
<p style="margin: 0;">If you haven’t requested this email, there’s nothing to worry about – you can safely ignore it.</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:20px;display: flex;
align-items: center;justify-content: space-between;" >
<!-- <div style="color:#585d62;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:24px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:36px;">
<p style="margin: 0;"><strong>Foxcolab</strong></p>
</div> -->
<h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder" style="display: flex;border-radius: 0.25rem;overflow: hidden;"><span style="background-color: #E04D6C;padding: 0.2rem 0.5rem;border: 1px solid #E04D6C;color: white;">Fox</span> <span style="padding: 0.2rem 0.5rem;border: 1px solid hsl(97, 5%, 28%);border-left: none;border-top-right-radius: 0.25rem;border-bottom-right-radius: 0.25rem;">Colab</span></span></h1>
<div>
	<a href=""  class="social_img"><img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt=""></a>
	<a href=""  class="social_img"><img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt=""></a>
	<a href=""  class="social_img"><img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt=""></a>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;">
<div style="color:#959ca3;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px; ">
<p style="margin: 0; margin-bottom: 4px;"><a href="https://foxcolab.com" rel="noopener" style="text-decoration: underline; color: #959ca3;" target="_blank">Our blog</a> | <a href="https://foxcolab.com" rel="noopener" style="text-decoration: underline; color: #959ca3;" target="_blank">Policies</a> | <a href="https://foxcolab.com" rel="noopener" style="text-decoration: underline; color: #959ca3;" target="_blank">Help Center</a> | <a href="https://foxcolab.com" rel="noopener" style="text-decoration: underline; color: #959ca3;" target="_blank">Foxcolab Community</a></p>
<p style="margin: 0; margin-bottom: 4px;"> </p>
<p style="margin: 0; margin-bottom: 4px;">@2024 Foxcolab, 118 SN Bose, Durgapur ,713205</p>
<p style="margin: 0;">All rights reserved.</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tr>


</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>
        
        `;

        
        
        sendMail(to, subject, message);
    } catch (error) {
        
    }

}   
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";

export const POST = async(req:NextRequest)=>{
    try {
        const reqBody =await req.json();
        const serverId = await req.nextUrl.searchParams.get('serverId');
        const {to,name, link, userName, serverAvatar} = reqBody;
        console.log(to, name);
        
        const userId =await GetDataFromToken(req);
        console.log(userId);
        
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const user = await db.user.findFirst({where:{id:userId}});
        if(!user) return NextResponse.json({
          error:"User not found"
        }, {status:409});

        const server = await db.server.findFirst({
          where:{
            id:serverId as string,
            Members:{
              some:{
                userId:userId
              }
            }
          },
          include:{
            Members:{
              include:{
                user:true
              },
            },
            displayPicture:true
          }
        })

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

      const message = `<!DOCTYPE html>

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
      <td class="pad">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder" style="display: flex;border-radius: 0.25rem;overflow: hidden;"><span style="background-color: #E04D6C;padding: 0.2rem 0.5rem;border: 1px solid #E04D6C;color: white;">Fox</span> <span style="padding: 0.2rem 0.5rem;border: 1px solid hsl(97, 5%, 28%);border-left: none;border-top-right-radius: 0.25rem;border-bottom-right-radius: 0.25rem;">Colab</span></span></h1>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad">
      <h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 35px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 42px;">Accept ${userName} invitation to ${name}</h1>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td class="pad">
      <div style="color:#2c2e30;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
      <p style="margin: 0;"><strong>${user?.name}</strong> (<a href="mailto:${user?.email}" rel="noopener" style="text-decoration: underline; color: #7747FF;" target="_blank">${user?.email}</a>) has invited you to use Foxcolab with them, in a workspace called <strong>${name}</strong>.</p>
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
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f7; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad" style="width:100%;">
      <div align="center" class="alignment" style="line-height:10px">
      <div style="height: 4rem;width: 4rem;overflow: hidden;object-fit: cover;border-radius: 0.3rem;overflow: hidden;margin-top: 1rem;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"><img height="auto" src="${server?.displayPicture?.publicUrl===null || server?.displayPicture?.publicUrl===undefined ? 'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/pexels-codioful-7130560+(1).jpg' : server?.displayPicture?.publicUrl }" style="display: block; height: 100%;
      width: auto;" /></div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad">
      <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38.4px;"><strong>${name}</strong></h1>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td class="pad">
      <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
      <p style="margin: 0;"><span class="tinyMce-placeholder">${server?.description}.</span></p>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad">
      <div align="center" class="alignment"><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:105px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7747FF">
      <w:anchorlock/>
      <v:textbox inset="0px,0px,0px,0px">
      <center dir="false" style="color:#ffffff;font-family:Arial, sans-serif;font-size:16px">
      <![endif]-->
      <div style="background-color:#7747FF;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Join Now</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td class="pad">
      <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
      <p style="margin: 0;">Join the conversation with <strong>${server?.Members[0].user?.name}</strong> and many more.</p>
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
      <div style="color:#585d62;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:19px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:22.8px;">
      <p style="margin: 0;">Once you join, you can always get updates from workspace <strong>${name}.</strong></p>
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
      <td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:30px;">
      <div style="color:#020202;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
      <p style="margin: 0;"><strong>What is Foxcolab?</strong></p>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td class="pad" style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:10px;">
      <div style="color:#8d8e90;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:20.4px;">
      <p style="margin: 0;">Foxcolab is a collaborating app for teams, a place where you can collaborate on projects and organise conversations – so you can work together, no matter where you are.</p>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad">
      <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><a href="https://foxcolab.com" rel="noopener" style="text-decoration: underline; color: #7747FF;" target="_blank">Learn more about Foxcolab</a></h1>
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
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
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
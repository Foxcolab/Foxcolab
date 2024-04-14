import { NextRequest, NextResponse } from "next/server";
import {S3Client, PutObjectAclCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import axios from "axios";
// const s3Client = new S3Client({
//     region:process.env.AWS_REGION,
//     credentials:{
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

const s3Client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY as string,
    }
})

const UploadFileToS3=async(file, fileName, type)=>{
    const fileBuffer = file;
    
    const params = {
        Bucket:process.env.AWS_S3_BUCKET_NAME,
        Key:`${Date.now()}-${fileName}`,
        Body:fileBuffer, 
        ContentType:type,
        // ContentType:type,
        
    }
    
    // const command = new PutObjectAclCommand(params);
    const command = new PutObjectCommand(params);
    
     await s3Client.send(command);
    
    
    return params.Key;

}

export const POST =async(req:NextRequest)=>{
    try {

        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({error:"serverId  not found"}, {status:409});


         const formData = await req.formData();
        //  console.log(formData);
         const userId = await GetDataFromToken(req);
         const member = await db.member.findFirst({
            where:{
                userId:userId
            },
            include:{
                user:true
            }
         })
         if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
         
         let video = formData.get('file');

         console.log(video);

        
         
         
        //  
         if(!video) return NextResponse.json({error:"File not found"}, {status:400});

         const buffer = Buffer.from(await video.arrayBuffer());
         console.log(buffer);
         

         const dt = new Date()
        const fileName = dt.getTime()

        
            const key = await UploadFileToS3(buffer, `${member?.user?.name}${fileName}.mp4`, "video/mp4");
            
            const file = await db.uploadedFile.create({
                data:{
                    name:`${member?.user?.name}${fileName}.mp4`,
                    serverId:serverId,
                    createdBy:member?.id,
                    type:"video",
                    fileType:"video/mp4",
                    size:video.size,
                    publicUrl:`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
                
                }
            });

            
         
            const fileUrl = file.id; 
        //  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
         
         console.log(fileUrl);
         
          
         return NextResponse.json({success:true, fileUrl:fileUrl, name:key}, {status:200});   
    } catch (error) {
        console.log(error);
        
    }
}
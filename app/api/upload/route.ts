import { NextRequest, NextResponse } from "next/server";
import {S3Client, PutObjectAclCommand, PutObjectCommand} from "@aws-sdk/client-s3"


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
        Key:`${fileName}-${Date.now()}**${type}`,
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
         const formData = await req.formData();
         console.log(formData);
         
         const files = formData.getAll('file');
        // const reqBody = await req.json();
        console.log(files);
        
        // const {files} = reqBody;
        //  console.log(files[0]);
        //  
         if(!files) return NextResponse.json({error:"File not found"}, {status:400});
         let fileUrl=[];
         for(let i=0; i<files.length; i++){
            const buffer = Buffer.from(await files[i].arrayBuffer());
            console.log(buffer);
            
            const key = await UploadFileToS3(buffer, files[i].name, files[i].type);
            fileUrl.push(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
         }
         
         console.log(fileUrl);
         
         
          
         return NextResponse.json({success:true, fileUrl:fileUrl}, {status:200});   
    } catch (error) {
        console.log(error);
        
    }
}
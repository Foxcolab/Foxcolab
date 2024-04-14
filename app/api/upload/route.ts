import { NextRequest, NextResponse } from "next/server";
import {S3Client, PutObjectAclCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import { db } from "@/prisma";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import {fromBuffer} from "pdf2pic"
import ConvertToPdf from "./converter/Converter"

const getFileExtension=(filename:string)=>{
    const extension = filename.split('.').pop();
    return extension;
}

const FindType =(type:string, fileName:string)=>{
    if(type.includes("image")){
        return "image"
    }
    else if(type.includes("pdf")){
        return "pdf"
    }
    else if(type.includes("video")){
        return "video"
    }
    else if(type.includes("audio" || getFileExtension(fileName)==="wav")){
        return 'audio'
    }
    else if(type.includes("text/plain") || getFileExtension(fileName)==="txt"){
        return "txt"
    }
    else if(type.includes("zip")){
        return "zip"
    }else if(getFileExtension(fileName)==="xlsx" || getFileExtension(fileName)==="xlx" || getFileExtension(fileName)==="csv" || type.includes("excel") || type.includes("sheet") ){
        return "xlsx"
    }else if(getFileExtension(fileName)==="doc" || getFileExtension(fileName)==="docx"){
        return "docx"
    }else if(getFileExtension(fileName)==="ppt" || type.includes("powerpoint") ){
        return "ppt"
    }
    else if(getFileExtension(fileName)==="json" || type.includes("json") ){
        return "json"
    }


    return 'not_found'
}



const s3Client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY as string,
    }
})

const UploadFileToS3=async(file:any, fileName:string, type:string)=>{
    const fileBuffer = file;
    
    const params = {
        Bucket:process.env.AWS_S3_BUCKET_NAME,
        Key:`${Date.now()}/${fileName}`,
        Body:fileBuffer, 
        ContentType:type,
        // ContentType:type,
        
    }
    
    // const command = new PutObjectAclCommand(params);
    const command = new PutObjectCommand(params);
    
     await s3Client.send(command);
    
    
    return params.Key;

}

const ConvertedFileName=(name:string)=>{
    let fileName = name.split('.').slice(0, -1).join('.');
    return `${fileName}_converted.pdf`
}

export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({
            error:"Server id not found",
        }, {status:409})
        if(!userId) return NextResponse.json({
            error:"User ID not found"
        }, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId
            }
        });
        if(!member) return NextResponse.json({
            error:"Member not found"
        }, {status:409});

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
            const buffer = Buffer.from(await files[i]?.arrayBuffer());
            console.log("Arary Buffer",buffer);
            
            const key = await UploadFileToS3(buffer, files[i]?.name, files[i]?.type);
            let pdfUrl = null;
            // console.log("PDF TYPE:", FindType(files[i].type, files[i].name))
            // if(FindType(files[i].type, files[i].name)==="ppt"){
            //     console.log("PDF BUFFER");
            //     const pdfBuffer = ConvertToPdf(buffer);
            //     console.log("Route Pdf Buffer:", pdfBuffer)
            //     return;
            //     const PdfKEy = await UploadFileToS3(pdfBuffer, ConvertedFileName(files[i].name), 'application/pdf');
            //     pdfUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${PdfKEy}`
            // }




            const file = await db.uploadedFile.create({
                data:{
                    name:files[i]?.name, 
                    fileType:files[i]?.type,
                    size:files[i]?.size,
                    convertedUrl:pdfUrl,
                    type: FindType(files[i].type, files[i].name),
                    publicUrl:`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
                    serverId:serverId,
                    createdBy:member.id,

                }
            })
            console.log(file);
            fileUrl.push(file.id);
            // fileUrl.push(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
         }

         
         console.log(fileUrl);
         
         
          
         return NextResponse.json({success:true, fileUrl:fileUrl}, {status:200});   
    } catch (error) {
        console.log(error);
        
    }
}
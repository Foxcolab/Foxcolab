
import React from 'react'

import ImageFile from './MsgExtensions/ImageFile';
import VideoFile from './MsgExtensions/VideoFile';
import Pdf from './MsgExtensions/PdfFile';
import PptViewer from './MsgExtensions/PptViewer';
import DocFile from './MsgExtensions/DocFile';
import Mp3File from "./MsgExtensions/Mp3File";
import { UploadedFile } from '@prisma/client';
import { cn } from '@/lib/utils';

interface Props {
    files:UploadedFile[]
    type:string
    length:number
}

function MsgFile({files, type, length}:Props) {
    // console.log(files);
    // function getFileExtension(filename:string) {
    //     // let data = filename.split('**').pop();
    //     // // console.log(data);
    //     // if(data?.includes('application')){
    //     //     data = data?.slice( data.indexOf('/'));
    //     // }
    //     // else if(filename.split('.').pop()===".mp3"){
    //     //     return "mp3";
    //     // }
    //     // else{
    //     //     data = data?.slice(0, data.indexOf('/'));
    //     // }
    //     return filename;
    // }

    // const fileType = getFileExtension(fileUrl);
    // console.log(fileType)
    
    // const getFileName =(file:string)=>{
    //     // file = file.replace('https://foxcolab.s3.ap-south-1.amazonaws.com/','')
    //     // file =file.substring(0, file.indexOf('.'))
    //     // if(fileType==="image"){
    //     //     return `${file}.jpg`
    //     // }
    //     // else if(fileType==="/pdf"){
    //     //     return `${file}.pdf`
    //     // }
    //     // else if(fileType==="/vnd.ms-powerpoint" || fileUrl.includes('.ppt')){
    //     //     return `${file}.ppt`
    //     // }else if(fileType==="/vnd.ms-excel" || fileUrl.includes('.xls')){
    //     //     return `${file}.xlsx`
    //     // }else if(fileUrl.includes('.txt')){
    //     //     return `${file}.txt`
    //     // }else if(fileUrl.includes('.csv')){
    //     //     return `${file}.csv`
    //     // }else if(fileType==="/vnd.ms-word"|| fileType==='/msword'|| fileUrl.includes('docx')){
    //     //     return `${file}.docx`
    //     // }
    //     // return file;
    // }
    // const getFileExtension2=(filename:string)=>{

        
    //     const extension = filename.split('.').pop();
    //     return extension;
    // }
    // const fileType = file.fileType;
    // const fileUrl:string = file.publicUrl as string;
    // const fileName = file.name;
    // console.log("FileUr;",file)

    let media:UploadedFile[] = []
    let applications:UploadedFile[] = []
    let audio:UploadedFile[]=[]
    files.map((file)=>{
        file.type==="image" || file.type==="video" ? 
        media.push(file) :file.type==="audio" ?  audio.push(file) :  applications.push(file)
    })



  return (
//     <>



// {
//         fileType==='image' ?
//        <ImageFile fileUrl={fileUrl} type={type} fileName={fileName}  />
//         : 
        
//         fileType==="video"  ?
//         <VideoFile fileUrl={fileUrl}  type={type} />

//             : 
//          fileType==="audio" ? 
//         <Mp3File key={key} fileUrl={fileUrl} type={type} />
//         :
//         fileType==="pdf" ? 
//         <Pdf fileUrl={fileUrl} key={key} length={length} fileName={fileName}  type={type}/>    
//             :
//         fileType==="ppt" ? 
//         <PptViewer fileUrl={fileUrl} key={key} length={length} fileName={fileName} type={type} />
//         :    

//         <DocFile fileUrl={fileUrl} key={key} length={length} fileName={fileName} type={type} />
        

//     }    

//     </>
    <>

            <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
            {
        media && media.map((file, i)=>(
            <>
                {
      
                    file.type==="image" ? 
                    <ImageFile fileUrl={file.publicUrl} type={type} fileName={file.name}  /> 
                    : file.type==="video" ?
                     <VideoFile fileUrl={file.publicUrl}  type={type} fileName={file.name} /> :''
                }

            </>

        ))
    }
            </div>
            <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
            {
        applications && applications.map((file, i)=>(
            <>
                {
                     file.type==="audio" ?
                     <Mp3File key={i} fileUrl={file.publicUrl} type={type} /> :
                     file.type==="pdf" ? 
                    <Pdf fileUrl={file.publicUrl} key={i} length={length} fileName={file.name}  type={type}/>
                    :    
                    file.type==="ppt" ? 
                    <PptViewer fileUrl={file.publicUrl} key={i} length={length} fileName={file.name} type={type} />
                    :    
                    <DocFile fileUrl={file.publicUrl} key={i} length={length} fileName={file.name} type={type} />
                }

            </>

        ))
    }
            </div>
            <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
            {
        audio && audio.map((file, i)=>(
            <>
                {
                     file.type==="audio" ?
                     <Mp3File key={i} fileUrl={file.publicUrl} type={type} /> : ''
                }

            </>

        ))
    }
            </div>
            <div>

            </div>
    
    </>
  )
}

export default MsgFile
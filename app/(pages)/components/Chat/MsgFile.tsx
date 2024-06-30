
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

  

    let media:UploadedFile[] = []
    let applications:UploadedFile[] = []
    let audio:UploadedFile[]=[]
    files.map((file)=>{
        file.type==="image" || file.type==="video" ? 
        media.push(file) :file.type==="audio" ?  audio.push(file) :  applications.push(file)
    })
    const convertSpace = (fileUrl:string)=>{
        return fileUrl.replace(/ /g,"%20");
      }


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

            {
                media.length!==0 && <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
                {
            media && media.map((file, i)=>(
                <>
                    {
          
                        file.type==="image" ? 
                        <ImageFile fileUrl={convertSpace(file.publicUrl)} type={type} fileName={file.name}  /> 
                        : file.type==="video" ?
                         <VideoFile fileUrl={convertSpace(file.publicUrl)}  type={type} fileName={file.name} /> :''
                    }
    
                </>
    
            ))
        }
                </div>
            }
            
            {
                applications && <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
                {
            applications && applications.map((file, i)=>(
                <>
                    {
                        //  file.type==="audio" ?
                        //  <Mp3File key={i} fileUrl={file.publicUrl} type={type} /> :
                         file.type==="pdf" ? 
                        <Pdf fileUrl={convertSpace(file.publicUrl)} key={i} length={length} fileName={file.name}  type={type}/>
                        :    
                        file.type==="ppt" ? 
                        <PptViewer fileUrl={convertSpace(file.publicUrl)} key={i} length={length} fileName={file.name} type={type} />
                        :    
                        <DocFile fileUrl={convertSpace(file.publicUrl)} key={i}  fileName={file.name} type={type} fileType={file.type as string} />
                    }
    
                </>
    
            ))
        }
                </div>
            }


            {
                audio &&  <div className={cn(type!=="channelFile" && type!=="Grid" ? "all_imgs" : '', type==="Grid" && "w-full h-full")}>
                {
            audio && audio.map((file, i)=>(
                <>
                    {
                         file.type==="audio" ?
                         <Mp3File key={i} fileUrl={convertSpace(file.publicUrl)} type={type} /> : ''
                    }
    
                </>
    
            ))
        }
                </div>
            }
           
            <div>

            </div>
    
    </>
  )
}

export default MsgFile
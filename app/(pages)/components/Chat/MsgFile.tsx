
import React from 'react'

import ImageFile from './MsgExtensions/ImageFile';
import VideoFile from './MsgExtensions/VideoFile';
import Pdf from './MsgExtensions/PdfFile';
import PptViewer from './MsgExtensions/PptViewer';
import DocFile from './MsgExtensions/DocFile';
import Mp3File from "./MsgExtensions/Mp3File";
function MsgFile({fileUrl, key, length, type}:{fileUrl:string, key:number, length:number, type:string}) {
    function getFileExtension(filename:string) {
        let data = filename.split('**').pop();
        // console.log(data);
        if(data?.includes('application')){
            data = data?.slice( data.indexOf('/'));
        }
        else if(filename.split('.').pop()===".mp3"){
            return "mp3";
        }
        else{
            data = data?.slice(0, data.indexOf('/'));
        }
        return data;
    }

    const fileType = getFileExtension(fileUrl);
    // console.log(fileType)
    
    const getFileName =(file:string)=>{
        file = file.replace('https://foxcolab.s3.ap-south-1.amazonaws.com/','')
        file =file.substring(0, file.indexOf('.'))
        if(fileType==="image"){
            return `${file}.jpg`
        }
        else if(fileType==="/pdf"){
            return `${file}.pdf`
        }
        else if(fileType==="/vnd.ms-powerpoint" || fileUrl.includes('.ppt')){
            return `${file}.ppt`
        }else if(fileType==="/vnd.ms-excel" || fileUrl.includes('.xls')){
            return `${file}.xlsx`
        }else if(fileUrl.includes('.txt')){
            return `${file}.txt`
        }else if(fileUrl.includes('.csv')){
            return `${file}.csv`
        }else if(fileType==="/vnd.ms-word"|| fileType==='/msword'|| fileUrl.includes('docx')){
            return `${file}.docx`
        }
        return file;
    }
    const getFileExtension2=(filename:string)=>{

        
        const extension = filename.split('.').pop();
        return extension;
    }

    console.log(fileUrl, fileType)

  return (
    <>



{
        fileType==='image' ?
       <ImageFile fileUrl={fileUrl} type={type} fileName={getFileName(fileUrl)}  />
        : 
        
        fileType==="video" || getFileExtension2(fileUrl)==="mp4" ?
        <VideoFile fileUrl={fileUrl}  type={type} />

            : 
         getFileExtension2(fileUrl)==="mp3" ? 
        <Mp3File key={key} fileUrl={fileUrl} type={type} />
        :
        fileType==="/pdf" ? 
        <Pdf fileUrl={fileUrl} key={key} length={length} fileName={getFileName(fileUrl)}  type={type}/>    
            :
        fileType==="/vnd.ms-powerpoint" ? 
        <PptViewer fileUrl={fileUrl} key={key} length={length} fileName={getFileName(fileUrl)} type={type} />
        :    

        <DocFile fileUrl={fileUrl} key={key} length={length} fileName={getFileName(fileUrl)} type={type} />
        

    }    

    </>
  )
}

export default MsgFile
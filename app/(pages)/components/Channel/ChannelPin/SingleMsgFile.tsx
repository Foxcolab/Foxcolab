
import Image from 'next/image';
import React from 'react'
import { BsFileEarmarkPdfFill, BsFiletypeCsv, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXlsx, BsFillFileEarmarkPptFill } from 'react-icons/bs';
import { FaFilePdf, FaImage } from 'react-icons/fa';
import { RiFolderImageLine, RiVideoFill } from 'react-icons/ri';

interface MsgFileProps {
    fileUrl:string
    timeStamp:string
    createdBy:string
}

function SingleMsgFile({fileUrl, timeStamp, createdBy}:MsgFileProps) {
    function getFileExtension(filename:string) {
        let data = filename.split('**').pop();
        if(data?.includes('application')){
            data = data?.slice( data.indexOf('/'));
        }else {
            data = data?.slice(0, data.indexOf('/'));
        }
        return data;
    }

    const fileType = getFileExtension(fileUrl);
    
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
  return (
    <>
    {
        fileType==='image' ?
        <div className="doc_t_container">
            <div className="doc_thumb_s bg-fuchsia-600">
            {/* <Image src={fileUrl} alt="" height={10} width={10} unoptimized quality={100}  /> */}
            <RiFolderImageLine/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div>
        : 
        
        fileType==="video" || getFileExtension2(fileUrl)==="mp4" ?
        <div className="doc_t_container">
            <div className='doc_thumb_s bg-orange-500'>
                <RiVideoFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 

            : 
        fileType==="/pdf" ? 
        <div className="doc_t_container">
            <div className='doc_thumb_s bg-red-500'>
                <BsFileEarmarkPdfFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
            :
        fileType==="/vnd.ms-powerpoint" ? 
         <div className="doc_t_container">
            <div className='doc_thumb_s bg-green-500'>
                <BsFillFileEarmarkPptFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :    

        fileType==="txt"? 
         <div className="doc_t_container">
            <div className='doc_thumb_s bg-gray-500'>
                <BsFiletypeTxt/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :
        fileType==="docx"? 
         <div className="doc_t_container">
            <div className='doc_thumb_s bg-yellow-500'>
                <BsFiletypeDocx/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :
        fileType==="xlsx"? 
         <div className="doc_t_container">
            <div className='doc_thumb_s bg-blue-500'>
                <BsFiletypeXlsx/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
         :
        fileType==="csv" || fileType==="/vnd.ms-powerpoint"? 
         <div className="doc_t_container">
            <div className='doc_thumb_s bg-red-500'>
                <BsFiletypeCsv/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {getFileName(fileUrl)}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div>  :
        ""
    }   
    
    
    </>
  )
}

export default SingleMsgFile
import { Video } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    fileUrl:string
    listStyle:string

}
function ForumFile({fileUrl, listStyle}:Props) {
    function getFileExtension(filename:string) {
        let data = filename.split('**').pop();
        // console.log(data);
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
                <div className="forum_single_file">
                    <Image src={fileUrl} alt='content' width={100} height={100} />
                </div>
            : 
            
            fileType==="video" || getFileExtension2(fileUrl)==="mp4" ?
                <div className='forum_single_file'>
                    <video src={fileUrl}    />
                </div>
    
            :
            
            ''

    }
    
    
    
    </>
  )
}

export default ForumFile
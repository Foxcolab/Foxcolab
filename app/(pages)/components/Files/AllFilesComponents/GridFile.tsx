import Image from 'next/image';
import React from 'react'
import { BsFileEarmarkPdfFill, BsFiletypeCsv, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXls, BsFiletypeXlsx, BsFillFileEarmarkPptFill } from 'react-icons/bs';
import { RiFolderImageLine, RiVideoFill } from 'react-icons/ri';
import MsgFile from '../../Chat/MsgFile';

interface Props {
    fileUrl:string
    createdBy:string
    timeStamp:string
    key:number
}

function GridFile({fileUrl, createdBy,timeStamp, key }:Props) {
    console.log(key, fileUrl)
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
    console.log(fileType)
    
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
    const fileName = getFileName(fileUrl);
    const getFileExtension2=(filename:string)=>{

        
        const extension = filename.split('.').pop();
        return extension;
    }
  return (
    <>
    
    <div className="single_grid_card">
        {
            fileType==="image" ? 
            <>
            <div className='file_grid_upper '>
                <div className='bg-fuchsia-600 file_grid_icon' ><RiFolderImageLine/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
                {/* <Image src={fileUrl} alt="" height={100} width={100} unoptimized quality={100}  /> */}
                <MsgFile fileUrl={fileUrl} key={0} length={0} />
            </div>
            </> :
        fileType==="video" || getFileExtension2(fileUrl)==="mp4" ?
         <>
            <div className='file_grid_upper '>
                <div className='bg-yellow-500 file_grid_icon' ><RiVideoFill/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
            <MsgFile fileUrl={fileUrl} key={0} length={0} />

            </div>
         </> : 
         
         fileType==="/pdf" ?
         
         <>
         <div className='file_grid_upper '>
                <div className='bg-blue-500 file_grid_icon' ><BsFileEarmarkPdfFill/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
                <BsFileEarmarkPdfFill/>
            </div>
         
         
         </>
         
         : 
        fileType==="/vnd.ms-powerpoint" ?
        <>
        <div className='file_grid_upper '>
               <div className='bg-red-500 file_grid_icon' ><BsFillFileEarmarkPptFill/></div>
               <div className='grid_description'>
               <div className='file_grid_name'>{fileName}</div>
               <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

               </div>
           </div>
           <div className='grid_file'>
               <BsFillFileEarmarkPptFill/> 
           </div>
        
        
        </>
        : 
          fileType==="txt" || fileType==="text" ?
          <>
          <div className='file_grid_upper '>
                 <div className='bg-orange-500 file_grid_icon' ><BsFiletypeTxt/></div>
                 <div className='grid_description'>
                 <div className='file_grid_name'>{fileName}</div>
                 <div className='ctby_Tim'>{createdBy} {timeStamp}</div>
 
                 </div>
             </div>
             <div className='grid_file'>
                 file 
             </div>
          
          
          </>:
          fileType==="docx" ?
          <>
          <div className='file_grid_upper '>
                 <div className='bg-red-500 file_grid_icon' ><BsFiletypeDocx/></div>
                 <div className='grid_description'>
                 <div className='file_grid_name'>{fileName}</div>
                 <div className='ctby_Tim'>{createdBy} {timeStamp}</div>
 
                 </div>
             </div>
             <div className='grid_file'>
                 file 
             </div>
          
          
          </>: 
          fileType==="xlsx" ?
          <>
          <div className='file_grid_upper '>
                 <div className='bg-green-500 file_grid_icon' ><BsFiletypeXlsx/></div>
                 <div className='grid_description'>
                 <div className='file_grid_name'>{fileName}</div>
                 <div className='ctby_Tim'>{createdBy} {timeStamp}</div>
 
                 </div>
             </div>
             <div className='grid_file'>
                 file 
             </div>
          
          
          </>
          :
        fileType==="csv" || fileType==="/vnd.ms-powerpoint" ?
        <>
         <div className='file_grid_upper '>
                <div className='bg-gray-500 file_grid_icon' ><BsFiletypeCsv/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
                file 
            </div>
         
         
         </>:
           ""

        }
    </div>
    
    
    
    </>
  )
}

export default GridFile
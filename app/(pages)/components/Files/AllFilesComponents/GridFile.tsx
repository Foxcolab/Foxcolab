import Image from 'next/image';
import React from 'react'
import { BsFileEarmarkPdfFill, BsFiletypeCsv, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXls, BsFiletypeXlsx, BsFillFileEarmarkPptFill } from 'react-icons/bs';
import { RiFolderImageLine, RiVideoFill } from 'react-icons/ri';
import MsgFile from '../../Chat/MsgFile';
import { Member, UploadedFile } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
    file:UploadedFile & {
        createdMember:Member & {
            user: {
                name:string
            }
        }
    }

}

function GridFile({file, }:Props) {


    const fileType = file.type;
    const fileName = file.name;
    const timeStamp = format((new Date(file.createdAt)), 'dd-MMM-yyyy')
    const createdBy = file.createdMember.user.name;

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
                <MsgFile files={[file]} key={0} length={0} type='' />
            </div>
            </> :
        fileType==="video" ?
         <>
            <div className='file_grid_upper '>
                <div className='bg-yellow-500 file_grid_icon' ><RiVideoFill/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
            <MsgFile files={[file]} key={0} length={0} type="Grid" />

            </div>
         </> : 
         
         fileType==="pdf" ?
         
         <>
         <div className='file_grid_upper '>
                <div className='bg-blue-500 file_grid_icon' ><BsFileEarmarkPdfFill/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
                {/* <BsFileEarmarkPdfFill/> */}
            <MsgFile files={[file]} key={0} length={0} type='Grid' />

            </div>
         
         
         </>
         
         : 
        fileType==="ppt" ?
        <>
        <div className='file_grid_upper '>
               <div className='bg-red-500 file_grid_icon' ><BsFillFileEarmarkPptFill/></div>
               <div className='grid_description'>
               <div className='file_grid_name'>{fileName}</div>
               <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

               </div>
           </div>
           <div className='grid_file'>
            <MsgFile files={[file]} key={0} length={0} type='Grid' />

           </div>
        
        
        </>
        : 
          fileType==="txt" ?
          <>
          <div className='file_grid_upper '>
                 <div className='bg-orange-500 file_grid_icon' ><BsFiletypeTxt/></div>
                 <div className='grid_description'>
                 <div className='file_grid_name'>{fileName}</div>
                 <div className='ctby_Tim'>{createdBy} {timeStamp}</div>
 
                 </div>
             </div>
             <div className='grid_file'>
             <MsgFile files={[file]} key={0} length={0} type='Grid' />
 
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
             <MsgFile files={[file]} key={0} length={0} type='Grid' />
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
             <MsgFile files={[file]} key={0} length={0} type='Grid' />
 
             </div>
          
          
          </>
          :
        fileType==="csv"  ?
        <>
         <div className='file_grid_upper '>
                <div className='bg-gray-500 file_grid_icon' ><BsFiletypeCsv/></div>
                <div className='grid_description'>
                <div className='file_grid_name'>{fileName}</div>
                <div className='ctby_Tim'>{createdBy} {timeStamp}</div>

                </div>
            </div>
            <div className='grid_file'>
            <MsgFile files={[file]} key={0} length={0} type='Grid' />
 
            </div>
         
         
         </>:
           ""

        }
    </div>
    
    
    
    </>
  )
}

export default GridFile
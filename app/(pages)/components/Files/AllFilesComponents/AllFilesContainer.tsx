import React from 'react'
import SingleMsgFile from '../../Channel/ChannelPin/SingleMsgFile'
import GridFile from './GridFile'
import { Message, UploadedFile } from '@prisma/client'
import { format } from 'date-fns'

interface Props {
    MsgFiles:UploadedFile[]
    listStyle:string
}
const DATE_FORMAT = "d MMM yyyy";


function AllFilesContainer({MsgFiles, listStyle}:Props) {
    // console.log("MSGFIKES", MsgFiles)

  return (
    <>
    
   <div className={listStyle==="grid"? "file_grid_style" :'single_message_file' } >

   <>
        {
            MsgFiles && MsgFiles.map((file, i)=>(
                <>
                {
                    listStyle==="grid" ? <GridFile file={file} key={i}/> :
                    <SingleMsgFile file={file} key={i}/>
                }
                
                </>
            ))
        }
        
        </>


   {/* {MsgFiles && MsgFiles.map((message, i)=>(
        <>
        {
            listStyle==="list" ? <div key={i} className=''>
            {
                message && message.uploadedFiles.map((file)=>(
                    <SingleMsgFile file={file}  />
                ))
            }
            
        </div> : <>
        {
                message && message.uploadedFiles.map((file)=>(
                    <GridFile file={file}  />
                ))
            }
      
            
         </>
        }
        
        </>
    ))} */}
   </div>
    
    
    </>
  )
}

export default AllFilesContainer
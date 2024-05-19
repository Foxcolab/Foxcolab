import React from 'react'
import SingleMsgFile from '../../Channel/ChannelPin/SingleMsgFile'
import GridFile from './GridFile'
import { Message, UploadedFile } from '@prisma/client'
import { format } from 'date-fns'

interface Props {
    MsgFiles:UploadedFile[]
    listStyle:string
}


function AllFilesContainer({MsgFiles, listStyle}:Props) {

  return (
    <>
    
   <div className={listStyle==="grid"? "file_grid_style" :'single_message_file' } >

   <>
        {
            MsgFiles && MsgFiles.map((file, i)=>(
                <>
                {
                    listStyle==="grid" ? <GridFile file={file} key={i} length={MsgFiles.length} /> :
                    <SingleMsgFile file={file} key={i} length={MsgFiles.length} />
                }
                
                </>
            ))
        }
        
        </>


   </div>
    
    
    </>
  )
}

export default AllFilesContainer
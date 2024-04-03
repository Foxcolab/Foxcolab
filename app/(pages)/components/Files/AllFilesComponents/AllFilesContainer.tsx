import React from 'react'
import SingleMsgFile from '../../Channel/ChannelPin/SingleMsgFile'
import GridFile from './GridFile'
import { Message } from '@prisma/client'
import { format } from 'date-fns'

interface Props {
    MsgFiles:Message[]
    listStyle:string
}
const DATE_FORMAT = "d MMM yyyy";


function AllFilesContainer({MsgFiles, listStyle}:Props) {

  return (
    <>
    
   <div className={listStyle==="grid"? "file_grid_style" :'single_message_file' } >
   {MsgFiles && MsgFiles.map((message, i)=>(
        <>
        {
            listStyle==="list" ? <div key={i} className=''>
            {
                message && message.fileUrl.map((fileUrl)=>(
                    <SingleMsgFile fileUrl={fileUrl} createdBy={message.member.user.name} timeStamp={format(new Date(message.createdAt), DATE_FORMAT)} />
                ))
            }
            
        </div> : <>
        {
                message && message.fileUrl.map((fileUrl, i)=>(
                    <GridFile fileUrl={fileUrl} createdBy={message.member.user.name} timeStamp={format(new Date(message.createdAt), DATE_FORMAT)} key={i}  />
                ))
            }
      
            
         </>
        }
        
        </>
    ))}
   </div>
    
    
    </>
  )
}

export default AllFilesContainer
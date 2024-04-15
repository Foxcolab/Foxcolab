import { Message } from '@prisma/client'
import React from 'react'
import SingleMsgFile from '../Channel/ChannelPin/SingleMsgFile'

interface Props {
    MessageFile:Message[]

}
function SharedWithYou({MessageFile}:Props) {
  return (
    <>
    
    <div className='all_files_container'>
    {MessageFile && MessageFile.map((message, i)=>(
        <div key={i} className='single_message_file'>
            {
                message && message.uploadedFiles.map((file)=>(
                    <SingleMsgFile file={file} />
                ))
            }
            
        </div>
    ))}
    </div>
    </>
  )
}

export default SharedWithYou
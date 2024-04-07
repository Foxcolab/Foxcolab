import { ForumResponse, Forums } from '@prisma/client'
import React from 'react'
import { AiOutlineComment } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'

interface Props {
  forums:Forums & {
    responses:ForumResponse[]
  }
}
function ForumResponseHeader({forums}:Props) {
  return (
    <>
    
    
    <div className='forum_response_header'>
      <div className='forum_res_icon'>
        <AiOutlineComment/>
      </div>
      <div className='forum_head_title'>
        {forums.title}
      </div>

      <div>
        {/* {forums.responses[0].content} */}
      </div>


    </div>
    
    
    </>
  )
}

export default ForumResponseHeader
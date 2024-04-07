import { Forums } from '@prisma/client'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import ForumMessageContainer from './ForumMessageContainer'

interface Props {
    setForum:any
    forum:Forums
    managerIds:string[]
}

function OpenForumContainer({setForum, forum, managerIds}:Props) {
  
  return (
    <>
    <div className="forum_msg_container">
    <div className="chat_section">
        <div className="channel_title">
            {forum.title}
        </div>
        <div className="channel_memb_pin">
        <div className="content2_cross flex items-center gap-3">
            <button><BsThreeDots/></button>
      <button onClick={()=>setForum(null)}> <RxCross1/></button>
    </div>
        </div>
    </div>

        <ForumMessageContainer forum={forum} managerIds={managerIds} />
 
    </div>



    </>
  )
}

export default OpenForumContainer
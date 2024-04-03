import { ChannelManager, Member, Message, PinnedPost } from '@prisma/client'
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { MdNoteAlt } from 'react-icons/md'
import AllMembers from './AllMembers'
import ChannelPin from './ChannelPin/ChannelPin'

interface HeaderProps {
    name:string,
    members: Member[]
    serverMembers: Member[]
    type:string
    description:string
    createdBy:string
    createdAt:string
    isAdmin:boolean
    sendMsg:boolean
    messages:Message[]
    managers:ChannelManager
    pinnedPosts:PinnedPost[]
    schemaType:string
}
function ChannelHeader({members, name, type, description, createdBy, createdAt, isAdmin, serverMembers, sendMsg, messages, managers, pinnedPosts, schemaType}:HeaderProps) {
  return (
<>

<div className="chat_section">
        <div className="channel_title">
        <div className='channel_name'>
        <div className='channel_mem'>
            <AllMembers name={name} members={members} type={type} description={description} createdBy={createdBy} createdAt={createdAt} isAdmin={isAdmin} serverMembers={serverMembers}  sendMsg = {sendMsg}
            messages={messages} startingState={"About"}
            managers={managers}
            
            content={<button># {name} <IoIosArrowDown/></button>}
 />
          
          
          </div>
          </div>
        <div className='channel_mem'>
            <AllMembers name={name} members={members} type={type} description={description} createdBy={createdBy} createdAt={createdAt} isAdmin={isAdmin} serverMembers={serverMembers}  sendMsg = {sendMsg}
            messages={messages} startingState={"Members"}
            managers={managers}
            content={<button className=''><FaUsers/> Members {members.length}</button> }
 />
            {/* <button><MdNoteAlt/> Canvas</button></div> */}
            <ChannelPin pinnedPosts={pinnedPosts} />
         </div>
         </div>
      </div>
      



</>
  )
}

export default ChannelHeader
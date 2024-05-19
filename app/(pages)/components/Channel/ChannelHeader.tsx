import { Channel, ChannelManager, Member, Message, PinnedPost } from '@prisma/client'
import React from 'react'
import { FaLock, FaUsers } from 'react-icons/fa'
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
    channel:Channel
    currentMember:Member
}
function ChannelHeader({members, name, type, description, createdBy, createdAt, isAdmin, serverMembers, sendMsg, messages, managers, pinnedPosts, schemaType, channel, currentMember}:HeaderProps) {
  return (
<>

<div className="chat_section ">

         <div className='channel_title'>
         <AllMembers name={name} members={members} type={type} description={description} createdBy={createdBy} createdAt={createdAt} isAdmin={isAdmin} serverMembers={serverMembers}  sendMsg = {sendMsg}
            messages={messages} startingState={"About"}
            managers={managers}
            channel={channel}
            content={<button>{channel.type==="public" ? "#" : <FaLock/> } {name} <span className='text-sm'><IoIosArrowDown/></span></button>}
 />
         </div>
         <div className='channel_memb_pin'>
         <AllMembers name={name} members={members} type={type} description={description} createdBy={createdBy} createdAt={createdAt} isAdmin={isAdmin} serverMembers={serverMembers}  sendMsg = {sendMsg}
         channel={channel}
            messages={messages} startingState={"Members"}
            managers={managers}
            content={<button className=''><FaUsers/> Members {members.length}</button> }
 />
            <ChannelPin pinnedPosts={pinnedPosts} currentMember={currentMember} />
         </div>
      </div>
      



</>
  )
}

export default ChannelHeader
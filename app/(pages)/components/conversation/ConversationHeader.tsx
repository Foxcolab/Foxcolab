import React from 'react'
import ChannelPin from '../Channel/ChannelPin/ChannelPin'
import { Member, PinnedPost } from '@prisma/client'

interface Props {
  icon:any,
  name:String
  pinnedPosts:PinnedPost[]
  currentMember:Member
}


function ConversationHeader({icon, name, pinnedPosts, currentMember}:Props) {

  return (
    <>
    <div className='chat_section items-center'>
      <div className='channel_title flex items-center text-lg gap-2 font-semibold'><span>{icon}</span> {name}</div>
      <div className="channel_memb_pin">
      <ChannelPin pinnedPosts={pinnedPosts} currentMember={currentMember} schemaType={"DirectMessage"} />
      </div>
    </div>

    </>
  )
}

export default ConversationHeader
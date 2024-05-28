import React from 'react'
import SectionHeader from '../Header/SectionHeader'
import { FaUserLarge } from 'react-icons/fa6'
import DirectMessages from './DirectMessages'
import DirectEditor from '../Editor/DirectEditor'
import { Channel, Draft, Later, Member, PinnedPost, User } from '@prisma/client'
import { useParams } from 'next/navigation'

interface Props {
    name:string
    conversationId:string
    Drafts:Draft[]
    currentMember:Member & {
        user:User
    } & {
        saveLater:Later[]
    } & {
        pinnedPost:PinnedPost[]
    }
    otherMember:Member & {
        user:User
    }
    setThreadMessage:any
    myChannels:Channel[]
    allServerMember:Member[]
}
function ConversationChat({name, conversationId, Drafts, currentMember, otherMember, setThreadMessage, myChannels, allServerMember}:Props) {

    const mySavedPosts = currentMember.saveLater;
    const PinnedPosts = currentMember.pinnedPost;

    const params = useParams();



  return (
    <>
    
    <div className="forum_msg_container">

    <SectionHeader icon={<FaUserLarge/>} name={name} />
    



<div className="forum_messages">
    <DirectMessages
    currentMember={currentMember}
    otherMember={otherMember}
    chatId={conversationId}
    apiUrl='/api/direct-messages'
    socketUrl='/api/socket/direct-messages'
    socketQuery={{conversationId:conversationId, serverId:params?.id as string}}
    PinnedPosts={PinnedPosts}
    mySavedPost={mySavedPosts}
    setThreadMessage={setThreadMessage}
    myChannels={myChannels}
    allServerMember={allServerMember}
    />
</div>




<div className="forum_editor">
    <DirectEditor
    name={name}
    apiUrl='/api/socket/direct-messages'
    query={{conversationId:conversationId, serverId:params?.id as string}}
    drafts={Drafts}
    conversationId={conversationId}
    />
</div>
</div>
    
    
    </>
  )
}

export default ConversationChat
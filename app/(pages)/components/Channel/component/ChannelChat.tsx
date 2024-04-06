import { Channel, Member, Server } from '@prisma/client'
import React from 'react'
import ThreadComponents from '../../v1/Thread/ThreadComponents'
import ChannelHeader from '../ChannelHeader'
import { format } from 'date-fns'
import ChatMessages from '../../Chat/ChatMessages'
import EditorFooter from '../../Editor/EditorFooter'

interface Props {
    server:Server
    channel:Channel
    member:Member
    isAdmin:boolean
    myChannels:Channel[]
    setThreadMessage:any
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";


function ChannelChat({server, channel, isAdmin, member, myChannels, setThreadMessage}:Props) {

    const createdAt = format(new Date(channel.createdAt), DATE_FORMAT);
    let sendMsg = channel.sendMsg !==undefined && channel.sendMsg!==null ? channel.sendMsg : true;
  
    const managers = channel.manager;
  
  
    const mySavedPosts = member.saveLater;
    const PinnedPosts = channel.pinnedPost;
  
    const serverMember = server.Members.filter(mem=>mem.id!==member.id);
   
    const channelMemberExceptMe = channel.Members.filter(mem=>mem.id!==member.id)

  return (
    <>
    <div className='channel_chats'>
    <div className='channel_messages'>

    
   
         <ChannelHeader members={channel.Members} name={channel.name} type={channel.type} description={channel.description as string} createdBy={channel.createdUser?.name as string}
    createdAt={createdAt}
    isAdmin = {isAdmin}
    serverMembers = {server.Members}
    sendMsg = {sendMsg}
    messages = {channel.messages}
    managers={managers?.member}
    schemaType={"Channel"}
    pinnedPosts={PinnedPosts}
    />


    
    <ChatMessages 
    channel={channel}
    member={member}
    name={channel.name}
    chatId={channel.id}
    type='channel'
    apiUrl='/api/messages'
    socketUrl="/api/socket/messages"
    socketQuery={{channelId:channel.id, serverId:server?.id, sectionId:channel?.sectionId as string}}
    paramKey='channelId'
    paramValue={channel.id}
    PinnedPosts = {PinnedPosts}
    mySavedPost = {mySavedPosts}
    myChannels={myChannels}
    allServerMember={serverMember}
    setThreadMessage={setThreadMessage}
    />
</div>
    <EditorFooter
    name={channel.name}
    type="channel"
    apiUrl="/api/socket/messages"
    query={{
      channelId: channel.id,
      serverId: server?.id,
      sectionId:channel.sectionId
    }}
    channelType={channel.type}
    channels={myChannels}
    groups={server.groups}
    channelMember={channelMemberExceptMe}
    drafts={member.Drafts}

    />

</div>
    </>
  )
}

export default ChannelChat
import { Channel, ChannelManager, Draft, Later, Member, PinnedPost, Server } from '@prisma/client'
import React from 'react'
import ThreadComponents from '../../v1/Thread/ThreadComponents'
import ChannelHeader from '../ChannelHeader'
import { format } from 'date-fns'
import ChatMessages from '../../Chat/ChatMessages'
import EditorFooter from '../../Editor/EditorFooter'

interface Props {
    server:Server & {
      Members:Member[]
    }
    channel:Channel & {
      Members:Member[]
    } & {
      manager:ChannelManager
    }& {
      pinnedPost:PinnedPost[]
    } 
    member:Member & {
      saveLater:Later[]
    }
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
   
    const channelMemberExceptMe = channel.Members.filter(mem=>mem.id!==member.id);


    let sendMessage = false;
    let uploadMedia = false;
    let createForms  = false;
    let createPolls = false;

    const isManger = managers.memberIds.includes(member.id);
    const isMember = channel.memberIds.includes(member.id);

    if(((isAdmin || isManger || isMember) && channel.whoCanUploadMedia==="member") || ((isManger || isAdmin) && channel.whoCanUploadMedia==="manager") || (isAdmin && channel.whoCanUploadMedia==="admin") ){
      uploadMedia = true;
    }
    if(((isAdmin || isManger || isMember) && channel.whoCanSendMessage==="member") || ((isManger || isAdmin) && channel.whoCanSendMessage==="manager") || (isAdmin && channel.whoCanSendMessage==="admin") ){
      sendMessage = true;
    }
    if(((isAdmin || isManger || isMember) && channel.whoCanCreateForms==="member") || ((isManger || isAdmin) && channel.whoCanCreateForms==="manager") || (isAdmin && channel.whoCanCreateForms==="admin") ){
      createForms = true;
    }
    if(((isAdmin || isManger || isMember) && channel.whoCanCreatePolls==="member") || ((isManger || isAdmin) && channel.whoCanCreatePolls==="manager") || (isAdmin && channel.whoCanCreatePolls==="admin") ){
      createPolls = true;
    }

    let drafts:Draft[] = []
    for(let i=0; i<member?.Drafts?.length; i++){
      if(member?.Drafts[i].ScheduledDate===null){
        drafts.push(member?.Drafts[i]);
      }
    }

  return (
    <>
    {/* <div className='channel_chats'>
    <div className='channel_messages'> */}

    <div className="forum_msg_container">

    
    <ChannelHeader members={channel.Members} name={channel.name} type={channel.type} description={channel.description as string} createdBy={channel.createdMember?.user.name as string}
    createdAt={createdAt}
    isAdmin = {isAdmin}
    serverMembers = {server.Members}
    sendMsg = {sendMsg}
    messages = {channel.messages}
    managers={managers}
    schemaType={"Channel"}
    pinnedPosts={PinnedPosts}
    channel={channel}
    currentMember={member}
    />


    <div className="forum_messages">
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




<div className="forum_editor">
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
    drafts={drafts}
    uploadMedia={uploadMedia}
    sendMessage={sendMessage}
    />
</div>
</div>
    </>
  )
}

export default ChannelChat
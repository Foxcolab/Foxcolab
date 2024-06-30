import { Channel, Member, MemberRole, Message, Server } from '@prisma/client'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import MsgFile from '../../Chat/MsgFile'
import ThreadChatComponents from '../../threads/ThreadChatComponents'
import ThreadEditor from '../../Editor/ThreadEditor'
import EditorFooter from '../../Editor/EditorFooter'
import ForumEditor from '../../Editor/Forum/ForumEditor'
import Polls from '../../Chat/Polls/Polls'
import ChannelForm from '../../Chat/form/ChannelForm'


interface Props {
  message:Message
  currentMember:Member
  setThreadMessage:any
  myChannels:Channel[]
  server:Server
  channel:Channel
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";


function ThreadComponents({message, currentMember, setThreadMessage, myChannels, server, channel}:Props) {
  const fileUrl = message?.fileUrl;
  const content = message?.content;
  
  // const fileType = fileUrl?.split(".").pop();




  return (
    <>
 

   <div className="forum_msg_container">
   <div className="chat_section">
    <div className="channel_title"><button>Threads</button></div>
    <div className="content2_cross">
      <button onClick={()=>setThreadMessage(null)}> <RxCross1/></button>
    </div>
   </div>

   <div className="forum_messages">
   <ThreadChatComponents
            currentMember={currentMember}
            chatId={message.id}
            type='thread'
            apiUrl='/api/messages/threads'
            socketUrl='/api/socket/threads'
            paramKey='messageId'
            paramValue={message.id}   
            server={server}    
            channel={channel}
            myChannels={myChannels}
            message={message}
            socketQuery={{
              channelId:channel.id,
              serverId:server.id,
              sectionId:channel.sectionId as string,
              messageId:message.id
            }}
            />

      
      
   </div>


   <div className="forum_editor w-full">
   <ForumEditor
         placeholder={"Reply in theads.."}
         apiUrl="/api/socket/threads"
         query={{
          serverId: message.serverId,
           channelId:message.channelId, 
           sectionId:message.sectionId,
            messageId:message.id
          }} 
/>
   </div>

   </div>
    
    </>
  )
}

export default ThreadComponents
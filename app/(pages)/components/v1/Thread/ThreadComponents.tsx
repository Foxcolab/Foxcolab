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


interface Props {
  message:Message
  currentMember:Member | null
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

  const isAdmin = currentMember?.role === MemberRole.admin;
  const isModerator = currentMember?.role === MemberRole.moderator;





  return (
    <>
    
   <div className="chat_section">
    <div className="channel_title"><button>Threads</button></div>
    <div className="content2_cross">
      <button onClick={()=>setThreadMessage(null)}> <RxCross1/></button>
    </div>
   </div>
   <div>
   <div style={{overflow:"scroll"}}>
            <div className='thred_main'>
            <div className="relative group flex items-center  p-4 transition w-full msg_cnbdy">
      <div className="group flex gap-x-2 items-start w-full">
        <div  className="cursor-pointer hover:drop-shadow-md transition">

          {
            message?.member?.user?.profilePic!==null ? 
            <UserAvatar src={message.member?.user?.profilePic} /> :
            <LetterAvatar
            name={message?.member?.user.name===undefined ? 'Y': message.member.user.name }
           size={40}
           radius={20}
            /> 
          }
       
        </div>


        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p  className=" chat_un">
                {!message.member?.user ? "User": message.member?.user?.name}
              </p>
            </div>
          
            <span className=" timestamp">
            {format(new Date(message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          {/* {isImage && (
            <a 
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )} */}
           <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
               " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:content}} className="msg_contnt" />
            </p>

         
        </div>
      </div>
      
    </div>
    <div className="all_imgs">
              {fileUrl?.length!==0 && 
              
              fileUrl.map((file, i)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />

                </>
              ))
              
              }
            </div>
            </div>
            {/* <hr /> */}
            <ThreadChatComponents
            member={currentMember}
            chatId={message.id}
            type='thread'
            apiUrl='/api/messages/threads'
            socketUrl='/api/socket/threads'
            paramKey='forumId'
            paramValue={message.id}   
            server={server}    
            channel={channel}
            />

      {/* <ThreadEditor
      name={"Reply.."}
      apiUrl="/api/socket/threads"
      query={{
        messageId:message.id,
       channelId: message.channelId,
       serverId: message?.serverId,
       sectionId:message.sectionId
    }}
      /> */}

      <EditorFooter
      name='Reply...'
      apiUrl='/api/socket/threads'
      query={{
        messageId:message.id,
       channelId: message.channelId,
       serverId: message?.serverId,
       sectionId:message.sectionId
    }}
    
      
      
      />



             </div>
   </div>

   
    
    </>
  )
}

export default ThreadComponents
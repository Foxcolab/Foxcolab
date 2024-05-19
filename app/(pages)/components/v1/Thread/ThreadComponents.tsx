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
    
   <div className="chat_section">
    <div className="channel_title"><button>Threads</button></div>
    <div className="content2_cross">
      <button onClick={()=>setThreadMessage(null)}> <RxCross1/></button>
    </div>
   </div>
   <div>
   <div style={{overflow:"scroll"}}>
            <div className='thred_main'>
    

            {
              message.pollId!==null && message.pollId!==undefined ? <>
              
              <Polls
               id={message.id}
               currentMember={server.currentMember}
                member={message.member}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                poll={message.poll}
                socketQuery={{channelId:channel.id, serverId:server?.id, messageId:message.id}}
                socketUrl='/api/socket/threads'
                message={message}
                managers={channel?.manager?.memberIds}
              
                myChannels={myChannels}
                allServerMember={server.Members}
                setThreadMessage={setThreadMessage}
                schemaType="Threads"
               
               />
          
              </> :
            message.formId!==null && message.formId!==undefined ? <> 
            
            <ChannelForm

            id={message.id}
            currentMember={server.currentMember}
            member={message.member}
            deleted={message.deleted}
            timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
            form={message.form}
            socketQuery={{channelId:channel.id, serverId:server?.id, messageId:message.id}}
            socketUrl='/api/socket/threads'
            message={message}
            managers={channel?.manager?.memberIds}
           
            myChannels={myChannels}
            allServerMember={server.Members}
            setThreadMessage={setThreadMessage}
            schemaType="Threads"
            
            
            />


            </> :




              <>
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
              
              </>
            }


            </div>
            {/* <hr /> */}
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
            socketQuery={{
              channelId:channel.id,
              serverId:server.id,
              sectionId:channel.sectionId as string,
              messageId:message.id
            }}
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

      {/* <EditorFooter
      name='Reply...'
      apiUrl='/api/socket/threads'
      query={{
        messageId:message.id,
       channelId: message.channelId,
       serverId: message?.serverId,
       sectionId:message.sectionId
    }}
      /> */}
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
"use client";
import { cn } from '@/lib/utils'
import { Message, Threads, UploadedFile } from '@prisma/client'
import React from 'react'
import { FaHashtag, FaLock } from 'react-icons/fa'
import MsgFile from '../../Chat/MsgFile'
import Profile from '../../SaveLater/Profile';
import { format } from 'date-fns';
import ThreadEditor from './ThreadEditor';


const DATE_FORMAT = "d MMM yyyy, HH:mm";

function ThreadContainer({ThreadMessages}:{ThreadMessages:Message[]}) {
  
  
  return (
    <>
    
    <div className="saved_all_container">
        {
            ThreadMessages && ThreadMessages.map((message, i)=>(
                <>
                <div className='pinsmsg border'>
                  <div className='flex items-center text-sm font-semibold italic'><span>{message.channel.type==="public" ? <FaHashtag/>: <FaLock/>}</span> {message.channel.name}</div>
                   <div className="pin_msg" key={i}>
              <Profile name={message.member?.user?.name} url={message.member?.user?.profilePic} />
             <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2 ">
              <div className="flex items-center">
                <p  className=" chat_un">
                  {!message.member?.user ? "User": message.member?.user?.name}
                </p>
                {/* <ActionTooltip label={member.role}>
                  {roleIconMap[member?.role]}
                </ActionTooltip> */}
              </div>
              <span className="timestamp">
                {format(new Date(message?.createdAt), DATE_FORMAT)}
              </span>
            </div>
         
             <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                 " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:message.content}} className="msg_contnt" />
              </p>
  
           
          </div>
              </div>

              
              {message.uploadedFiles?.length!==0 && 
                <div className="all_imgs">
                <MsgFile files={message.uploadedFiles}  type="msgFile" length={message.uploadedFiles.length} />
                </div>  
              }
            

              <div className='message_threads_container'>
              {/* {message.} */}
              { message?.threads && message.threads.map((thread:Threads)=>(
               <>
                   <div className="pin_msg thread_single" key={thread.id}>
              <Profile name={thread.member?.user?.name} url={thread.member?.user?.profilePic} />
             <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2 ">
              <div className="flex items-center">
                <p  className=" chat_un">
                  {!thread.member?.user ? "User": thread.member?.user?.name}
                </p>
                {/* <ActionTooltip label={member.role}>
                  {roleIconMap[member?.role]}
                </ActionTooltip> */}
              </div>
              <span className="timestamp">
                {format(new Date(thread?.createdAt), DATE_FORMAT)}
              </span>
            </div>
         
             <p className={cn(
                "text-sm ",
                 "  text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:thread.content}} className="msg_contnt" />
              </p>
  
           
          </div>
              </div>

              
              {thread.uploadedFiles?.length>0 && 
              <div className="all_imgs">
                <MsgFile files={thread.uploadedFiles}  length={length} type="msgFile" />      
                </div> 
              }
           
            
            </> 
              
              ))}
              </div>

              <div className="pt-2">
              <ThreadEditor  
                   name={"Reply.."}
      apiUrl="/api/socket/threads"
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
            ))}
    </div>
    
    </>
  )
}

export default ThreadContainer
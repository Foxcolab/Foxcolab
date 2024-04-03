"use client";
import { Later, Member } from '@prisma/client'
import React, { useState } from 'react'
import MsgUpper2 from './MsgUpper2';
import Profile from './Profile';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import MsgFile from '../Chat/MsgFile';

interface SavedProps {
  savedPosts: Later[]
  userId:string
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";


function SavedContainer({savedPosts, userId}:SavedProps) {

  const [state, setState] = useState('progress');

  const PmsgStatus =(status:string)=>{
    setState(status);
  }

  return (
    <>

     <div className="pmsg_sts">
            <button onClick={()=>PmsgStatus("progress")} id='progress' className={state==="progress"? "activePmsg": ""} >In Progress</button>
            <button onClick={()=>PmsgStatus("archived")} id='archived' className={state==="archived"? "activePmsg": ""} >Archived</button>
            <button onClick={()=>PmsgStatus("completed")} id='completed' className={state==="completed"? "activePmsg": ""} >Completed</button>
        </div>

    {
      state==="progress" ? <> 
      <>
      <div className="saved_all_container">
      {
      savedPosts && savedPosts.map((saved, i)=>(
        <>
        {
          saved.status==="progress" ? 
           <div className='pinsmsg' key={i}>
          <MsgUpper2 name={saved?.message.channel?.name} id={saved.id} serverId={saved.serverId} userId={userId} status="progress" />
  
              <div className="pin_msg">
              <Profile name={saved.message.member?.user?.name} url={saved.message.member?.user?.profilePic} />
             <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2 ">
              <div className="flex items-center">
                <p  className=" chat_un">
                  {!saved.message.member?.user ? "User": saved.message.member?.user?.name}
                </p>
                {/* <ActionTooltip label={member.role}>
                  {roleIconMap[member?.role]}
                </ActionTooltip> */}
              </div>
              <span className="timestamp">
                {format(new Date(saved?.createdAt), DATE_FORMAT)}
              </span>
            </div>
         
             <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                 " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:saved.message.content}} className="msg_contnt" />
              </p>
  
           
          </div>
              </div>
              <div className="all_imgs">
              {saved.message.fileUrl?.length!==0 && 
              
             saved.message.fileUrl &&  saved.message.fileUrl.map((file:string, i:number)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />

                </>
              ))
              
              }
            </div>            
            
  
  
          </div>: ''
        }
        </>
    
      ))
    }
    </div>

      </>
      </> :
      state==="archived" ? <>
   

   <div className="saved_all_container">
      {
      savedPosts && savedPosts.map((saved, i)=>(
        <>
        {
          saved.status==="archived" ?  <div className='pinsmsg' key={i}>
          <MsgUpper2 name={saved?.message.channel?.name} id={saved.id} serverId={saved.serverId} userId={userId} status={"archived"} />
  
              <div className="pin_msg">
              <Profile name={saved.message.member?.user?.name} url={saved.message.member?.user?.profilePic} />
             <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2 ">
              <div className="flex items-center">
                <p  className=" chat_un">
                  {!saved.message.member?.user ? "User": saved.message.member?.user?.name}
                </p>
                {/* <ActionTooltip label={member.role}>
                  {roleIconMap[member?.role]}
                </ActionTooltip> */}
              </div>
              <span className="timestamp">
                {format(new Date(saved?.createdAt), DATE_FORMAT)}
              </span>
            </div>
         
             <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                 " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:saved.message.content}} className="msg_contnt" />
              </p>
  
           
          </div>
              </div>
  
              <div className="all_imgs">
              {saved.message.fileUrl?.length!==0 && 
              
             saved.message.fileUrl &&  saved.message.fileUrl.map((file:string, i:number)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />

                </>
              ))
              
              }
            </div>   
          </div>: ''
        }
        </>
    
      ))
    }
    </div>

       </> :
      <> 
       <div className="saved_all_container">
      {
      savedPosts && savedPosts.map((saved, i)=>(
        <>
        {
          saved.status==="completed" ?  <div className='pinsmsg' key={i}>
          <MsgUpper2 name={saved?.message.channel?.name} id={saved.id} serverId={saved.serverId} userId={userId} status={"completed"}  />
  
              <div className="pin_msg">
              <Profile name={saved.message.member?.user?.name} url={saved.message.member?.user?.profilePic} />
             <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2 ">
              <div className="flex items-center">
                <p  className=" chat_un">
                  {!saved.message.member?.user ? "User": saved.message.member?.user?.name}
                </p>
                {/* <ActionTooltip label={member.role}>
                  {roleIconMap[member?.role]}
                </ActionTooltip> */}
              </div>
              <span className="timestamp">
                {format(new Date(saved?.createdAt), DATE_FORMAT)}
              </span>
            </div>
         
             <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                 " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:saved.message.content}} className="msg_contnt" />
              </p>
  
           
          </div>
              </div>
  
              <div className="all_imgs">
              {saved.message.fileUrl?.length!==0 && 
              
             saved.message.fileUrl &&  saved.message.fileUrl.map((file:string, i:number)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />

                </>
              ))
              
              }
            </div>   
          </div>: ''
        }
        </>
    
      ))
    }
    </div>
      </>
    }

   
    
    </>
  )
}

export default SavedContainer
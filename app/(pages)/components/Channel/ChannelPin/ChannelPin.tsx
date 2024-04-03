"use client";
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BsFillPinAngleFill } from 'react-icons/bs'
import { PinnedPost } from '@prisma/client'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import MsgFile from '../../Chat/MsgFile'
import SingleMsgFile from './SingleMsgFile';

interface PinnedProps {
    pinnedPosts:PinnedPost[]
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function ChannelPin({pinnedPosts}:PinnedProps) {
    
  return (
    <>
    
    <Dialog>
  <DialogTrigger className='flex items-center'><BsFillPinAngleFill/> {pinnedPosts.length!==0 && pinnedPosts.length} Pinned</DialogTrigger>
  <DialogContent className='forward_container channel_pincon'>
    <DialogHeader>
      <DialogTitle>Pinned Messages</DialogTitle>
      <div className='channel_pin_container'>
        {
            pinnedPosts && pinnedPosts.map((pinned, i)=>(
                <div className="channel_single_pin" key={i}>
                               <div className="relative group flex items-center flex-col p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div  className="cursor-pointer hover:drop-shadow-md transition">
        {
            pinned.message?.member?.user?.profilePic!==null ? 
            <UserAvatar src={pinned.message.member?.user?.profilePic} /> :
            <LetterAvatar 
            name={pinned.message?.member?.user.name===undefined ? 'Y': pinned.message.member.user.name }
           size={40}
           radius={20}
            /> 
          }
       
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p  className=" chat_un">
                {!pinned.message.member?.user ? "User": pinned.message.member?.user?.name}
              </p>
            </div>
          
            <span className=" timestamp">
            {format(new Date(pinned.message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
               " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:pinned.message.content}} className="msg_contnt" />
            </p>
       
        </div>


      </div>
     
      
    <div className="w-full mt-2 channel_pin_msg">
              {pinned.message.fileUrl?.length!==0 && 
              
              pinned.message.fileUrl.map((file, i)=>(
                <div key={i} className='px-4'>
                {/* {file} */}
                {/* <MsgFile fileUrl={file} key={i} length={pinned.message.fileUrl.length} type="msgFile" /> */}
                <SingleMsgFile fileUrl={file} />

                </div>
              ))
              
              }
            </div>
            </div>
            </div>
            ))
        }
            
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
    
    </>
  )
}

export default ChannelPin
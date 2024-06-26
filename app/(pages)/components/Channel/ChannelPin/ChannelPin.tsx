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
import { Member, PinnedPost } from '@prisma/client'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import MsgFile from '../../Chat/MsgFile'
import SingleMsgFile from './SingleMsgFile';
import Link from 'next/link';
import SinglePinPoll from './SinglePinPoll';
import { useParams } from 'next/navigation';
import SinglePinForm from './SinglePinForm';

interface PinnedProps {
    pinnedPosts:PinnedPost[]
    currentMember:Member
    schemaType:"DirectMessage" | "Channel"
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function ChannelPin({pinnedPosts, currentMember, schemaType}:PinnedProps) {
    
  const params = useParams();


  
  return (
    <>
    
    <Dialog>
  <DialogTrigger className='flex items-center'><BsFillPinAngleFill/> {pinnedPosts.length!==0 && pinnedPosts.length} Pinned</DialogTrigger>
  <DialogContent className='forward_container channel_pincon max-w-[570px] '>
    <DialogHeader>
      <DialogTitle>Pinned Messages</DialogTitle>
      {
        schemaType==="DirectMessage" ? <>
        <div className='channel_pin_container pb-8'>
          {
            pinnedPosts && pinnedPosts.map((pinned, i)=>(
              <>
               <div className="channel_single_pin" key={i}>
                               <div className="relative group flex items-center flex-col p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div  className="cursor-pointer hover:drop-shadow-md transition">
        {
            pinned.directMessage?.member?.user?.profilePic!==null ? 
            <UserAvatar src={pinned.directMessage.member?.user?.profilePic} /> :
            <LetterAvatar 
            name={pinned.directMessage?.member?.user.name===undefined ? 'Y': pinned.directMessage.member.user.name }
           size={40}
           radius={20}
            /> 
          }
       
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p  className=" chat_un">
                {!pinned.directMessage.member?.user ? "User": pinned.directMessage.member?.user?.name}
              </p>
            </div>
          
            <span className=" timestamp">
            {format(new Date(pinned.directMessage.createdAt), DATE_FORMAT)}
            </span>
          </div>
          <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
               " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:pinned.directMessage.content}} className="msg_contnt" />
            </p>
       
        </div>


      </div>
     
      
    <div className="w-full mt-2 channel_pin_msg">
              {pinned.directMessage.uploadedFiles?.length!==0 && 
              
              pinned.directMessage.uploadedFiles.map((file)=>(
                <div key={i} className='px-4'>
                {/* {file} */}
                {/* <MsgFile fileUrl={file} key={i} length={pinned.message.fileUrl.length} type="msgFile" /> */}
                <SingleMsgFile file={file} />

                </div>
              ))
              
              }
            </div>
              {
                pinned.directMessage.pollId!==null && <>
                <div className='w-full'>
                <SinglePinPoll poll={pinned.directMessage.poll} currentMember={currentMember} />

                </div>
                
                </>
              }
              {
                pinned.directMessage.formId!==null && <>
                <div className='w-full'>
                <SinglePinForm form={pinned.directMessage.form} currentMember={currentMember} />

                </div>
                
                </>
              }



            </div>
            </div>
              
              </>
            ))
          }


        </div>
     
         </> : <>
        <div className='channel_pin_container pb-8'>
        {
            pinnedPosts && pinnedPosts.map((pinned, i)=>(
           <>
           
           {
            pinned.message && <>
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
              {pinned.message.uploadedFiles?.length!==0 && 
              
              pinned.message.uploadedFiles.map((file)=>(
                <div key={i} className='px-4'>
                {/* {file} */}
                {/* <MsgFile fileUrl={file} key={i} length={pinned.message.fileUrl.length} type="msgFile" /> */}
                <SingleMsgFile file={file} />

                </div>
              ))
              
              }
            </div>
              {
                pinned.message.pollId!==null && <>
                <div className='w-full'>
                <SinglePinPoll poll={pinned.message.poll} currentMember={currentMember} />

                </div>
                
                </>
              }
              {
                pinned.message.formId!==null && <>
                <div className='w-full'>
                <SinglePinForm form={pinned.message.form} currentMember={currentMember} />

                </div>
                
                </>
              }



            </div>
            </div>

            </>
           }




           {
            pinned.thread &&       <div className="channel_single_pin" key={i}>
            <div className="relative group flex items-center flex-col p-4 transition w-full">
<div className="group flex gap-x-2 items-start w-full">
<div  className="cursor-pointer hover:drop-shadow-md transition">
{
pinned.thread?.member?.user?.profilePic!==null ? 
<UserAvatar src={pinned.thread.member?.user?.profilePic} /> :
<LetterAvatar 
name={pinned.thread?.member?.user.name===undefined ? 'Y': pinned.thread.member.user.name }
size={40}
radius={20}
/> 
}

</div>
<div className="flex flex-col w-full">
<div className="flex items-center gap-x-2 ">
<div className="flex items-center">
<p  className=" chat_un">
{!pinned.thread.member?.user ? "User": pinned.thread.member?.user?.name}
</p>
</div>

<span className=" timestamp">
{format(new Date(pinned.thread.createdAt), DATE_FORMAT)}
</span>
</div>
<p className={cn(
"text-sm text-zinc-200 dark:text-zinc-300",
" text-zinc-500 dark:text-zinc-400 text-xs mt-1"
)}>
{/* {content} */}
<div dangerouslySetInnerHTML={{__html:pinned.thread.content}} className="msg_contnt" />
</p>

</div>


</div>


<div className="w-full mt-2 channel_pin_msg">
{pinned.thread.fileUrl?.length!==0 && 

pinned.thread.fileUrl.map((file, i)=>(
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
           }
           
           </>
            ))
        }


        {
          pinnedPosts.length>0 && <div className='pt-4'>
            <Link href={`/servers/${params?.id}/pinned-message`} className='py-2 px-3 text-white rounded bg-green-500 hover:bg-green-600 mt-4 text-sm font-semibold'>See my pinned post</Link>
          </div>
        }
            
      </div>
         </>
      }
      
    </DialogHeader>
  </DialogContent>
</Dialog>
    
    </>
  )
}

export default ChannelPin
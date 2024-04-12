"use client";
import { Forums } from '@prisma/client'
import { format } from 'date-fns';
import React from 'react'
import { TbMessageCircle2Filled } from "react-icons/tb";
const DATE_FORMAT = "d MMM yyyy, HH:mm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BiSolidMessageDetail } from 'react-icons/bi';
import { Separator } from '@/components/ui/separator';
import ThreadChatComponents from '../threads/ThreadChatComponents';
import ThreadEditor from '../Editor/ThreadEditor';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import LetterAvatar from '../UserAvatar/LetterAvatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ForumFile from './ForumFile';

interface Props {
  forum:Forums
  ListStyle:string
  setForum:any
  
}
function SingleForums({forum,ListStyle, setForum}:Props) {
  function getFileExtension(filename:string) {
    let data = filename.split('**').pop();
    if(data?.includes('application')){
        data = data?.slice( data.indexOf('/'));
    }else {
        data = data?.slice(0, data.indexOf('/'));
    }
    return data;
}



  let count = 0;

  const forumFile = forum.responses[0].fileUrl;

  return (
    

    <>
    <button onClick={()=>setForum(forum)} className='text-left w-full'>
    <div className="single_forums w-full">
      <div className='forums_description w-full'>
      <div className='forums_title'>{forum.title}</div>
        <div> <span className="forum_createdBy">{forum?.member?.user?.name}:</span>
        <span className='text-zinc-400'>{forum?.responses[0].content}</span>
          </div>
       <div className='forum_Desc'>
        <span><TbMessageCircle2Filled/>{forum?.responses?.length}</span>
        <span>{format(new Date(forum.createdAt), DATE_FORMAT)}</span>
        </div>
      </div>

      {
       forumFile && forumFile.map((fileUrl:string)=>(
          <>
          {
            getFileExtension(fileUrl)==="image" && count===0 ?
             <div className='forums_content'>
              <span style={{display:"none"}}>{count++}</span>
            <ForumFile fileUrl={forumFile[0]} listStyle={ListStyle}  />
            </div>
            : 
            getFileExtension(fileUrl)==="video" && count===0 ?
        
             <div className='forums_content'>
              <span style={{display:"none"}}>{count++}</span>
            <ForumFile fileUrl={forumFile[0]} listStyle={ListStyle} />
            </div>
            : ''
          }
          
          </>
        ))
      }

      {/* {
        forum.fileUrl.length!==0 && 
        <div className='forums_content'>
       
            <ForumFile fileUrl={forum.fileUrl[0]} listStyle={ListStyle} />
        
      </div>
      } */}
     
    </div>
    </button>

{/* <Dialog >
<DialogTrigger asChild >
<button className='sing_foBn'>
<div className="single_forums">
        <div className='forums_title'>{forum.title}</div>
        <div className="forum_createdBy">{forum?.member?.user?.name}</div>
        <div className='forum_Desc'>
            
            <span><TbMessageCircle2Filled/>{forum?.responses?.length}</span>
            <span>{format(new Date(forum.createdAt), DATE_FORMAT)}</span>
            </div>
    </div>

</button>
</DialogTrigger>
<DialogContent className="threadcontainer">
  <DialogHeader>
    <DialogTitle className='d-flex items-center gap-2'><BiSolidMessageDetail/> Thread</DialogTitle>
  <Separator />
  </DialogHeader>
      
       <div style={{overflow:"scroll"}}>
      <div className='thred_main'>
      <div className="relative group flex items-center  p-4 transition w-full msg_cnbdy">
<div className="group flex gap-x-2 items-start w-full">
  <div  className="cursor-pointer hover:drop-shadow-md transition">

    {
      forum?.member?.user?.profilePic!==null ? 
      <UserAvatar src={forum.member?.user?.profilePic} /> :
      <LetterAvatar 
      name={forum?.member?.user.name===undefined ? 'Y': forum.member.user.name }
     size={40}
     radius={20}
      /> 
    }
 
  </div>


  <div className="flex flex-col w-full">
    <div className="flex items-center gap-x-2 ">
      <div className="flex items-center">
        <p  className=" chat_un">
          {!forum.member?.user ? "User": forum.member?.user?.name}
        </p>
      </div>
    
      <span className=" timestamp">
      {format(new Date(forum.createdAt), DATE_FORMAT)}
      </span>
    </div>
    {isImage && (
      <a 
        href={forum.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
      >
        <Image
          src={forum.fileUrl}
          alt={forum.content}
          fill
          className="object-cover"
        />
      </a>
    )}
     <p className={cn(
        "text-sm text-zinc-200 dark:text-zinc-300",
         "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
      )}>
        <div dangerouslySetInnerHTML={{__html:forum.title}} className="msg_contnt" />
      </p>

   
  </div>
</div>

</div>
      </div>
      <hr />
      <ThreadChatComponents 
      member={forum?.member}
      chatId={forum.id}
      type='forums'
      apiUrl='/api/messages/threads/forum'
      socketUrl='/api/socket/threads/forum'
      paramKey='forumId'
      paramValue={forum.id}       
      />
       </div>



    <ThreadEditor
    name={"Reply..."}
   type="forums"
   apiUrl="/api/socket/threads/forum"
   query={{
    forumId:forum.id,
    forumsChannelId:forum.forumsChannelId,
   serverId: forum?.serverId,
   sectionId:forum?.sectionId
}} />
</DialogContent>
</Dialog> */}
    
    </>




  )
}

export default SingleForums
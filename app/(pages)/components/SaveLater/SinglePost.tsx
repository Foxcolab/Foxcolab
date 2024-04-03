import { db } from '@/prisma'
import { MemberRole, Message, PinnedPost } from '@prisma/client'
import React from 'react'

import { ActionTooltip } from '../tooolkit/Toolkit';
import Image from 'next/image';
import { FileIcon, ShieldAlert, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import Profile from './Profile';
import { cn } from '@/lib/utils';
import MsgUpper from '../PinnedMsg/MsgUpper';
import MsgUpper2 from './MsgUpper2';
interface messageProps {
    PinnedPost:PinnedPost,
    status:String,
    serverId:String,
    userId:String
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  }
const DATE_FORMAT = "d MMM yyyy, HH:mm";
  
  function SinglePost({PinnedPost, serverId, userId, status}:messageProps) {

    console.log("PINNEDHDHDHD", PinnedPost);
    

  const message = PinnedPost.id;
  const member = PinnedPost.member;    
    // console.log(message?.createdAt);
    
    // const message = await db.message.findFirst({
    //     where:{
    //         id:PinnedPost.messageId
    //     },
    //     include:{
    //         member:true,
    //         channel:true
    //     }

    // });
    // const member = await db.member.findFirst({
    //     where:{
    //         id:message?.member.id
    //     },
    //     include:{
    //         user:true
    //     }
    // })

    const fileUrl = message?.fileUrl;
    const content = message?.content;
    console.log(content);
    
    const fileType = fileUrl?.split(".").pop();

    const isAdmin = member?.role === MemberRole.admin;
    const isModerator = member?.role === MemberRole.moderator;
    // const isOwner = member.id === member.id;
    // const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    // const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;
    // const onMemberClick =()=>{}
  return (
    <>

        <div className='pinsmsg'>
        <MsgUpper2 name={PinnedPost?.channel?.name} id={PinnedPost.id} serverId={serverId} userId={userId} />

            <div className="pin_msg">
            <Profile name={member?.user?.name} url={member?.user?.profilePic} />
           <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p  className=" chat_un">
                {!member?.user ? "User": member?.user?.name}
              </p>
              {/* <ActionTooltip label={member.role}>
                {roleIconMap[member?.role]}
              </ActionTooltip> */}
            </div>
            <span className="timestamp">
              {format(new Date(PinnedPost?.createdAt), DATE_FORMAT)}
            </span>
          </div>
          {isImage && (
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
          )}
           <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
               "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:content}} className="msg_contnt" />
            </p>

         
        </div>
            </div>


        </div>
    
    
    
    
    </>
  )
}

export default SinglePost
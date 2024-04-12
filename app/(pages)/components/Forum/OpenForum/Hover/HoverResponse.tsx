import React, { useState } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { ActionTooltip } from '../../../tooolkit/Toolkit';
import { EmojiPicker } from '../../../Emoji/Emoji';
import { ForumResponse } from '@prisma/client';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
    children:React.ReactNode
    forumResponse:ForumResponse
    setIsEditing:any
    setDOpen:any
    dOpen:boolean
    isMsgCreator:boolean
}

function HoverResponse({children, forumResponse, setIsEditing, setDOpen, dOpen, isMsgCreator}:Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const router = useRouter();


    const DeleteDialogHandler =()=>{
        setDeleteDialog(true);
    }
  return (
    <>

  
    <HoverCard  open={open} onOpenChange={setOpen}>
    <HoverCardTrigger asChild onMouseEnter={()=>setOpen(true)}>
       {children}
      </HoverCardTrigger>
      <HoverCardContent className={cn("flex items-center msg_emoji_container hover_response_container", isMsgCreator ? "w-36" :"w-12 flex justify-center items-center") } side="top" align='end' >
       
        <div className='hover_emoji_item'>
        <ActionTooltip label='Add Reaction' side='top' align='center'>
            <EmojiPicker
                    messageId={forumResponse.id} channelId={forumResponse.forumsId as string}
                    type="hover" schemaType='forum' />
        </ActionTooltip> 
        {
          isMsgCreator && <>
          <ActionTooltip label='Edit Comment'>
            <button onClick={()=>setIsEditing(true)}><BiEdit/></button>
        </ActionTooltip>
        <ActionTooltip label='Delete comment'>
            <button onClick={()=>setDOpen(true)}><AiFillDelete/></button>
        </ActionTooltip>
          </>
        }
        



 
        </div>

</HoverCardContent>
    </HoverCard>
  
   
    </>
    )
}

export default HoverResponse
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

interface Props {
    children:React.ReactNode
    forumResponse:ForumResponse
    setIsEditing:any
    setDOpen:any
    dOpen:boolean
}

function HoverResponse({children, forumResponse, setIsEditing, setDOpen, dOpen}:Props) {
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
      <HoverCardContent className="flex items-center msg_emoji_container hover_response_container w-36" side="top" align='end' >
       
        <div className='hover_emoji_item'>
        <ActionTooltip label='Add Reaction' side='top' align='center'>
            <EmojiPicker
                    messageId={forumResponse.id} channelId={forumResponse.forumsId as string}
                    type="hover" schemaType='forum' />
        </ActionTooltip> 

        <ActionTooltip label='Edit Comment'>
            <button onClick={()=>setIsEditing(true)}><BiEdit/></button>
        </ActionTooltip>
        <ActionTooltip label='Delete comment'>
            <button onClick={()=>setDOpen(true)}><AiFillDelete/></button>
        </ActionTooltip>



 
        </div>

</HoverCardContent>
    </HoverCard>
  
   
    </>
    )
}

export default HoverResponse
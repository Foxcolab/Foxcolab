import { cn } from '@/lib/utils'
import { Draft } from '@prisma/client'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import MsgFile from '../Chat/MsgFile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { MdEditSquare, MdOutlineSend, MdScheduleSend } from 'react-icons/md'
import { ActionTooltip } from '../tooolkit/Toolkit'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'

interface DraftProps {
    drafts: Draft[]
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";


function Drafts({drafts}:DraftProps) {
  const [open, setOpen] = useState(false);
  // const [selectDraft, setSelectedDraft]
  const [loading, setLoading] = useState(false);
    const router = useRouter();
    console.log(open)
    const ChannelHandler=(channelId:string)=>{
      console.log("Open", open)
      if(open) return;
        router.push(`channels/${channelId}`)
    }

    const PrintDate=(date:any)=> {
      const currentDate = new Date();
      const providedDate = new Date(date);
  
      // Set hours, minutes, seconds, and milliseconds to 0 for comparison
      currentDate.setHours(0, 0, 0, 0);
      providedDate.setHours(0, 0, 0, 0);
  
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
      // Calculate the difference in days
      const diffDays = Math.round(Math.abs((providedDate - currentDate) / oneDay));
  
      if (diffDays === 0) {
        // const hours = providedDate.getHours();
        // const minutes = providedDate.getMinutes();
        // const formattedHours = hours < 10 ? '0' + hours : hours;
        // const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        // const formattedTime = `${formattedHours}:${formattedMinutes}`;
        // const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        return "Today";
    } else if (diffDays === -1) {
        return "Tomorrow"
    } else if (diffDays === 1) {
        return "Yesterday"
    } else {
        return format(new Date(date), DATE_FORMAT);
    }
  }

  const ToogleActions=(draftId:string)=>{
    const btn = document.getElementById(`draft_action${draftId}`);
    const time = document.getElementById(`time${draftId}`);
    if(!btn || !time) return;
    if(btn.style.display == 'none'){
      btn.style.display='flex';
      time.style.display='none';
    }else {
      btn.style.display='none';
      time.style.display='inline';
    }
  }

  const DeleteHandler=async(draft:Draft)=>{
    try {
      setLoading(true);
      await axios.delete(`/api/draft?serverId=${draft.serverId}&draftId=${draft.id}&channelId=${draft.channelId}`);
      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  const SendMessage=async(draft:Draft)=>{
    try {
       await axios.post(`/api/socket/messages?serverId=${draft.serverId}&channelId=${draft.channelId}&sectionId=${draft.sectionId}`, {content:draft.content, fileUrl:draft.fileUrl});
      await DeleteHandler(draft);
      router.refresh();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
    
    <div className="saved_all_container">
    {
      drafts && drafts.map((draft, i)=>(
        <div onClick={()=>ChannelHandler(draft?.channelId)} key={i} className='w-full text-left' onMouseEnter={()=>ToogleActions(draft.id)} onMouseLeave={()=>ToogleActions(draft.id)}>
                    <div className='pinsmsg' >
                


                <div className="flex items-start gap-2">
                {/* <Profile name={draft.message.member?.user?.name} url={saved.message.member?.user?.profilePic} /> */}
                        <div className="draft_channel_type">
                        {draft.channel.type==="public"?"#": <FaLock  />}
                        </div>
                <div className="flex flex-col w-full">
                <div className='flex items-center justify-between leading-8'>
                <div className="draft_channel_title">{draft.channel.type==="public"?"#": <FaLock  />}{draft.channel.name}</div>
                <div className='text-xs text-[#bdbdbd]'>
                  <div className='draft_actions' id={`draft_action${draft.id}`} style={{display:"none"}}>
                    <ActionTooltip align='center' label='Delete Draft' side='top'>
                    <button onClick={()=>setOpen(true)}><RiDeleteBin6Fill/></button>
                    </ActionTooltip>
                    <ActionTooltip align='center' label='Edit  Draft'side='top' >
                    <button onClick={()=>ChannelHandler(draft.id)}><MdEditSquare/></button>
                    </ActionTooltip>
                    <ActionTooltip  align='center' label='Sceduled message'side='top' >
                    <button><MdScheduleSend/></button>
                    </ActionTooltip>
                    <ActionTooltip  align='center' label='Send Message' side='top' >
                    <button onClick={()=>SendMessage(draft)}><MdOutlineSend/></button>
                    </ActionTooltip>
                  </div>
                <span id={`time${draft.id}`} className='print_date'>{PrintDate(draft?.createdAt)}</span>
                </div>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Delete draft?</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className='text-gray-600'> Are you sure you want to delete this draft to {draft.channel.type==="public"?"#": <FaLock  />}{draft.channel.name}</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={"outline"} autoFocus={false}>Cancel</Button>
          <Button type="submit" className='bg-red-600' onClick={()=>DeleteHandler(draft)} autoFocus={false}>Delete </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
                
                <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:draft.content}} className="msg_contnt" />
                </p>
                
                
                </div>
                </div>
                <div className="all_imgs">
                {draft.fileUrl?.length!==0 && 
                
                draft.fileUrl &&  draft?.fileUrl?.map((file:string, i:number)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />
                
                </>
                ))
                
                }
                </div>  
                </div>
        </div>




        ))
    }
    </div>

    
    </>
  )
}

export default Drafts
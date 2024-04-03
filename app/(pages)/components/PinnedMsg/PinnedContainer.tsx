"use client";
import { cn } from '@/lib/utils'
import { PinnedPost } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import Profile from '../SaveLater/Profile'
import MsgFile from '../Chat/MsgFile'
import { ActionTooltip } from '../tooolkit/Toolkit';
import { Lock, Trash2 } from 'lucide-react';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


interface PinnedProps {
    PinnedPosts: PinnedPost[]
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function PinnedContainer({PinnedPosts}:PinnedProps) {
    const params = useParams();
    const router = useRouter();

    const ShowDeleteButton =(id:string)=>{
        const btn = document.getElementById(`pin_trash${id}`) || null;
        if(btn===null) return;
        if(btn?.style.display==="inline"){
            btn.style.display = 'none';
        }
        else{
            btn.style.display = 'inline';
        }
    }

    const RemovePinnedPost =async(pinned:PinnedPost)=>{
        try {
            const res = await axios.delete(`/api/pinnedmessage?serverId=${params?.id}&pinnedId=${pinned.id}&messageId=${pinned.messageId}`);
            console.log(res);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>



    <div className="saved_all_container">
        
    {
            PinnedPosts && PinnedPosts.map((saved)=>(
                <div key={saved.id} className='pinsmsg flex  justify-between pin_imp' onMouseEnter={()=>ShowDeleteButton(saved.id)} onMouseLeave={()=>ShowDeleteButton(saved.id)}>
                    <div>

                   <div className='text-sm flex items-center gap-1 text-stone-400'> {saved.message.channel.type==="public"?"#": <FaLock  />}{saved.message.channel.name}</div>
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
            </div>

            <div className='mt-4'>
            <ActionTooltip label='Remove from list' side='top' align='center'><button className='pin_trash' id={`pin_trash${saved.id}`} style={{display:"none"}} onClick={()=>RemovePinnedPost(saved)}><Trash2 size={15} /></button></ActionTooltip>

            </div>

                </div>

            ))
        }
    
    </div>
        
    
    
    </>
  )
}

export default PinnedContainer
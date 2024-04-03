import { Message } from '@prisma/client'
import React from 'react'
import MsgFile from '../Chat/MsgFile'
import Profile from '../SaveLater/Profile'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { FaLock } from 'react-icons/fa'

interface SentsProp {
    Sents:Message[]
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function Sents({Sents}:SentsProp) {
  return (
    <>
    
    <div className="saved_all_container">
    {
        Sents && Sents.map((sent, i)=>(
            <>
  <div  key={i} className='w-full text-left' >
                    <div className='pinsmsg' >
                


                <div className="flex items-start gap-2">
                {/* <Profile name={draft.message.member?.user?.name} url={saved.message.member?.user?.profilePic} /> */}
                        <div className="draft_channel_type">
                        {sent.channel.type==="public"?"#": <FaLock  />}
                        </div>
                <div className="flex flex-col w-full">
                <div className='flex items-center justify-between leading-8'>
                <div className="draft_channel_title">{sent.channel.type==="public"?"#": <FaLock  />}{sent.channel.name}</div>
               
                </div>

                
                <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:sent.content}} className="msg_contnt" />
                </p>
                
                
                </div>
                </div>
                <div className="all_imgs">
                {sent.fileUrl?.length!==0 && 
                
                sent.fileUrl &&  sent?.fileUrl?.map((file:string, i:number)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />
                
                </>
                ))
                
                }
                </div>  
                </div>
        </div>

            </>
        ))
    }
  </div>  
    </>
  )
}

export default Sents
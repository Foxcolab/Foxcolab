"use client";
import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { PiHashFill } from "react-icons/pi";
import { FaUserClock } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
interface MsgUpperProps {
    name:String,
    id:String,
    serverId:String,
    userId:String

}

function MsgUpper({name, id, serverId, userId}:MsgUpperProps) {
    const [loading, setLoading] = useState(false)

    const RemovePinnedPost =async()=>{
        try {
            
            setLoading(true);
        const res = await axios.delete(`/api/pinnedmessage/remove?id=${id}&serverId=${serverId}`);
        if(res.status===200){
            setLoading(false);

        }

        setLoading(false);
        } catch (error) {
            setLoading(false)
        }
    }
  return (
    <>
    
        {
            loading ? 
            
             <button disabled className=''>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                Please wait
              </button> 
            
            
            
            : <>
    
    <div className='pinhddi'>
            <h1># {name}</h1>
            <div>
               {/* <button className='cmlt'><IoMdCheckboxOutline/> Complete</button>  */}
            {/* <button><FaUserClock/></button> */}
   <button><PiHashFill/></button>
 <button onClick={RemovePinnedPost}><AiFillDelete/></button>
   {/* <button><RiInboxArchiveFill/></button> */}
   {/* <ActionTooltip label='Reminder' side='top' align='center' key={message?.id}> <button><FaUserClock/></button></ActionTooltip> 
   <ActionTooltip label='Open in channel' side='top' align='center' key={message?.id}><button><PiHashFill/></button></ActionTooltip> 
   <ActionTooltip label='Remove' side='top' align='center' key={message?.id}><button><AiFillDelete/></button></ActionTooltip> 
   <ActionTooltip label='Archived' side='top' align='center' key={message?.id}><button><RiInboxArchiveFill/></button></ActionTooltip>  */}

               
               
                
                
                
            </div>
            </div>

            </>
        }
    
    
    
    </>
  )
}

export default MsgUpper
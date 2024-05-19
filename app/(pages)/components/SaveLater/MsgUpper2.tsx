"use client";
import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { PiHashFill } from "react-icons/pi";
import { FaHashtag, FaLock, FaUserClock } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import { GoClockFill } from "react-icons/go";
import { ActionTooltip } from '../tooolkit/Toolkit';
import { useRouter } from 'next/navigation';
interface MsgUpperProps {
    name:string,
    id:string,
    serverId:string,
    userId:string
    status:string
    type:string
}

function MsgUpper2({name, id, serverId, status, type}:MsgUpperProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const RemovePinnedPost =async()=>{
        try {
            
            // setLoading(true);
        const res = await axios.delete(`/api/save-later/remove?id=${id}&serverId=${serverId}`);

        setLoading(false);
        router.refresh();
        } catch (error) {
            setLoading(false)
        }
    }

    const ChangeStatus = async(status:string)=>{
        try {
            // setLoading(true);
            const res = await axios.put(`/api/save-later/update-status?id=${id}&serverId=${serverId}`, {status});
            // if(res.status===200){
            //     setLoading(false);
            // }
            // setLoading(false)
            router.refresh();
        } catch (error) {
            setLoading(false)
            console.log(error);
            
        }
    }

    


  return (
    <>
    
        {
            loading ? 
            
             <button disabled className=''>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                {/* Please wait */}
              </button> 
            
            
            
            : <>
    
    <div className='pinhddi'>
                  <div className='flex items-center text-sm font-semibold italic'><span>{type==="public" ? <FaHashtag/>: <FaLock/>}</span> {name}</div>
            {/* <h1># {name}</h1> */}
            <div>

            {
                status==="progress" ? 
                <> 
                
                <ActionTooltip label='Completed' side='top' align='center'>
                <button className='cmlt' onClick={e=>ChangeStatus("completed")}>Completed
                </button> 
                </ActionTooltip>

                <ActionTooltip label='Reminder' side='top' align='center'>
                <button ><GoClockFill/></button>
                </ActionTooltip>
                {/* <ActionTooltip label='Open in channel' side='top' align='center'>
                <button><PiHashFill/></button>
                </ActionTooltip> */}
                <ActionTooltip label='Delete' side='top' align='center'>
                <button onClick={RemovePinnedPost} ><AiFillDelete/></button>
                </ActionTooltip>
                <ActionTooltip label='Archived' side='top' align='center'>
                <button onClick={e=>ChangeStatus("archived")}><RiInboxArchiveFill/></button>
                </ActionTooltip>
                
                </> : status==="archived" ? 
                <> 
                
                <ActionTooltip label='Completed' side='top' align='center'>
                <button className='cmlt bg-green-500' onClick={e=>ChangeStatus("completed")}>Completed
                </button> 
                </ActionTooltip>

                
                <ActionTooltip label='Delete' side='top' align='center'>
                <button onClick={RemovePinnedPost} ><AiFillDelete/></button>
                </ActionTooltip>
             
                
                
                </> : 
                <> 
                
                

                <ActionTooltip label='Move to inprogress' side='top' align='center'>
                <button className='cmlt bg-yellow-400 text-blue-700 hover:bg-yellow-600' onClick={e=>ChangeStatus("progress")}>In Progress
                </button> 
                </ActionTooltip>
                <ActionTooltip label='Delete' side='top' align='center'>
                <button onClick={RemovePinnedPost} ><AiFillDelete/></button>
                </ActionTooltip>
                
                </>
            }
                
  

               
                
                
                
            </div>
            </div>

            </>
        }
    
    
    
    </>
  )
}

export default MsgUpper2
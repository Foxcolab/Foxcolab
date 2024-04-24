import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { BsFillKeyFill } from 'react-icons/bs';
import { FaSquareThreads } from 'react-icons/fa6';
import { MdRecordVoiceOver, MdScheduleSend } from 'react-icons/md';
import { PiScreencastFill } from 'react-icons/pi';
import { RiDoubleQuotesL, RiDoubleQuotesR, RiFolderVideoFill } from 'react-icons/ri';
import { TbMessage2Up } from 'react-icons/tb';



const items = [
    {
        icon:<FaSquareThreads/>,
        name:"Threads"
    },
    {
        icon:<MdScheduleSend/>,
        name:"Scheduling"
    },
    {
        icon:<MdRecordVoiceOver/>,
        name:"Voice Message"
    },
    {
        icon:<RiFolderVideoFill/>,
        name:"Video Message"
    },
    {
        icon:<PiScreencastFill/>,
        name:"Screen Sharing"
    },
    {
        icon:<BsFillKeyFill/>,
        name:"Permissions"
    },
    {
        icon:<TbMessage2Up/>,
        name:"Direct Message"
    }

]


function UsefulFeature() {
    const [state, setState] = useState('Threads');
  return (
    <>
    
    <div className="pt-24 pb-8">
    <div className='text-[2.8rem] text-center font-semibold flex items-center gap-1 justify-center'><span className=''><sup><RiDoubleQuotesL/> </sup></span> Packed with Useful Features<span className=''><sup><RiDoubleQuotesR/></sup> </span></div>
    <div className='text-center text-lg font-semibold'>From integrations to security, Foxcolab has everything a modern team needs.
</div>


    <div className='p-8'>
        <div className='  flex items-center justify-center '>
        {
            items.map((item, i)=>(
                <div key={i}>
                    <button onClick={()=>setState(item.name)} className={cn('flex flex-col items-center gap-2   rounded-md h-24 w-36 justify-center', state===item.name && "text-green-600 border-green-500  border shadow-md" )}>
                        <span className='text-[2rem]'>{item.icon}</span>
                        <span className=''>{item.name}</span>
                    </button>
                </div>
            ))
        }
          </div>
    </div>

        <div className="mx-40 flex border border-[#e9e9e9] rounded-xl overflow-hidden shadow-xl">
            {
                state==="Scheduling" ? <div className='bg-red-500 w-3/5 h-[20rem]  flex-none '>
<Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                </div> :
                state==="Threads" ? <div className='bg-green-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                state==="Voice Message" ? <div className='bg-violet-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                state==="Video Message" ? <div className='bg-blue-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                state==="Screen Sharing" ? <div className='bg-cyan-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                state==="Permissions" ? <div className='bg-pink-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                state==="Direct Message" ? <div className='bg-yellow-500 w-3/5 h-[20rem]  flex-none '>

                </div>:
                ''
            }
            
            <div>
                {
                    state==="Scheduling" ?
                    <>
                    <div className='p-4 flex justify-center items-center flex-col h-full '>
                    <div className='text-[2rem] font-semibold'>Scheduling</div>
                    <div className='text-gray-500'>Schedule your message to be sent when you want it, and don’t risk forgetting about it, without bothering anyone outside their work hours.</div>
                    </div>
                    
                    </> :
                    state==="Threads" ?
                    <>
                    <div className='p-4 flex justify-center items-center flex-col h-full '>
                    <div className='text-[2rem] font-semibold'>Threads</div>
                    <div className='text-gray-500'>Threads is where focused discussions and decisions take place. As your single place for communication, stay on top of action items and never lose track..</div>
                    </div>
                    
                    </> : 
                     state==="Voice Message" ?
                     <>
                     <div className='p-4 flex justify-center items-center flex-col h-full '>
                     <div className='text-[2rem] font-semibold'>Voice Message</div>
                     <div className='text-gray-500'>Sending voice notes in Foxcolab instead of text and increase your efficiency. Share ideas and updates, or just say hello to your teammates.</div>
                     </div>
                     
                     </> : 
                      state==="Video Message" ?
                      <>
                      <div className='p-4 flex justify-center items-center flex-col h-full '>
                      <div className='text-[2rem] font-semibold'>Video Message</div>
                      <div className='text-gray-500'>Instead of scheduling a meeting, record a video message covering the information you want to share.</div>
                      </div>
                      
                      </> : 
                       state==="Screen Sharing" ?
                       <>
                       <div className='p-4 flex justify-center items-center flex-col h-full '>
                       <div className='text-[2rem] font-semibold'>Screen Sharing</div>
                       <div className='text-gray-500'>You can share your entire screen at once, meaning that people will see your screen exactly as you do, or you can share a specific app.</div>
                       </div>
                       
                       </> : 
                        state==="Permissions" ?
                        <>
                        <div className='p-4 flex justify-center items-center flex-col h-full '>
                        <div className='text-[2rem] font-semibold'>Permissions</div>
                        <div className='text-gray-500'>Set up different workspaces and channel permissions within your workspace.</div>
                        </div>
                        
                        </> : 
                        state==="Direct Message" ?
                        <>
                        <div className='p-4 flex justify-center items-center flex-col h-full '>
                        <div className='text-[2rem] font-semibold'>Direct Message</div>
                        <div className='text-gray-500'>Schedule your message to be sent when you want it, and don’t risk forgetting about it, without bothering anyone outside their work hours.</div>
                        </div>
                        
                        </> : 
                    
                    ''
                }
                
            </div>
        </div>



    <div>

    </div>
   






    </div>
    
    </>
  )
}

export default UsefulFeature
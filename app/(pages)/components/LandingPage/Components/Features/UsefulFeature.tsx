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
    
    <div className="mt-24 py-8 ">
    <div className='landling_feature_title'><span className=''><sup><RiDoubleQuotesL/> </sup></span> Packed with <span className='text-[#E04D6C]'>&nbsp;Useful&nbsp;</span> Features<span className=''><sup><RiDoubleQuotesR/></sup> </span></div>
    <div className='text-center text-lg font-semibold'>From integrations to security, Foxcolab has everything a modern team needs.
</div>


    <div className='p-8 pb-4'>
        <div className='  flex items-center justify-center flex-wrap'>
        {
            items.map((item, i)=>(
                <div key={i}>
                    <button onClick={()=>setState(item.name)} className={cn('flex flex-col items-center gap-2   rounded-md h-24 w-36 justify-center', state===item.name && "text-green-600 border-green-600  border shadow-md" )}>
                        <span className='text-[2rem]'>{item.icon}</span>
                        <span className=''>{item.name}</span>
                    </button>
                </div>
            ))
        }
          </div>
    </div>

        <div className='flex flex-col items-center justify-center p-4'>


        <div className='mb-8 font-semibold text-[1.2rem] w-[800px] text-center'>
                {
                    state==="Scheduling" ?
                    <>
                    <div className='p-4 flex justify-center items-center flex-col h-full '>
                    {/* <div className='text-[2rem] font-semibold'>Scheduling</div> */}
                    <div className='text-gray-500'><span  className='text-[#E04D6C]'>Schedule</span> your message to be sent when you want it, and don’t risk forgetting about it, without bothering anyone outside their work hours. </div>
                    </div>
                    
                    </> :
                    state==="Threads" ?
                    <>
                    <div className='p-4 flex justify-center items-center flex-col h-full '>
                    {/* <div className='text-[2rem] font-semibold'>Threads</div> */}
                    <div className='text-gray-500'><span className='text-[#E04D6C]'>Threads</span> is where focused discussions and decisions take place. As your single place for communication, stay on top of action items and never lose track.</div>
                    </div>
                    
                    </> : 
                     state==="Voice Message" ?
                     <>
                     <div className='p-4 flex justify-center items-center flex-col h-full '>
                     {/* <div className='text-[2rem] font-semibold'>Voice Message</div> */}
                     <div className='text-gray-500'>Sending <span className='text-[#E04D6C]'>voice notes</span> in Foxcolab instead of text and increase your efficiency. Share ideas and updates, or just say hello to your teammates.</div>
                     </div>
                     
                     </> : 
                      state==="Video Message" ?
                      <>
                      <div className='p-4 flex justify-center items-center flex-col h-full '>
                      {/* <div className='text-[2rem] font-semibold'>Video Message</div> */}
                      <div className='text-gray-500'>Instead of scheduling a meeting, record a <span className='text-[#E04D6C]'>video message</span> covering the information you want to share.</div>
                      </div>
                      
                      </> : 
                       state==="Screen Sharing" ?
                       <>
                       <div className='p-4 flex justify-center items-center flex-col h-full '>
                       {/* <div className='text-[2rem] font-semibold'>Screen Sharing</div> */}
                       <div className='text-gray-500'>You can share your <span className='text-[#E04D6C]'>entire screen</span> at once, meaning that people will see your screen exactly as you do, or you can share a specific app.</div>
                       </div>
                       
                       </> : 
                        state==="Permissions" ?
                        <>
                        <div className='p-4 flex justify-center items-center flex-col h-full '>
                        {/* <div className='text-[2rem] font-semibold'>Permissions</div> */}
                        <div className='text-gray-500'>Set up different workspaces and channel <span className='text-[#E04D6C]'>permissions</span> within your workspace.</div>
                        </div>
                        
                        </> : 
                        state==="Direct Message" ?
                        <>
                        <div className='p-4 flex justify-center items-center flex-col h-full '>
                        {/* <div className='text-[2rem] font-semibold'>Direct Message</div> */}
                        <div className='text-gray-500'>Instantly connect with team members through private, <span className='text-[#E04D6C]'>one-to-one</span> messaging for efficient, focused communication</div>
                        </div>
                        
                        </> : 
                    
                    ''
                }
                
            </div>
        <div className="useful_feat_list    rounded-xl overflow-hidden  ">
            
            
            
            
            {
                state==="Scheduling" ? <div className=' w-full  useful_feat_image flex-none '>
                <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Scheduling_Frontpage+(1).png'} height={100} width={100} alt='' unoptimized />
                </div> :
                state==="Threads" ? <div className=' w-full useful_feat_image  flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Threads_Frontpage+(1).png'} height={100} width={100} alt='' unoptimized />

                </div>:
                state==="Voice Message" ? <div className=' w-full useful_feat_image  flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/voice+message_Frontpage+(1).png'} height={100} width={100} alt='' unoptimized />

                </div>:
                state==="Video Message" ? <div className=' w-full useful_feat_image  flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Video+message_Frontpage+(1).png'} height={100} width={100} alt='' unoptimized />

                </div>:
                state==="Screen Sharing" ? <div className='w-full  useful_feat_image flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Sreen+Sharing_Frontpage+.png'} height={100} width={100} alt='' unoptimized />

                </div>:
                state==="Permissions" ? <div className=' w-full  useful_feat_image flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Permission_Front+page+(1).png'} height={100} width={100} alt='' unoptimized />

                </div>:
                state==="Direct Message" ? <div className=' w-full useful_feat_image  flex-none '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Direct+message_Frontpage.png'} height={100} width={100} alt='' unoptimized />
                </div>:
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
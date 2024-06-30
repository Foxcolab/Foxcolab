import { cn } from '@/lib/utils'
import React from 'react'
import { BsFillHeartPulseFill, BsQuestionOctagonFill } from 'react-icons/bs'
import { FaPoll } from 'react-icons/fa'
import { GoWorkflow } from 'react-icons/go'
import { HiInboxArrowDown } from 'react-icons/hi2'
import { RiTeamFill } from 'react-icons/ri'


const Items = [
    {
        icon:<FaPoll/>,
        title:"Polls & Surveys"
    },
    {
        icon:<BsQuestionOctagonFill/>,
        title:"Q&A"
    },
    {
        icon:<HiInboxArrowDown/>,
        title:"Suggesstion Box"
    },
    {
        icon:<BsFillHeartPulseFill/>,
        title:"Pulse Check"
    },
    {
        icon:<GoWorkflow/>,
        title:"Workflow"
    },
    {
        icon:<RiTeamFill/>,
        title:"Team Building"
    },
]

function Empower() {
    const colors = [ 'text-blue-500', 'text-orange-500', 'text-green-500', 'text-blue-500', 'text-orange-500', 'text-green-500' ]
  return (
    <>
    
    
    <div className='my-[3rem] bg-[#F0F9FF] py-[2rem]'>
        <div className='text-center'>
        <h2 className='text-[2.5rem] font-semibold'>Engage, empower, and align your team</h2>
        <p className='text-[1.2rem] font-semibold text-color-600'>across messaging, meetings, and wherever work is happening</p>
        
        <div className='mx-[5rem] mt-4'>
            <div className="grid grid-cols-6 gap-0">
                {Items.map((item, index) => (
                    <div key={index} className='  p-4'>
                        <div className={cn('flex justify-center items-center text-[5rem] ', colors[index])}>
                            {item.icon}
                        </div>
                        <div className='text-center mt-2 text-[1.2rem] text-gray-700 font-semibold'>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>


        </div>
    </div>
    
    </>
  )
}

export default Empower
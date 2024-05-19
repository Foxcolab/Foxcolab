import React from 'react'
import { MdSecurity } from 'react-icons/md'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'


const items = [
    {
        name:"Trust",
        description:"Communicate and collaborate with people and organisations you trust."
    },
    {
        name:"Choice",
        description:"Choose how you host, share and manage your data."
    },
    {
        name:"Freedom",
        description:"Freedom to structure discussion spaces and customise chat rooms."
    }
]

function Security() {
  return (
    <>
    
    <div className="pt-24 pb-8">
        <div className='flex items-center justify-center text-[1.2rem] gap-2 pb-4 font-semibold'>A new sense of security <MdSecurity/></div>
        <div className='landling_feature_title'>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center'><span className='double_quote'><sup><RiDoubleQuotesL/> </sup></span>Giving you the freedom to </div>
            <div className='flex items-center pl-8'>communicate on your own terms. <span className='double_quote'><sup><RiDoubleQuotesR/></sup> </span></div>
        </div>
    
    
    
    </div>

    <div className='  security_container gap-4 pt-4 px-8  justify-center'>
        {
            items.map((item, i)=>(
        <div key={i} className=' security_container_item  bg-white border border-[#e9e9e9]  rounded-md shadow-md'>
            <div className='flex items-center justify-center flex-col p-4 h-full'>
            <div className='text-[1.3rem] font-semibold text-center'>{item.name}</div>
            <div className='text-[#7b7c81]'>
                {item.description}
            </div>
            </div>
        </div>
            ))
        }
        
    </div>

    </div>
    
    </>
  )
}

export default Security
import { Member } from '@prisma/client'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
    name:string
    Members:Member[]
}
function ForumsHeaderSection({name, Members}:Props) {
  return (
    <>
    
    <div className="chat_section">
        <div className="channel_title">
        <div className='channel_name'>
        <div className='channel_mem'>
           
 <button># {name} <IoIosArrowDown/></button>
          
          
          </div>
          </div>
        <div className='channel_mem'>

                <button>Members</button>
         </div>
         </div>
      </div>
    
    </>
  )
}

export default ForumsHeaderSection
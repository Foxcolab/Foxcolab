import { MemberRole } from '@prisma/client'
import React from 'react'

  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

import { FaCircleInfo } from 'react-icons/fa6'
import { ActionTooltip } from '@/app/(pages)/components/tooolkit/Toolkit'
  
interface Props {
    title:string
    subTitle:string
    type:string
}
function SchemaRoles({title, subTitle, type}:Props) {
 
  
  return (
    <>
    <div className="role_com_container ">
        <div className='role_left'>
            <div className='role_title'>{title}</div>
            <div className='role_subtitle'>{subTitle}</div>
        </div>
        <div className='role_right'>
          {/* <ActionTooltip label={`You don't have permission to update the setting. You can update the setting from individuals ${type} setting.`} side='top' align='center'>
          <button><FaCircleInfo/></button>
          </ActionTooltip> */}
        <HoverCard>
      <HoverCardTrigger asChild>
      <button><FaCircleInfo/></button>
  
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side='left' align='center' style={{color:"var(--color2)", fontSize:"0.9rem"}}>
        <div className="flex justify-between space-x-4" >
        You don't have permission to update the setting. You can update the setting from individuals {type} setting.
        </div>
      </HoverCardContent>
    </HoverCard>
            
        </div>
    </div>
    
    </>
  )
}

export default SchemaRoles;
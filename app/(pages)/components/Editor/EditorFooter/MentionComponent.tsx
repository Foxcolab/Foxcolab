"use client";
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AtSign } from 'lucide-react'
import { Group } from '@prisma/client'
import { useRouter } from 'next/navigation';
import { AiOutlineEnter } from 'react-icons/ai';
import { RiArrowUpDownLine } from 'react-icons/ri';


interface MentionProps {
  open:boolean
  setOpen:any
  groups:Group[],
  value:any
  form:any,
  onSelectHandler:any
}


function Mention({open, setOpen, groups, onSelectHandler}:MentionProps) {
  const [name, setName] = useState('');
  const router = useRouter();

 
  

  return (
    <>
    
    <DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenuTrigger className='h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center'><AtSign size={20} /></DropdownMenuTrigger>
  <DropdownMenuContent className='mention_Drodown'>
    {
      groups && groups.map((group)=>(
        <DropdownMenuItem key={group.id}  className='mention_drp_item' onClick={()=>onSelectHandler(group.handle)}> 
          {group.name}
        </DropdownMenuItem>
      ))
    }
    
    <div className='dropdown_footer_title'>
        <div className='to_navigate'><RiArrowUpDownLine/> to navigate</div>
        <div><AiOutlineEnter/> to select</div>
        <div><span>ESC</span> dismiss</div>
    </div>
 
  </DropdownMenuContent>
</DropdownMenu>
    
    
    
    </>
  )
}

export default Mention
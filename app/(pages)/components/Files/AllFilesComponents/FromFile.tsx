import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { IoIosArrowDown } from 'react-icons/io'
import { Member } from '@prisma/client'

interface Props {
    serverMembers:Member[]
    from:string,
    setFrom:any
}

function FromFile({serverMembers, from, setFrom}:Props) {
  return (
    <>
    
     <Select onValueChange={(e)=>setFrom(e)} defaultValue={from} >
      <SelectTrigger className="file_select_btn ">
      <SelectValue placeholder="From" />
      </SelectTrigger>
      <SelectContent className='w-[180px] file_drop_container'>
        <SelectGroup>
        <SelectItem value={"All"}>All Members</SelectItem>

          {serverMembers && serverMembers.map((member:Member)=>(
            <SelectItem value={member.id} key={member.id}>{member.user.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    
    
    </>
  )
}

export default FromFile
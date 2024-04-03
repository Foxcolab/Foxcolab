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
import { Channel } from '@prisma/client'

interface Props {
    serverChannels:Channel[]
    fromIn:string
    setFromIn:any
    onFiltering:any
}

function ChannelIn({serverChannels, fromIn, setFromIn, onFiltering}:Props) {
  return (
    <>
    
    <Select onValueChange={e=>onFiltering(e, "in")} defaultValue={fromIn}>
      <SelectTrigger className="file_select_btn ">
      <SelectValue placeholder="In" />
      </SelectTrigger>
      <SelectContent className='w-[180px]'>
        <SelectGroup>
          <SelectItem value='All'>All Channels</SelectItem>
          {serverChannels && serverChannels.map((channel:Channel)=>(
            <SelectItem value={channel.id} key={channel.id}>{channel.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    
    </>
  )
}

export default ChannelIn
"use client";


import React from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { Channel, Member } from '@prisma/client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import { FaLock } from 'react-icons/fa';
import { set } from 'date-fns';




interface Props {
    // Open:boolean,
    // SetOpen:Function,
    setSelectedChannel:any
    selectedChannel:String[]
    allChannels:Channel[]
    title:string[]
    setTitle:any
    allServerMember:Member[]
    selectedMember:Member[]
    setSelectedMember:any
    memberNames:string[]
    setMemberNames:any
}


function ForwardedCommand({ selectedChannel,setSelectedChannel, allChannels,title, setTitle, allServerMember, selectedMember, setSelectedMember, memberNames, setMemberNames }:Props) {
    console.log(allServerMember)
     const onSelect =(e:any, name:string)=>{
        const {value, checked} = e.target;
        if(checked){
            selectedChannel.push(value);
            title.push(name);
        }else {
            setSelectedChannel(selectedChannel.filter((id:string)=> id !== value ))
            setTitle(title.filter((id:string)=> id !== name ));
            console.log(title)
        }
     }
     const onMemberSelect =(e:any, name:string)=>{
        const {value, checked} = e.target;
        // console.log(value, checked);
        
        
        if(checked){
            selectedMember.push(value);
            memberNames.push(name);
        }else {
            setSelectedMember(selectedMember.filter((id:string)=> id !== value ))
            setMemberNames(memberNames.filter((id:string)=> id !== name))
        }
     }

     const selectedChannelSet = new Set(selectedChannel);
     const selectedMemberSet = new Set(selectedMember);

  return (
    <>



    
<Command className="" style={{zIndex:"100 !important"}} >
      <CommandInput placeholder="Type a member or channel name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Channels & Members">
          
        {
            allChannels && allChannels.map((channel)=>(
                <CommandItem className='commditem' key={channel.id}>
               
                <span className='comnd_item'>
                    
                    <input type='checkbox' id='mmb_checkbox' value={channel.id} onClick={(e)=>onSelect(e, channel.name)} defaultChecked={selectedChannelSet.has(channel.id.toString())}  />
                    
                    <div className='flex items-center gap-2'>
                       {channel.type=="public"? "#" : <FaLock/>} {channel.name}
                    </div>
                     </span>
              </CommandItem>
            ))
        }

        {
            allServerMember && allServerMember.map((member)=>(
                <CommandItem className='commditem' key={member.id}>
               
                <>
                
                {console.log(member.user)}
                <span className='comnd_item'>
                <input type='checkbox' id='mmb_checkbox' value={member.id} onClick={(e)=>onMemberSelect(e, member.user.name)} defaultChecked={selectedMemberSet.has(member.id.toString())} />
                {member.user===(undefined || null)?
                <>
                <LetterAvatar name={"A"} size={30} radius={5}  />  {member.userId}
                </>
                :
                <>
                {
                member.user.profilePic===null ? 
                <> 
                <LetterAvatar name={member.user.name[0]} size={30} radius={5} /> {member.user.name}
                </> : 
                <>
                    <UserAvatar src={member.user.profilePic}  /> {member.user.name}
                </>
          

          }
                    
                    </>
                    
                    
                    
                    
                    
                    }  </span>
                </>
              </CommandItem>
            ))
        }


    </CommandGroup>
    </CommandList>
    </Command>
    
    </>
  )
}

export default ForwardedCommand;
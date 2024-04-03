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
import { Member } from '@prisma/client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import LetterAvatar from '../UserAvatar/LetterAvatar';
import { UserAvatar } from '../UserAvatar/UserAvatar';



interface Props {
    // Open:boolean,
    // SetOpen:Function,
    members:[Member],
    setSelectedMembers:Function
    selectedMembers:[]
    // backHandler:Function
    // nextHandler:Function
}


function SelectMember({ members, setSelectedMembers, selectedMembers}:Props) {
    
    
    //  const [value, setValue] = React.useState("");

     const onSelect =(e:any)=>{
        const {value, checked} = e.target;
        // console.log(value, checked);
        
        
        if(checked){
            selectedMembers.push(value);
        }else {
            setSelectedMembers(selectedMembers.filter((id:string)=> id !== value ))
        }
        // console.log(selectedMembers);
        
        // setSelectedMembers()
     }

  return (
    <>



    
<Command className="" >
      <CommandInput placeholder="Type a member name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Members">
          
        {
            members && members.map((member)=>(
                <CommandItem className='commditem' key={member.id}>
               
                <span className='comnd_item'>
                    
                    <input type='checkbox' id='mmb_checkbox' value={member.id} onClick={(e)=>onSelect(e)} />
                    
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
            </>
             : 
            <>
            <UserAvatar src={member.user.profilePic}  /> {member.user.name}
            </>
          

          }
                    
                    </>
                    
                    
                    
                    
                    
                    }  </span>
              </CommandItem>
            ))
        }


    </CommandGroup>
    </CommandList>
    </Command>
    
    </>
  )
}

export default SelectMember
"use client";


import React, { useEffect, useState } from 'react'
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
    allMembers:[Member],
    setSelectedMembers:Function
    selectedMembers:[]
    selected:Boolean,
    setSelected:Function
    // backHandler:Function
    // nextHandler:Function
}


function AddMember({ members, selected, setSelected, allMembers}:Props) {
    const [all, setAll] = useState([]);
    console.log(members);
    console.log(allMembers);
    

    function subtractArraysOfObjects(arr1, arr2) {
        const idsInArr2 = new Set(arr2.map(obj => obj.id));
      
        const result = arr1.filter(obj => !idsInArr2.has(obj.id));
      
        return result;
      }
      const resultArray = subtractArraysOfObjects(allMembers, members);
      
   
    
    //   console.log(all);
      

     const onSelect =(e:any)=>{
        const {value, checked} = e.target;
        
        
        if(checked){
            selected.push(value);
        }else {
            setSelected(selected.filter((id:string)=> id !== value ))
        }
     }

  return (
    <>



    
<Command className="" >
      <CommandInput placeholder="Type a member name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Members">
          
        {
            resultArray && resultArray.map((member)=>(
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

export default AddMember;
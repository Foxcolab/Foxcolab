import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddMember from '@/app/(pages)/components/Channel/AddMember';
import { Member } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Loader from '@/app/(pages)/components/Loaders/Loader';
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
import LetterAvatar from '@/app/(pages)/components/UserAvatar/LetterAvatar';
import { UserAvatar } from '@/app/(pages)/components/UserAvatar/UserAvatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { RiUserSharedFill } from 'react-icons/ri';
interface Props {
    serverMembers:Member[]
    serverId:string
    
}

function TransferOwnerShip({ serverMembers, serverId}:Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState('');

    const router = useRouter();

    const SubmitHandler =async()=>{
        try {
            setLoading(true);
            console.log("LOADING", loading);
            console.log(selectedMembers);
            const res = axios.put(`/api/server/update/owner?serverId=${serverId}`, {memberId:selectedMembers});
            setLoading(false);
            router.refresh();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }


  return (
    <>
    
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className='bg-gray-700 py-[0.45rem] px-3 rounded mt-4 text-sm flex items-center gap-1' ><RiUserSharedFill/> Transfer  Ownership</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
       


      <Command className="" >
      <CommandInput placeholder="Type a member name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Members">
          
        {
            serverMembers && serverMembers.map((member:Member)=>(
                <CommandItem className='commditem' key={member.id}>
               
                <span className='comnd_item'>
                    
                    <input type='radio' id='mmb_checkbox' value={member.id}  onChange={e=>setSelectedMembers(e.target.value)} />
                    
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
      





        <DialogFooter>
          
          {
            loading ? <Loader/> : 
            <>
            <Button type="submit" variant={"outline"} onClick={()=>setOpen(false)}>cancel</Button>
            <Button type="submit" onClick={SubmitHandler}>Make Owner</Button>
            </>
            
          }


          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
  )
}

export default TransferOwnerShip
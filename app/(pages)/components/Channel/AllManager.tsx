import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { IoPersonAdd } from 'react-icons/io5'
import {Command,CommandEmpty, CommandGroup, CommandItem, CommandInput, CommandList } from '@/components/ui/command'
import LetterAvatar from '../UserAvatar/LetterAvatar'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { CiCircleRemove } from 'react-icons/ci'
import {  Member } from '@prisma/client'
import { FaLock } from 'react-icons/fa'
import AddMember from './AddMember'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Loader from '../Loaders/Loader'
import { ActionTooltip } from '../tooolkit/Toolkit'

interface ManagerProps {
    isAdmin:boolean
    managers:Member[],
    name:string
    type:string,
    channelMember: Member[]
    managerId:string
    schemaType:string
}

function AllManager({isAdmin, managers, name, type,channelMember, managerId, schemaType }:ManagerProps) {
    const [nextDialog, setNextDialog] = useState(false);
    const [selectedManager, setSelectedManager] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const router = useRouter();
    const params = useParams();
    

    const ManagerHandler =()=>{
        setNextDialog(true);
    }
    const DeleteHandler =async()=>{
        try {
            setConfirmation(true);
            setLoading(true);
            {
              schemaType==="Forums" && 
              axios.put(`/api/forums/manager/removed?serverId=${params?.id}&forumChannelId=${params?.forumId}&managerId=${managerId}`, {managerIds:selectedManager}).then(res=>{
                setLoading(false);
                setConfirmation(false);
                router.refresh();
              })
            }
            {
              schemaType==="Canvas" && 
              axios.put(`/api/canvas/manager/removed?serverId=${params?.id}&canvasId=${params?.canvasId}&managerId=${managerId}`, {managerIds:selectedManager}).then(res=>{
                setLoading(false);
                setConfirmation(false);
                router.refresh();
              })
            }
            {
              schemaType==="Channel" && 
              axios.put(`/api/channel/manager/remove?serverId=${params?.id}&channelId=${params?.channelId}&managerId=${managerId}`, {managerIds:removeId}).then(res=>{
                setLoading(false);
            setConfirmation(false);
                router.refresh();
              })
            }

        } catch (error) {
            setLoading(false);
            setConfirmation(false);
            console.log(error)
        }
    }

    const SubmitHandler =async()=>{
        try {
            setLoading(true);
            {
              schemaType==="Forums" && 
              axios.put(`/api/forums/manager/add?serverId=${params?.id}&forumChannelId=${params?.forumId}&managerId=${managerId}`, {managerIds:selectedManager}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Canvas" && 
              axios.put(`/api/canvas/manager/add?serverId=${params?.id}&canvasId=${params?.canvasId}&managerId=${managerId}`, {managerIds:selectedManager}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Channel" && 
              axios.post(`/api/channel/manager/add?serverId=${params?.id}&channelId=${params?.channelId}&managerId=${managerId}`, {managerIds:selectedManager}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const RemoveHandler =(e:string)=>{
        setConfirmation(true);
        setRemoveId(e);
      }

  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
      <button className='text-blue-700 font-semibold hover:decoration-solid'>Edit</button>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]  channel_member" >
<div>



        <div className='mangr_header'>
            People who can managed  <span className='font-semibold'>{type==="public"? "#":<> <FaLock/> </> }{name}</span>
        </div>


      <div className="add_member">
              <button onClick={ManagerHandler}><IoPersonAdd/> Add Manager</button>

            </div>
             <div className="all_member_profile">

             <Command className="rounded-lg border shadow-md overflow-scroll">
      <CommandInput placeholder="Type a name to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="All Managers">
        {
             managers &&   managers.map((member, i)=>(
                  <CommandItem className='w-full' style={{background:"transparent"}} key={i}>
                  <div className="single_member_p" key={i}>
                    <div className='single_profile'>
                    <div>
                    {
            member?.user?.profilePic===null ? 
            <LetterAvatar 
            name={member?.user?.name===undefined ? 'Y': member?.user?.name}
           size={40}
           radius={50}
            /> : 
          <UserAvatar src={member?.user?.profilePic} />

          }
                    </div>
                    <div>
                      {member?.user?.name}
                    </div>
                    </div>
                    {
                      isAdmin &&  
                      <ActionTooltip label='Remove from manager' align='center' side='top'>
                        <button className='remove_member' onClick={()=>RemoveHandler(member?.id)}>
                      <CiCircleRemove/>
                      
                    </button>
                      </ActionTooltip>
                      
                    }
                   
                  </div>
                  </CommandItem>
                ))
              }
          
 
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
             </div>
    
      </DialogContent>
    </Dialog>


       <Dialog open={nextDialog} onOpenChange={setNextDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
       


          <AddMember members={managers} selectedMembers={selectedManager} setSelectedMembers={setSelectedManager} serverMembers={channelMember}  />

      





        <DialogFooter>
          <Button type="submit" variant={"outline"} onClick={()=>setNextDialog(false)}>cancel</Button>
          {
            loading ? <Loader/> : 
            <Button type="submit" onClick={SubmitHandler}>Add Manager</Button>
          }


          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    

    <Dialog open={confirmation} onOpenChange={setConfirmation}>
  <DialogContent className="sm:max-w-[625px]">
    <div className='p-4'>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure to remove this member from manager list?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      {/* <DialogCancel >Cancel</DialogCancel> */}
      <Button variant={"outline"} onClick={()=>setConfirmation(false)}>Cancel</Button>
      {
        loading ? <Loader/> :
        <Button onClick={DeleteHandler}>Remove</Button>

      }
    </DialogFooter>
    </div>

  </DialogContent>
</Dialog>
    
    
    </>
  )
}

export default AllManager
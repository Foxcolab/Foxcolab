"use client";
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
import { FaLock } from 'react-icons/fa'
import { ChannelManager, Member, Message } from '@prisma/client'

import { useParams, useRouter } from 'next/navigation'
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import { UserAvatar } from '../../UserAvatar/UserAvatar';

import { CiCircleRemove } from 'react-icons/ci';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"
import axios from 'axios';
import { IoPersonAdd } from 'react-icons/io5';
import Loader from '../../Loaders/Loader';
import AddMember from '../../Channel/AddMember';
import ChannelSetting from '../../Channel/ChannelSetting';
import AboutChannel from '../../Channel/AboutChannel';
interface Props {
    name:string,
    members: Member[]
    serverMembers: Member[]
    type:string
    description:string
    createdBy:string
    createdAt:string
    isAdmin:boolean
    startingState:string
    content:any
    managers:ChannelManager
    sendMsg:boolean
    schemaType:string
}
function SchemaDialog({name, members, serverMembers, type, description, createdAt, createdBy, isAdmin, content, managers, startingState, sendMsg, schemaType }:Props) {
  
  const [state, setState] = useState(startingState);
    const [loading, setLoading] = useState(false);
    const [confirmatin, setConfirmation] = useState(false);
    const [memberId, setMemberId] = useState('')
    const [nextDialog, setNextDialog] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [nameLoading, setNameLoading] = useState(false);
    const [descriptionLoading, setdescriptionLoading] = useState(false);
    const [newName, setName] = useState(name);
    const [newDescription, setDescription] = useState(description);
  
    const router = useRouter();
    const params = useParams();
    const ChangeState =(e:string)=>{
      setState(e);
      router.refresh();
  
    }
  
  
    const RemoveMember=async()=>{
      try {
        setLoading(true);
        setConfirmation(true);
        {
          schemaType==="Forums" && 
           axios.put(`/api/forums/member/remove?serverId=${params?.id}&forumChannelId=${params?.forumId}&memberId=${memberId}`).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Test Channel" && 
           axios.put(`/api/test/testChannel/member/remove?serverId=${params?.id}&testChannelId=${params?.testChannelId}&memberId=${memberId}`).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Channel" && 
          axios.put(`/api/channel/remove?serverId=${params?.id}&channelId=${params?.channelId}&memberId=${memberId}`).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Canvas" &&
          axios.put(`/api/canvas/member/remove?serverId=${params?.id}&canvasId=${params?.canvasId}&memberId=${memberId}`).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
          setLoading(false);
          // router.refresh();
        
        setConfirmation(false);
      } catch (error) {
        setConfirmation(false);
        setLoading(false);
        console.log(error);
        
      }
    }
  
    const DeleteHandler =(e:string)=>{
      setConfirmation(true);
      setMemberId(e);
    }
  
    const SubmitHandler =async()=>{
      try {
        setLoading(true);
        {
          schemaType==="Forums" && 
           axios.put(`/api/forums/member/add?serverId=${params?.id}&forumChannelId=${params?.forumId}`, {members:selectedMembers}).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Canvas" && 
           axios.put(`/api/canavs/member/add?serverId=${params?.id}&canvasId=${params?.canvasId}`, {members:selectedMembers}).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Test Channel" && 
           axios.put(`/api/test/testChannel/member/add?serverId=${params?.id}&testChannelId=${params?.testChannelId}`, {members:selectedMembers}).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
        {
          schemaType==="Channel" && 
          axios.put(`/api/channel/add?serverId=${params?.id}&channelId=${params?.channelId}`, {members:selectedMembers}).then(res=>{
            setLoading(false);
            router.refresh();
          })
        }
  
      } catch (error) {
        setLoading(false);
        
      }
    }
    const AddMemberHandler=()=>{
      setNextDialog(true);
    }
  
  
  
  const changeNameHandler =async()=>{
    try {
      setNameLoading(true);
      {
        schemaType==="Forums" && 
        axios.put(`/api/forums/setting/name?serverId=${params?.id}&forumChannelId=${params?.forumId}`, {name:newName}).then(res=>{
          setNameLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Canvas" && 
        axios.put(`/api/canvas/setting/name?serverId=${params?.id}&canvasId=${params?.canvasId}`, {name:newName}).then(res=>{
          setNameLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Test Channel" && 
        axios.put(`/api/test/testChannel/setting/name?serverId=${params?.id}&canvasId=${params?.canvasId}`, {name:newName}).then(res=>{
          setNameLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Channel" && 
        axios.put(`/api/channel/setting/name?serverId=${params?.id}&channelId=${params?.channelId}`, {name:newName}).then(res=>{
          setNameLoading(false);
          router.refresh();
        })
      }
    //   const res = await axios.put(`/api/channel/setting/name?serverId=${params?.id}&channelId=${params?.channelId}`, {name:newName});
      
  
    } catch (error) {
      setNameLoading(false);
      console.log(error);
      
    }
  }
  const DescriptionHandler =async()=>{
    try {
      setdescriptionLoading(true);
      {
        schemaType==="Forums" && 
        axios.put(`/api/forums/setting/description?serverId=${params?.id}&forumChannelId=${params?.forumId}`, {description:newDescription}).then(res=>{
          setdescriptionLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Canvas" && 
        axios.put(`/api/canvas/setting/description?serverId=${params?.id}&canvasId=${params?.canvasId}`, {description:newDescription}).then(res=>{
          setdescriptionLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Test Channel" && 
        axios.put(`/api/test/testChannel/setting/description?serverId=${params?.id}&testChannelId=${params?.testChannelId}`, {description:newDescription}).then(res=>{
          setdescriptionLoading(false);
          router.refresh();
        })
      }
      {
        schemaType==="Channel" && 
        await axios.put(`/api/channel/setting/description?serverId=${params?.id}&channelId=${params?.channelId}`, {description:newDescription}).then(res=>{
          setdescriptionLoading(false);
          router.refresh();
        })
      }
    //   const res = await axios.put(`/api/channel/setting/description?serverId=${params?.id}&channelId=${params?.channelId}`, {description:newDescription});
      router.refresh();
      setdescriptionLoading(false);
    } catch (error) {
      setdescriptionLoading(false);
      console.log(error);
      
    }
  }

  return (
    <>
        <Dialog>
      <DialogTrigger asChild>
      {content}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]  channel_member" >
        <div>
          <div className="cmem_header">
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-slate-800'>{type==="public"? "#":<FaLock/>} {name}</DialogTitle>
          {
            description!=='' && <DialogDescription>
            {description}
          </DialogDescription>
          }
          
        </DialogHeader>
        <div className='all_mem_container'>
        <button className={state==="About"?"active_option":""}  onClick={()=>ChangeState( "About")}>About</button>
        <button className={state==="Members"?"active_option":""} onClick={()=>ChangeState("Members")}>Members {members.length}</button>
        <button className={state==="Setting"?"active_option":""} onClick={()=>ChangeState("Setting")}>Setting</button>
        </div>
       
        </div>
        <hr />

          <div>
            {
              state==="About" ?
              
              
              <>

            <AboutChannel
            
            isAdmin={isAdmin}
            nameLoading={nameLoading}
            descriptionLoading={descriptionLoading}
            changeNameHandler={changeNameHandler}
            DescriptionHandler={DescriptionHandler}
            setDescription={setDescription}
            setName={setName}
            name={name}
            type={type}
            description={description}
            createdBy={createdBy}
            createdAt={createdAt}
            managers={managers}
            channelMember={members}
            schemaType={schemaType}
             />
              
              </>
             
              : state==="Members" ?
              <>
            <div className="add_member">
              <button onClick={AddMemberHandler}><IoPersonAdd/> Add Member</button>
            </div>
             <div className="all_member_profile">

             <Command className="rounded-lg border shadow-md overflow-scroll">
      <CommandInput placeholder="Type a name to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="All members">
        {
                members.map((member, i)=>(
                  <CommandItem className='w-full' style={{background:"transparent"}}>
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
                      isAdmin &&  <button className='remove_member' onClick={()=>DeleteHandler(member.id)}>
                      <CiCircleRemove/>
                      
                    </button>
                    }
                   
                  </div>
                  </CommandItem>
                ))
              }
          
 
        </CommandGroup>
      </CommandList>
    </Command>

             </div>
              
              </>

              : state==="Setting" ? 
              
              
              
              
              <ChannelSetting name={name} description={description} isAdmin={isAdmin} type={type} sendMsg={sendMsg} ChangeNameHandler={changeNameHandler} ChangeDescriptionHandler={DescriptionHandler} setName={setName} setDescription={setDescription} nameLoading={nameLoading} desciptionLoading={descriptionLoading} schemaType={schemaType} />
              
              
              :
            ''
              
            }
          </div>

          {/* <AlertDialog open={confirmatin} onOpenChange={setConfirmation}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure to remove this member?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel >Cancel</AlertDialogCancel>
      {
        loading ? <Loader/> :
        <AlertDialogAction onClick={RemoveMember}>Remove</AlertDialogAction>

      }
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog> */}


<Dialog open={confirmatin} onOpenChange={setConfirmation}>
  <DialogContent className="sm:max-w-[625px]">
    <div className='p-4'>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure to remove this member?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      {/* <DialogCancel >Cancel</DialogCancel> */}
      <Button variant={"outline"} onClick={()=>setConfirmation(false)}>Cancel</Button>
      {
        loading ? <Loader/> :
        <Button onClick={RemoveMember}>Remove</Button>

      }
    </DialogFooter>
    </div>

  </DialogContent>
</Dialog>







        </div>
      </DialogContent>
    </Dialog>


    <Dialog open={nextDialog} onOpenChange={setNextDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
       


          <AddMember members={members} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} serverMembers={serverMembers}  />

      





        <DialogFooter>
          <Button type="submit" variant={"outline"} onClick={()=>setNextDialog(false)}>cancel</Button>
          {
            loading ? <Loader/> : 
            <Button type="submit" onClick={SubmitHandler}>Add Member</Button>
          }


          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    </>
  )
}

export default SchemaDialog
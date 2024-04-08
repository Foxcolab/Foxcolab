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
import { Channel, ChannelManager, Member, Message } from '@prisma/client'

import { useParams, useRouter } from 'next/navigation'
import LetterAvatar from '../UserAvatar/LetterAvatar';
import { UserAvatar } from '../UserAvatar/UserAvatar';
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
import Loader from '../Loaders/Loader';
import AddMember from './AddMember';
import ChannelSetting from './ChannelSetting';
import EditDailog from './EditDialog';
import ChannelFiles from './ChannelFiles';
import AboutChannel from './AboutChannel';
import SchemaRoleContainer from '../Schema/Roles/SchemaRoleContainer';
interface HeaderProps {
    name:string,
    members: Member[]
    serverMembers: Member[]
    type:string
    description:string
    createdBy:string
    createdAt:string
    isAdmin:boolean
    sendMsg:boolean
    messages:Message[]
    startingState:string
    content:any
    managers:ChannelManager
    channel:Channel
}
function AllMembers({members, name, type, description, createdBy, createdAt, isAdmin, serverMembers, sendMsg, messages, startingState, content, managers, channel}:HeaderProps) {
  
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
      const res = await axios.put(`/api/channel/remove?serverId=${params?.id}&channelId=${params?.channelId}&memberId=${memberId}`);
      if(res.status===200){
        setLoading(false);
        router.refresh();
      }
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
      
      const res =await axios.put(`/api/channel/add?serverId=${params?.id}&channelId=${params?.channelId}`, {members:selectedMembers});
      if( res.status==200){
        router.refresh();
      }
      setLoading(false);

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
    const res = await axios.put(`/api/channel/setting/name?serverId=${params?.id}&channelId=${params?.channelId}`, {name:newName});
    router.refresh();
    setNameLoading(false);

  } catch (error) {
    setNameLoading(false);
    console.log(error);
    
  }
}
  
const DescriptionHandler =async()=>{
  try {
    setdescriptionLoading(true);
    const res = await axios.put(`/api/channel/setting/description?serverId=${params?.id}&channelId=${params?.channelId}`, {description:newDescription});
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
        <button className={state==="Permissions"?"active_option":""} onClick={()=>setState("Permissions")}>Permissions</button>
        <button className={state==="Files"?"active_option":""} onClick={()=>setState("Files")}>Files</button>
        
        
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
            schemaType="Channel"
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
              
              
              
              
              <ChannelSetting name={name} description={description} isAdmin={isAdmin} type={type} sendMsg={sendMsg} ChangeNameHandler={changeNameHandler} ChangeDescriptionHandler={DescriptionHandler} setName={setName} setDescription={setDescription} nameLoading={nameLoading} desciptionLoading={descriptionLoading} schemaType='Channel' />
              
              
              :
              state==="Permissions" ? <SchemaRoleContainer schemaType={"Channel"}
              whoCanCreateForms={channel.whoCanCreateForms}
              whoCanCreatePolls={channel.whoCanCreatePolls}
              whoCanDeleteMessage={channel.whoCanDeleteMessage}
              whoCanMakePublicToPrivate={channel.whoCanMakePublicToPrivate}
              whoCanManageManager={channel.whoCanManageManager}
              whoCanManageMember={channel.whoCanManageMember}
              whoCanReadMessage={channel.whoCanReadMessage}
              whoCanSendMessage={channel.whoCanSendMessage}
              whoCanUpdateChannel={channel.whoCanUpdateChannel}
              whoCanUploadMedia={channel.whoCanUploadMedia}
              type={channel.type}
              
              
              /> :
              
            <ChannelFiles messages={messages}  />
              
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

export default AllMembers
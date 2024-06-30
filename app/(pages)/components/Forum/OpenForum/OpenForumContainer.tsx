import { Forums, Member } from '@prisma/client'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import ForumMessageContainer from './ForumMessageContainer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import Loader from '../../Loaders/Loader'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import ForumEditor from '../../Editor/Forum/ForumEditor'
import ForumMessages from './ForumMessages'


interface Props {
    setForum:any
    forum:Forums
    managerIds:string[]
    whoCanComment:boolean
    whoCanDelete:boolean
    whoCanUploadMediaInComment:boolean
    member:Member
}

function OpenForumContainer({setForum, forum, managerIds, whoCanComment, whoCanDelete, whoCanUploadMediaInComment, member}:Props) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(forum.title);
  const router = useRouter();
  const params = useParams();

  const EditForumHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/forums/post?serverId=${params?.id}&forumChannelId=${params?.forumId}&forumId=${forum.id}`, {title});
      if(res.status===200){
        console.log(res.data);
        setForum(res.data.forum);
      }
      setLoading(false);
      setEditDialog(false);
      router.refresh();
      // setForum()
    } catch (error) {
      setLoading(false);
    }
  }

  const DeleteForumHandler=async()=>{
    try {
      setLoading(true);
    const res =await axios.delete(`/api/forums/post?serverId=${params?.id}&forumChannelId=${params?.forumId}&forumId=${forum.id}`);
    router.refresh();
    setLoading(false);
    setEditDialog(false);
    setForum(null);

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>

  {/* <div className='relative top-[1.6305rem]'>
  <div className="forum_msg_container">
  <div className="chat_section">
        <div className="channel_title">
            {forum.title}
        </div>
        <div className="channel_memb_pin">
        <div className="content2_cross flex items-center gap-3">


        <DropdownMenu>
  <DropdownMenuTrigger><button><BsThreeDots/></button></DropdownMenuTrigger>
  <DropdownMenuContent className='server_drpdwn w-20' style={{width:"5rem", marginRight:"1rem"}}>
    <DropdownMenuItem className='cursor-pointer font-semibold flex items-center gap-1' onClick={()=>setEditDialog(true)}><MdEdit/> Edit title</DropdownMenuItem>
    <DropdownMenuItem className='leave_item font-semibold' onClick={()=>setDeleteDialog(true)}>
      <button className='flex items-center gap-1' ><RiDeleteBin7Fill/> Delete</button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            
      <button onClick={()=>setForum(null)}> <RxCross1/></button>
    </div>
        </div>
    </div>
    <ForumMessageContainer forum={forum} managerIds={managerIds} whoCanComment={whoCanComment} whoCanDelete={whoCanDelete} whoCanUploadMediaInComment={whoCanUploadMediaInComment} member={member}  />


    </div>

  </div> */}


<div className="relative top-[1.6305rem]">
<div className="forum_msg_container ">
  <div className="chat_section">
        <div className="channel_title">
            {forum.title}
        </div>
        <div className="channel_memb_pin">
        <div className="content2_cross flex items-center gap-3">


        <DropdownMenu>
  <DropdownMenuTrigger><button><BsThreeDots/></button></DropdownMenuTrigger>
  <DropdownMenuContent className='server_drpdwn w-20' style={{width:"5rem", marginRight:"1rem"}}>
    <DropdownMenuItem className='cursor-pointer font-semibold flex items-center gap-1' onClick={()=>setEditDialog(true)}><MdEdit/> Edit title</DropdownMenuItem>
    <DropdownMenuItem className='leave_item font-semibold' onClick={()=>setDeleteDialog(true)}>
      <button className='flex items-center gap-1' ><RiDeleteBin7Fill/> Delete</button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            
      <button onClick={()=>setForum(null)}> <RxCross1/></button>
    </div>
        </div>
    </div>

    <div className="forum_messages">

      <ForumMessages
    member={member}
    chatId={forum.id}
    apiUrl='/api/messages/threads/forum'
    socketUrl='/api/socket/threads/forum'
    socketQuery={{
      forumId:forum.id
    }}
    paramKey='forumId'
    paramValue={forum.id}
    forum={forum}
    ManagerIds={managerIds}
    
    
    />
  </div>

    <div className="forum_editor">
    <ForumEditor
     placeholder={`Send a message in ${forum.title}`}
     apiUrl="/api/socket/forum-response"
     query={{
      forumId:forum.id,
      forumsChannelId:forum.forumsChannelId,
     serverId: forum?.serverId,
     sectionId:forum?.sectionId
      }} 
      whoCanUploadMediaInComment={whoCanUploadMediaInComment} 
      whoCanComment={whoCanComment}
     
     />
    </div>




    {/* <ForumMessageContainer forum={forum} managerIds={managerIds} whoCanComment={whoCanComment} whoCanDelete={whoCanDelete} whoCanUploadMediaInComment={whoCanUploadMediaInComment} member={member}  /> */}


    </div>
    </div>

















    <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
  <DialogTrigger></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      
      
    </DialogHeader>
        <div className="font-semibold font-xl">
        Are you absolutely sure to delete "{forum.title}" ?
        </div>
        <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    <DialogFooter>
          {
            loading ? <Loader/> : <>
            <Button variant={"outline"} onClick={()=>setDeleteDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-red-500 hover:bg-red-600 text-white' onClick={DeleteForumHandler}>Delete</Button>
          </>
          }
    </DialogFooter>

    </DialogContent>
  </Dialog>

  <Dialog open={editDialog} onOpenChange={setEditDialog}>
  <DialogTrigger></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Forum</DialogTitle>

     
    </DialogHeader>
    <hr />
    <div className="py-4">
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="name" className="text-left text-lg">
               Title
            </Label>
            <Textarea id="name" defaultValue={title} onChange={(e)=>setTitle(e.target.value)} className="col-span-3 resize-none" />
          </div>
          </div>
    <DialogFooter>
          {
            loading ? <Loader/> : <>
            <Button variant={"outline"} onClick={()=>setEditDialog(false)}>Cancel</Button>
          <Button type="submit" onClick={EditForumHandler}>Save Changes</Button>
            
            </>
          }
    </DialogFooter>
    </DialogContent>
  </Dialog>



    </>
  )
}

export default OpenForumContainer
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios';
import { MdEditSquare } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import Loader from '../../../Loaders/Loader';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface Props {
    noteId:string
    commentId:string
    showOptions:boolean
    setShowOptions:any
    content:string
    canDelete:boolean
    canEdit:boolean
}

function SingleThreeDot({noteId, commentId, showOptions, setShowOptions,content, canEdit, canDelete }:Props) {
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const router = useRouter();
    const params = useParams();
    const DeleteHandler =async()=>{
        try {
            setLoading(true);
            setConfirm(true);
            const res = await axios.delete(`/api/canvas/note/comment/delete?serverId=${params?.id}&canvasId=${params?.canvasId}&noteId=${noteId}&commentId=${commentId}`);
            router.refresh();
            setLoading(false);
            setConfirm(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const EditHandler =async()=>{
        try {
            setLoading(true);
            await axios.put(`/api/canvas/note/comment/update?serverId=${params?.id}&canvasId=${params?.canvasId}&noteId=${noteId}&commentId=${commentId}`, {content:editedContent});
            router.refresh();
            setLoading(false);
            setEditDialog(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

  return (
    <>
        <DropdownMenu open={showOptions} onOpenChange={setShowOptions}>
      <DropdownMenuTrigger asChild>
        {
          (canEdit || canDelete) &&  <button><BsThreeDotsVertical/></button>
        }
     
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">

        <DropdownMenuGroup>
          {
            canEdit && < DropdownMenuItem className='flex items-center gap-2' onClick={()=>setEditDialog(true)}>
            <MdEditSquare/>  Edit
          </DropdownMenuItem>
          }
          
          {
            canDelete && <DropdownMenuItem className='flex items-center gap-2' onClick={()=>setConfirm(true)}>
            <AiFillDelete/> Delete
           </DropdownMenuItem>
          }
        </DropdownMenuGroup>
 



    </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={confirm} onOpenChange={setConfirm}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Message</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Are you absulately sure to delete this comment?</DialogTitle>
          <DialogDescription className='pt-6 pb-4'>
            This action can't be undone. This will permanently delete the comment from the note.
          </DialogDescription>
          
        </DialogHeader>
  
        <DialogFooter>
            {
                loading ? <Loader/> :
                <> 
               <Button variant={'outline'} onClick={()=>setConfirm(false)}>Cancel</Button>
          <Button type="submit" className='bg-red-500 text-white hover:bg-red-600' onClick={DeleteHandler}>Delete</Button>  </>
            }
         
        </DialogFooter> 
      </DialogContent>
    </Dialog>



    <Dialog open={editDialog} onOpenChange={setEditDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Message</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          
        </DialogHeader>
        <div className='edit_comment'>
            <textarea rows={5} onChange={(e)=>setEditedContent(e.target.value)} defaultValue={editedContent}/>
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> :
            <> 
            <Button variant={'outline'} onClick={()=>setEditDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-green-500 text-white hover:bg-green-600' onClick={EditHandler} disabled={content===editedContent}>Save</Button>
            </>
          }
        </DialogFooter> 
      </DialogContent>
    </Dialog>
    </>
  )
}

export default SingleThreeDot

"use client";
import {   Note } from '@prisma/client'
import { format } from 'date-fns';
import React, { useState } from 'react'

import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import UpdateNoteContent from './Note/UpdateNoteContent';
import { PiNotebookDuotone, PiNotepad } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Loader from '../Loaders/Loader';

interface Props {
    note:Note
    isAdmin:boolean,
    whoCanDeleteNote:boolean
    memberId:string
    managerIds:string[]
    memberIds:string[]

}

const DATE_FORMAT = "d MMM yyyy, HH:mm";


function SingleCanvas({note, isAdmin, whoCanDeleteNote, memberId, memberIds, managerIds}:Props) {
    
    const [loading, setLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [noteName, setNoteName] = useState('');
    const router = useRouter();
    const DeleteHandler =async()=>{
        try {
            setLoading(true);
            const res = await axios.delete(`/api/canvas/note/delete?serverId=${note.serverId}&canvasId=${note.canvasId}&noteId=${note.id}`);
            if(res.status===200){
                setLoading(false);
            }
            setLoading(false);
            router.refresh();

        } catch (error) {
            setLoading(false);
            console.log(error);
            
        }
    }
    const creator = note.createdBy===memberId;

    const isManager = managerIds.includes(memberId);
    const isMember = memberIds.includes(memberId);
  

  const canEdit = note.canEveryoneUpdate===true || creator;
  const canComment = note.commenting===true || creator;
  




  return (
    <>
 

      <div className='single_canvas border rounded-md p-3 shadow-md cursor-pointer hover:shadow-lg'>
        <div className='pb-2'>
          <div className='font-semibold text-[1.25rem] flex items-center gap-1 pb-2'><span><PiNotebookDuotone/></span>{note.title}</div>
          <div className='tst_dpt pt-1'>
           Created By: <span className='text-green-500'>{note.createdUser.user.name} </span>
        </div>
        <div className='tst_dpt pt-1'>Created At: <span className='text-gray-500 dark:text-gray-200'>{format(new Date(note.createdAt), DATE_FORMAT)}</span> </div>
        <div className='tst_dpt pt-1'>Total Comment: <span className='text-gray-500 dark:text-gray-200'>{note?.comments.length || 0 }</span> </div>
        <div className='tst_dpt pt-1'>Commenting: <span className='text-gray-500 dark:text-gray-200'>{note.commenting===true ?
        <span className='text-green-500'>On</span> : <span className=''> Off </span>}</span> </div>
        <div className='tst_dpt pt-1' >Edit Note: <span className='text-gray-500 dark:text-gray-200'>{note.canEveryoneUpdate===true ? <span className='text-green-500'>On</span> : <span className=''> Off </span> } </span> </div>
        </div>
        <hr className='pb-2' />
        <div className='flex justify-between '>
         
          <button className='px-3 py-[0.3rem] border rounded hover:text-white hover:bg-blue-500' onClick={()=>setEditNote(true)}>View</button>
          {
            creator &&  
          <button className='px-3 py-[0.3rem] border border-red-500 text-red-500 hover:text-white hover:bg-red-500 rounded' onClick={()=>{setNoteName(note.title);setDeleteDialog(true)}}>Delete</button>
          }
        </div>
      </div>



      {
        editNote && <UpdateNoteContent noteDialog={editNote} setNoteDialog={setEditNote} note={note} canComment={canComment} canEdit={canEdit} memberId={memberId}  />
      }
    
  

    <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Deleteing "{noteName}"</DialogTitle>
          
        </DialogHeader>
        <div className='py-4'>
        <div className='text-lg'>Are you absolutely sure to delete "{noteName}"? </div>
        <div className='text-lg'>This action cannot be undone.</div>
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> : 
            <>
            <Button className='border bg-tansparent text-black dark:text-white hover:bg-transparent' onClick={()=>setDeleteDialog(false)}>Cancel</Button>
            <Button className='bg-red-500 hover:bg-red-600 text-white'  onClick={DeleteHandler}>Delete</Button>
  
            </>
          }
        
        </DialogFooter>
      </DialogContent>
    </Dialog>

    
    </>
  )
}

export default SingleCanvas

"use client";
import {  Member, Note } from '@prisma/client'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import { FaComment, FaInfoCircle } from "react-icons/fa";
import { ActionTooltip } from '../tooolkit/Toolkit';
import Update from './Update';
import axios from 'axios';
import { SiSimplenote } from "react-icons/si";
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
  import { Button } from "@/components/ui/button"
  import { CiCalendarDate } from "react-icons/ci";
import CreateNoteContent from './Note/CreateNoteContent';
import { useRouter } from 'next/navigation';
import UpdateNoteContent from './Note/UpdateNoteContent';

interface Props {
    note:Note
    isAdmin:boolean,
    whoCanDeleteNote:boolean
    memberId:string
    managerIds:string[] | []
    memberIds:string[]

}

const DATE_FORMAT = "d MMM yyyy, HH:mm";


function SingleCanvas({note, isAdmin, whoCanDeleteNote, memberId, memberIds, managerIds}:Props) {
    
    const [loading, setLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editNote, setEditNote] = useState(false);
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

    // let DeletePermission =false;
    const isManager = managerIds.includes(memberId);
    const isMember = memberIds.includes(memberId);
  //   if(((isAdmin || isManager || isMember) && canvas?.whoCanDeleteNote==="member") || ((isManager || isAdmin) && canvas?.whoCanDeleteNote==="manager") || (isAdmin && canvas?.whoCanDeleteNote==="admin") ){
  //       DeletePermission = true;
  // } 

  const canEdit = note.canEveryoneUpdate===true || creator;
  const canComment = note.commenting===true || creator;




  return (
    <>
    
  


            
    <button className='w-full text-left'>
    <div className="single_forums w-full flex justify-between">
      <div className='forums_description w-full'>
      <div className='forums_title'>{note.title}</div>
        <div> <span className="forum_createdBy flex items-center"><MdAdminPanelSettings/> {note?.createdUser?.user?.name}</span>
        {/* <span className='text-zinc-400'>{note?.comments?.length}</span> */}
          </div>
       <div className='forum_Desc'>
        <span className='flex item-center gap-1'><FaComment/>:  {note?.comments?.length}</span>
        <span>{format(new Date(note.createdAt), DATE_FORMAT)}</span>
        </div>
      </div>
      <div className='w-1/12 canvas_operation'>
        {
       
       (whoCanDeleteNote || creator) &&  <button onClick={()=>setDeleteDialog(true)}><MdDelete/></button>

        }
        
        <button onClick={()=>setEditNote(true)}>{canEdit ? <IoIosCreate/> : <FaComment/>}</button>
      </div>
      </div>
    </button>

      {
        editNote && <UpdateNoteContent noteDialog={editNote} setNoteDialog={setEditNote} note={note} canComment={canComment} canEdit={canEdit} memberId={memberId}  />
      }
    
    <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 hover:bg-red-600 text-white'  onClick={DeleteHandler}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
    </>
  )
}

export default SingleCanvas
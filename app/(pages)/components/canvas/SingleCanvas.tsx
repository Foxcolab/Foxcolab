
"use client";
import {  Note } from '@prisma/client'
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

interface Props {
    note:Note,
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";


function SingleCanvas({note}:Props) {
    
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
  return (
    <>
    
        {/* <div className='sing_notec'>
            <div className='note_left'>
            <div className='note_icon'><FaNoteSticky/> </div>
            <div className='note_title'>
                <div className='note_tt'>{note.title}</div>
                <div className='note_dt'>{format(new Date(note.createdAt), DATE_FORMAT)}</div>
            </div>
            </div>
            <div className='note_operations'>
                <ActionTooltip label='Edit note' side='top' align='center'>
                <Update note={note}  />
                </ActionTooltip>
                
                
                    
                <AlertDialog>
      <AlertDialogTrigger asChild>
      <button ><MdDelete/></button>
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
          <AlertDialogAction style={{backgroundColor:"red"}} onClick={DeleteHandler}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

                    
                   


                <AlertDialog>
      <AlertDialogTrigger asChild>
      <button><FaInfoCircle/></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{note.title}</AlertDialogTitle>
          <AlertDialogDescription>
          <p className='note_created'><CiCalendarDate/> Created At: {format(new Date(note.createdAt), DATE_FORMAT)}</p>
          <p>Last Updated {format(new Date(note.updatedAt), DATE_FORMAT)}</p>
            <p> Created By: {note.createdUser.user.name}</p>
       

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction >Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>





            </div>
            
        </div> */}
        {/* <hr className='note_hr' /> */}


            
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
        <button onClick={()=>setDeleteDialog(true)}><MdDelete/></button>
        <button onClick={()=>setEditNote(true)}><IoIosCreate/></button>
      </div>
      </div>
    </button>


    <CreateNoteContent noteDialog={editNote} setNoteDialog={setEditNote} note={note}/>
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
          <AlertDialogAction style={{backgroundColor:"red"}} onClick={DeleteHandler}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
    </>
  )
}

export default SingleCanvas
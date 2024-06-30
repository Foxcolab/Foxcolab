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
import { Separator } from '@/components/ui/separator'
import { Note } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import NoteComment from './Comments/NoteComment'
import NoteEditor from '../../Editor/Canvas/NoteEditor'
import { set } from 'date-fns'
import { JsonValue } from '@prisma/client/runtime/library'

interface Props {
    setNoteDialog:any,
    noteDialog:boolean
    note:Note
}
function CreateNoteContent({noteDialog, setNoteDialog, note}:Props) {

  const [content, setContent] = useState<JsonValue[]>([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const onSubmitHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/canvas/note/create?serverId=${params?.id}&canvasId=${params?.canvasId}&noteId=${note.id}`, {content});
      router.refresh();
      setContent(content);
      // setNoteDialog(false);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const isChanges = content!==note?.content;


  return (
    <>
     <Dialog open={noteDialog} onOpenChange={setNoteDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className=" create_note_container">
        <div className="note_container">

        <div className='note_left_container'>
        <div className="create_note_header">
            <div className='note_title'>{note?.title}</div>
            <div className='note_head_ope'>
              {
                loading ?
                 <button disabled className='flex items-center'>
                 <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                 Saving..
               </button> 
                  : 
                <button className={isChanges ? "save": ""} onClick={onSubmitHandler}>Save</button>

                }
            </div>
        </div>
        <Separator orientation='horizontal' />

        <div className="canvas_Editor py-4 pl-2">
            
            <NoteEditor editable onChange={(e)=>setContent(e)} />



        </div>


        </div>
        <Separator orientation='vertical' />
          
          <NoteComment note={note} canComment  memberId={note.createdBy}/>
       
        </div>
      </DialogContent>
    </Dialog>
    



    
    
    </>
  )
}

export default CreateNoteContent
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
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CanvasEditor from '../../Editor/CanvasEditor'
import CommentEditor from '../../Editor/Comment/CommentEditor'
import { Note } from '@prisma/client'
import TinyMce from '../../Editor/TinyMce'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Loader from '../../Loaders/Loader'
import { ReloadIcon } from '@radix-ui/react-icons'
import NoteTinyMce from '../../Editor/Canvas/Note/NoteTinyMce'
import NoteTinyMce2 from '../../Editor/Canvas/Note/NoteTinyMce2'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import NoteComment from './Comments/NoteComment'

interface Props {
    setNoteDialog:any,
    noteDialog:boolean
    note:Note
    canEdit:boolean
    canComment:boolean
    memberId:string
}
function UpdateNoteContent({noteDialog, setNoteDialog, note, canComment, canEdit, memberId}:Props) {

  const [content, setContent] = useState<null | string>(note?.content);
  
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
                    canEdit && 
              <>
              
              <button className='flex items-center gap-1'><input type='checkbox' defaultChecked={checked} onChange={()=>setChecked(!checked)} /> Edit</button>
              {
                loading ?
                 <button disabled className='flex items-center'>
                 <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                 Saving..
               </button> 
                  : 
                <button className={isChanges ? "save": ""} onClick={onSubmitHandler}>Save</button>

                }
              
              </>

                }

                
             
            </div>
        </div>
        <Separator orientation='horizontal' />

        <div className="canvas_Editor">
            {
              checked && canEdit ? 
              <NoteTinyMce2 defaultValue={content as string} setTitle={setContent} />
              : 
            <NoteTinyMce defaultValue={content as string} setTitle={setContent} />

            }

        </div>


        </div>
        <Separator orientation='vertical' />
          
          <NoteComment note={note} canComment={canComment} memberId={memberId} />
       
        </div>
      </DialogContent>
    </Dialog>
    
    

    
    
    </>
  )
}

export default UpdateNoteContent
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
import { Guide, Note } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

import NoteEditor from '../../../Editor/Canvas/NoteEditor'
import { JsonValue } from '@prisma/client/runtime/library'
import { MdTitle } from 'react-icons/md'
import EditorEmoji from '../../../Emoji/EditorEmoji'
import Loader from '../../../Loaders/Loader'

interface Props {
    open:boolean
    setOpen:any
    guide:Guide
    setSingleDialog:any
}
function UpdateGuide({open, setOpen, guide, setSingleDialog }:Props) {

  const [content, setContent] = useState<JsonValue[]>(guide.content);
  const [title, setTitle] = useState(guide.title);
  const [loading, setLoading] = useState(false);
  const [emojiDialog, setEmojiDialog] = useState(false);
  const params = useParams();
  const router = useRouter();

  const onSubmitHandler =async()=>{
    try {
      setLoading(true);
      console.log()
      const res = await axios.put(`/api/server/guide/update?serverId=${params?.id}&guideId=${guide.id}`, {title, content});
      router.refresh();
      setOpen(false);
      setSingleDialog(false);
      // setNoteDialog(false);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  


  return (
    <>
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className=" create_note_container " id='guide_cross' style={{maxWidth:"810px", height:"650px"}}>
        <div>

        
        <div className="note_container border overflow-hidden rounded-lg">

        <div className='note_left_container ' style={{width:"100%"}}>
        <div className="create_note_header" style={{padding:"0"}}>
            {/* <div className='note_title'>{note?.title}</div> */}
            <div className='guide_title_inp flex items-center '> 
            <span className="text-[1.5rem]"><MdTitle/></span> 
            <input type='text' className='' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Enter the guide title ..." />
            <EditorEmoji onChange={(emoji)=>{setTitle(`${title} ${emoji}`); setEmojiDialog(false)}} emojiDialog={emojiDialog} setEmojiDialog={setEmojiDialog} />
            </div>
            
        </div>
        <Separator orientation='horizontal' />

        <div className="canvas_Editor py-4 pl-2" style={{height:"530px"}}>
            
            <NoteEditor editable initialContent={content} onChange={(e)=>setContent(e)} />



        </div>

        <DialogFooter className='px-4 pt-2'>
            {
                loading ? <Loader /> : <>
                <button className='px-4 py-[0.35rem] hover:bg-secondary rounded border text-[0.95rem]' onClick={()=>setOpen(false)}>Cancel</button>
                <button className='px-4 py-[0.35rem] rounded bg-green-500 text-white hover:bg-green-600 text-[0.95rem]' onClick={onSubmitHandler}>Create</button>
                </>
            }
        
    </DialogFooter>


        </div>
    </div>
       
       
        
      
      
       
    </div>
      </DialogContent>
    
    



    </Dialog>
    



    
    
    </>
  )
}


export default UpdateGuide;
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
import { FaHeartCirclePlus } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import CreateNoteContent from './CreateNoteContent'
import { Separator } from '@/components/ui/separator'
import Loader from '../../Loaders/Loader'
import { Note } from '@prisma/client'
import { Switch } from "@/components/ui/switch"
import UpdateNoteContent from './UpdateNoteContent'
interface Props {
  sectionId:string
}
function CreateNote({sectionId}:Props) {
  const [open, setOpen] = useState(false);
  const [noteDialog, setNoteDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [canEveryoneUpdate, setCanEveryoneUpdate] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<null | Note>(null);
  const params = useParams();
  const router = useRouter();
  const SubmitHandler =async()=>{
    try {
      if(title==="") return;
      setLoading(true);
      console.log(title, canEveryoneUpdate, commenting)
      const res = await axios.post(`/api/canvas/note/create?serverId=${params?.id}&canvasId=${params?.canvasId}&sectionId=${sectionId}`, {title, commenting, canEveryoneUpdate});
      if(res.status===200){
        console.log(res);
        setNote(res.data.note);
        setLoading(false);
        setOpen(false);
        setNoteDialog(true);
        router.refresh();
      }
    } catch (error) {
      
    }
  }
  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className='new_forums'><FaHeartCirclePlus/>New Note </button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className='font-bold text-lg '>New Note</DialogTitle>
          <Separator />
        </DialogHeader>

        <div className="py-4">
          <div className=''>
            <label htmlFor="" className='' style={{color:"var(--color2)", fontWeight:"600"}}>Note Title</label>
            <Input id="" placeholder='eg. Project Note' className="col-span-3 mt-2" onChange={e=>setTitle(e.target.value)} />
          </div>
        </div>
        <div className="pb-2">
          <div className='flex items-center justify-between'>
            <label htmlFor="" className='' style={{color:"var(--color2)", fontWeight:"600"}}>Can Everyone Update</label>
            <Switch id="airplane-mode" defaultChecked={false} onCheckedChange={e=>setCanEveryoneUpdate(e)} />
             </div>
        </div>
        <div className="pb-2">
          <div className='flex items-center justify-between'>
            <label htmlFor="" className='' style={{color:"var(--color2)", fontWeight:"600"}}>Can Everyone Comment</label>
            <Switch id="airplane-mode" defaultChecked={true} defaultChecked={false} onCheckedChange={e=>setCommenting(e)} />
            </div>
        </div>
        <hr />
        <DialogFooter>
          {
            loading ? <Loader/> : <>
            <Button  variant={"outline"}  onClick={()=>setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={SubmitHandler}>Create</Button>
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {
      note && 
      <CreateNoteContent noteDialog={noteDialog} setNoteDialog={setNoteDialog} note={note}   />
      // <UpdateNoteContent noteDialog={noteDialog} setNoteDialog={setNoteDialog} note={note} canComment={commenting} canEdit={canEveryoneUpdate} />
    }
   
    
    </>
  )
}

export default CreateNote
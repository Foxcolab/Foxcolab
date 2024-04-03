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

interface Props {
  sectionId:string
}
function CreateNote({sectionId}:Props) {
  const [open, setOpen] = useState(false);
  const [noteDialog, setNoteDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<null | Note>(null);
  const params = useParams();
  const router = useRouter();
  const SubmitHandler =async()=>{
    try {
      if(title==="") return;
      setLoading(true);
      const res = await axios.post(`/api/canvas/note/create?serverId=${params?.id}&canvasId=${params?.canvasId}&sectionId=${sectionId}`, {title});
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
          <DialogTitle className='font-bold text-lg text-gray-700'>New Note</DialogTitle>
          <Separator />
        </DialogHeader>

        <div className="py-4">
          <div className=''>
            <label htmlFor="" className='font-semibold' style={{color:"#45515d"}}>Note Title</label>
            <Input id="" placeholder='eg. Project Note' className="col-span-3 mt-2" onChange={e=>setTitle(e.target.value)} />
          </div>
        </div>

        
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
      <CreateNoteContent noteDialog={noteDialog} setNoteDialog={setNoteDialog} note={note} />
    }
   
    
    </>
  )
}

export default CreateNote
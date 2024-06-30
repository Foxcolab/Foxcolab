import React, { useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Guide } from '@prisma/client'
import { Button } from '@/components/ui/button'
import NoteEditor from '../../../Editor/Canvas/NoteEditor'
import { RiDeleteBin5Line, RiEditFill } from 'react-icons/ri'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import UpdateGuide from './UpdateGuide'

  interface Props {
    guide:Guide
    open:boolean
    setOpen:any
    isAdmin:boolean
    memberId:string
  }
function SingleGuide({guide, open, setOpen, isAdmin, memberId}:Props) {
    const isOwner = memberId === guide.createdBy;
    const hasPermission = isAdmin || isOwner;

    const [loading, setLoading] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const params = useParams();
    const router = useRouter();
    const DeleteHandler =async()=>{
        try {
            setLoading(false);
            const res = await axios.delete(`/api/server/guide/${guide.id}?serverId=${params?.id}`);
            setLoading(true);
            setOpen(false);
            router.refresh();
            
        } catch (error) {
            console.log(error);
        }
      }

      const UpdateHandler =()=>{
        setUpdateDialog(true);
        // setOpen(false);
      }

      
  return (
    <>
    
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent className='dark:bg-[#1f1f1f]' style={{minWidth:"500px", maxWidth:"50%", background:""}}>
        <SheetHeader>
          <SheetTitle className='mt-6 py-2 px-2 rounded border shadow-md' style={{background:"var(--activeTheme)"}}>{guide.title}</SheetTitle>
          
        </SheetHeader>
        <div className='canvas_Editor border mt-4 rounded shadow-md' id='single_guide'>
            <NoteEditor editable={false} initialContent={guide.content} onChange={()=>{return}} />
        </div>

        {
            hasPermission && <div className='mt-5 flex items-center gap-4'>
            <button className='px-4 py-[0.35rem] rounded border text-sm flex items-center gap-2' onClick={UpdateHandler}><RiEditFill/> Update</button>
            <button className='px-4 py-[0.35rem] rounded border text-sm flex items-center gap-2 bg-red-500 text-white hover:bg-red-600' onClick={DeleteHandler}> <RiDeleteBin5Line/> Delete</button>
        </div>
        }
        


        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter> */}


        {
            updateDialog && <UpdateGuide guide={guide} open={updateDialog} setOpen={setUpdateDialog} setSingleDialog={setOpen}  />
        }
      </SheetContent>
    </Sheet>
    
    </>
  )
}

export default SingleGuide
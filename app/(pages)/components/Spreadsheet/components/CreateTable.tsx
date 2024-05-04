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
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Loader from '../../Loaders/Loader'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

interface Props {
    open:boolean
    setOpen:any
    sectionId:string
}

function CreateTable({open, setOpen, sectionId}:Props) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("editable");
    const params = useParams();
    const router = useRouter();
    const SubmitHandler =async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/spreadsheet/table/new?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&sectionId=${sectionId}`, {name, description, type});
            setLoading(false);
            router.refresh();
            setOpen(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
  return (
    <>
    
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a Table</DialogTitle>
       
        </DialogHeader>
        <div>
            <div className='mt-4'>
                <label htmlFor="">Name</label>
                <div className='mt-2'><Input type="text" onChange={(e)=>setName(e.target.value)}/></div>
            </div>
            <div className='mt-4'>
                <label htmlFor="">Description</label>
                <div className='mt-2'><Textarea className='resize-none' onChange={(e)=>setDescription(e.target.value)}/></div>
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <label htmlFor="">Type</label>
                <div className="">
                <Select onValueChange={(e)=>setType(e)}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Editable" />
            </SelectTrigger>
                <SelectContent>
                <SelectGroup>
          <SelectItem value="editable">Editable</SelectItem>
          <SelectItem value="readOnly">Read Only</SelectItem>
        </SelectGroup>
      </SelectContent>
                </Select>


                </div>
            </div>
            <div className='my-2'>
                <DialogDescription>
                    In read only other member cannot write on table. In editable assigned member can write on table
                </DialogDescription>
            </div>
        </div>
        <DialogFooter>
            {
                loading? <Loader/> : <>
                <Button  onClick={()=>setOpen(false)} className='bg-transparent border dark:text-white text-black'>Cancel</Button>
                <Button type="submit" onClick={SubmitHandler}>Create</Button>
                </>
            }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    </>
  )
}

export default CreateTable
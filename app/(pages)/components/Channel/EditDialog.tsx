import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import Loader from '../Loaders/Loader'


interface EditDailogProps {
    title:string,
    type:string,
    setName:any
    submitHandler:any
    description:string
    loading:boolean
    defaultValue:string
    schemaType:string
}
function EditDailog({title, type, setName, submitHandler, description, loading, defaultValue}:EditDailogProps) {

    const nameHandler =async(value:string)=>{
        try {
            if(title=="Channel Name"){
                value =value.replace(/ /g,"-");
                value=value.toLowerCase();
                setName(value);
                document.getElementById('handle').value=value;
                 return;
            }
            setName(value);
        } catch (error) {
            
        }
    }

    console.log("Edit dialog loading", loading);
  return (
   <>
   
   
   <Dialog>
      <DialogTrigger asChild>
      <button className='text-blue-700 font-semibold hover:decoration-solid'>Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
        {
            type==="input" ?

            <Input onChange={(e)=>nameHandler(e.target.value)} id='handle' defaultValue={defaultValue} /> : 
            <Textarea onChange={e=>setName(e.target.value)} defaultValue={defaultValue} />
        }
        </div>
        
        <DialogDescription>
            {description}
        </DialogDescription>
        <DialogFooter>
          {
            loading? <Loader/> : 
          <Button type="submit" onClick={submitHandler}>Save</Button>
        }
        </DialogFooter>
      </DialogContent>
    </Dialog>  
   
   
   
   
   
   
   </>
  )
}

export default EditDailog
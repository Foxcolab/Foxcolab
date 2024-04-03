
"use client";

import React, { useState } from 'react'
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
import { IoIosCreate } from 'react-icons/io'
import CanvasEditor from '../Editor/CanvasEditor'
import Editor from '../Editor/CEditor'
// import Editor from '../Editor/CEditor2'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

function CreateNote({serverId, canvasId, sectionId}:{serverId:String, canvasId:String, sectionId:String, title:String}) {
   const [data, setData] = useState('');
   const [title, setTitle] = useState('');
   const [loading, setLoading] = useState(false);

   const router = useRouter();
  
  const onSubmit = async()=>{
    try {
     
      setLoading(true);
      const res = await axios.post(`/api/canvas/note/?canvasId=${canvasId}&serverId=${serverId}&sectionId=${sectionId}`, { title, content:data.blocks});
      if(res.status===200){
        setLoading(false);
        router.push(`/servers/${serverId}/canvas/${canvasId}`)
      }
      setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
      
    }
  }



  return (
    <>
    
    <Dialog>
      <DialogTrigger asChild>
        <button className='cnvs_cnote'><IoIosCreate/> Create</button>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="canvas_cnt"> 
        {/* <DialogHeader> */}
          <DialogTitle style={{margin:"0 !important"}}>Create a new note</DialogTitle>
          {/* <DialogDescription style={{margin:"0 !important"}}>
            Create a note  and start writing!
          </DialogDescription> */}
        {/* </DialogHeader> */}
        <div style={{overflow:"scroll"}} className='cnvs_cbint'>
        <Editor data={data} title={title} onChange={setData} setTitle={setTitle} readonly={false} holder={`What's on the docket for today?`} />
          {/* <Editor data={data} setData={setData} /> */}
        {/* <CanvasEditor  /> */}

        </div>
        <DialogFooter>
        {
            loading ? <Button disabled className=''>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <Button type="submit" onClick={onSubmit}>Create Note</Button>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    
    
    </>
  )
}

export default CreateNote
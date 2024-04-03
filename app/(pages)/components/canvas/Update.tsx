"use client";

import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Note } from '@prisma/client';

function Update({note}:{note:Note}) {
    const [data, setData] = useState([...note.content]);
   const [title, setTitle] = useState(note.title);
   const [loading, setLoading] = useState(false);
   console.log("NOTE CONTENT",note.content);
   console.log("DATA",data);
   console.log("DATA",data===note.content);
   
   

//    useEffect(()=>{
//     setData(note.content);
//    },[])

   const router = useRouter();


  
  const onSubmit = async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/canvas/note/update?noteId=${note.id}&serverId=${note.serverId}&canvasId=${note.canvasId}`, {title, content:data});
      if(res.status===200){
        setLoading(false);
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
      <button><IoIosCreate/></button>
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
        <Editor data={data} title={title} onChange={setData} setTitle={setTitle} holder={`What's on the docket for today?`}  />
    
        {/* <CanvasEditor  /> */}

        </div>
        <DialogFooter>
        {
            loading ? <Button disabled className=''>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <Button type="submit" onClick={onSubmit}>Save changes</Button>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    
    </>
  )
}

export default Update
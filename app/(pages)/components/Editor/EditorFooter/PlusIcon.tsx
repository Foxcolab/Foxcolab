"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,

  DropdownMenuSeparator,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"
import { RiComputerFill } from "react-icons/ri";
import { BiPoll } from "react-icons/bi";
import { LiaWpforms } from "react-icons/lia";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";


export function PlusIcon({files, setFiles, fileUrl, setFileUrl}) {
   
    // console.log(files);
    // const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    //     console.log("Hiiiii");
        
    //     console.log(e);
        
    //     const file = e.target.files?.[0];
    //     console.log(file);
        
    //     setFiles(file);
    //     console.log(file);
        
    //     if(fileUrl){
    //         URL.revokeObjectURL(fileUrl);
    //     }
    //     if(file){
    //         const url = URL.createObjectURL(file);
    //         setFileUrl(url);
    //         console.log(url);
            
    //     }else {
    //         setFileUrl(undefined)
    //     }
    // }
  console.log("Plus icon s");
  
    const handleChange =()=>{
        console.log("Helo Frei");
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
                    type="button"
                    className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white " />
                    
                  </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" style={{background:"#222f3e", color:"white"}}>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-1  ">
          <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            <RiComputerFill /> Upload from local

<input type="file" id="file" onChange={handleChange} value={files} />
</label>
           
           <Input id="picture" type="file" onChange={handleChange} />
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className="flex items-center gap-1">
           <BiPoll/> Poll
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1">
           <LiaWpforms/> Form
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

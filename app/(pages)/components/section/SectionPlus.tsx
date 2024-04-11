"use client"
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import CreateCanvas from '../Create/CreateCanvas';
import CreateChannel from '../Create/CreateChannel';
import CreateTest from '../Create/CreateTest';
import CreateForums from '../Create/CreateForums';
   

interface Props {
  serverId:string
  sectionId:string
  createChannel:boolean
  createForum:boolean
  createCanvas:boolean
  createTestChannel:boolean
}

function SectionPlus({sectionId, serverId, createCanvas, createChannel, createForum, createTestChannel}:Props) {

 
  return (
   <>
   

    {/* <CreateCanvas/> */} 

  <DropdownMenu >
      <DropdownMenuTrigger asChild className='menu_trigger'>
      <button className='plus_section'><AiOutlinePlusCircle/></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dro_contnt">
        <DropdownMenuGroup>
          {
            createChannel && <DropdownMenuItem className='drpdn_ip' asChild>
            <CreateChannel sectionId={sectionId} serverId={serverId}  />
            </DropdownMenuItem>
          }
          {
            createCanvas && <DropdownMenuItem className='drpdn_ip' asChild>
            <CreateCanvas sectionId={sectionId} serverId={serverId} /> 
            </DropdownMenuItem>
          }
          {
            createForum && <DropdownMenuItem className='drpdn_ip' asChild>
            <CreateForums sectionId={sectionId} serverId={serverId} /> 
            </DropdownMenuItem>
          }
          {
            createTestChannel && <DropdownMenuItem className='drpdn_ip' asChild>
            <CreateTest sectionId={sectionId} serverId={serverId} /> 
            </DropdownMenuItem>
          }
          

          

          

          
        </DropdownMenuGroup>
     
      </DropdownMenuContent>
    </DropdownMenu>


     {/* <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      <button><FaPlusCircle/> Create Channel</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>
          Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
        <div className="create_ss">
            <label htmlFor="">Section</label>
            <Select onValueChange={e=>setSectionId(e)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select--" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {
                sections && sections.map((i)=>(
                  <SelectItem value={i.id} key={i.id}>{i.name}</SelectItem>
                //  <option value={i.id}>{i.name}</option> 
                ))
              }
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="username" placeholder='#Subscription Plans' className="col-span-3" onChange={e=>setName(e.target.value)} />
          </div>

          <div className='create_tt'>
            <label htmlFor="">Channel Type</label>
            <div className='radiobtns'>
          <input type="radio" value="public" name="channel_type" onChange={e=>setType(e.target.value)} /> Public &nbsp; &nbsp; &nbsp;
          <input type="radio" value="private" name="channel_type" onChange={(e=>setType(e.target.value))} /> Private
            </div>
          </div>
        </div>

        <DialogFooter>
        {
            loading ? <Loader /> :<Button type="submit" onClick={SubmitHandler}>Create</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog> */}
   
   </>
  )
}

export default SectionPlus
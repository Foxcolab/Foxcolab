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
import { Textarea } from '@/components/ui/textarea';
import { Member } from '@prisma/client';
import axios from 'axios';
import Loader from '../Loaders/Loader';
import SelectMember from './SelectMember';

interface Props {
    serverId: String,
    members:Member[]
}

function CreateGroup({members, serverId}:Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [handle, setHandle] = useState('');
    const [currentDialog, setCurrentDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextDialog, setNextDialog] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);

    
    const NameHandler =(value:string, type:String)=>{
        
        if(type==="name"){
            setName(value);
        }else {
            value =value.replace(/ /g,"-");
            setHandle(value);
            document.getElementById('handle').value=value;
            return;
        }
    }
    const SubmitHandler =async()=>{
        try {
          console.log(selectedMembers);
          
          if(name===""|| handle==="") throw new Error("Please fill out all fields.");
            setLoading(true);
            const res = await axios.post(`/api/group/new?serverId=${serverId}`, {
                name, description, handle, members:selectedMembers
            });
            setLoading(false);

            console.log(res);
            
        } catch (error) {
          setLoading(false);
            
        }
        
    }
    const nextHandler =()=>{
        setCurrentDialog(false);
        setNextDialog(true);
    }
    const backHandler =()=>{
        setNextDialog(false);
        setCurrentDialog(true);
    }

    const onChangeMember =(e:string)=>{
      if(e===''){
        setOpen(false);
        return []
      } 
      const Dropmembers = members.filter((item:any)=> item.user.name.includes(e) );
      if(Dropmembers.length!==0){
      console.log(Dropmembers);
        Dropmembers.map((member:Member)=>setDropDown([...member.user.name , member.user.name]) );
        setOpen(true);
      }
      
    }
  return (
    <>
      <button onClick={()=>setCurrentDialog(true)}>Create Groups</button>
    <Dialog open={currentDialog} onOpenChange={setCurrentDialog}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a group</DialogTitle>
        
        </DialogHeader>
        <div className='tt_ss'>
        
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="group name" placeholder='eg. Marketing Team' className="col-span-3" onChange={e=>NameHandler(e.target.value, "name")} value={name} />
          </div>
          <div className="create_ss">
            <label htmlFor="">Handle</label>
            <Input id="group handle" placeholder='eg. @Marketing-team' className="col-span-3" onChange={e=>NameHandler(e.target.value, "handle")} value={handle} />
          </div>
          <div className="create_ss">
            <label htmlFor="">Purpose</label>
            <Textarea id="group" placeholder='Write the purpose of this groups' className="col-span-3" onChange={e=>setDescription(e.target.value)}  />
          </div>
        </div>
        <DialogFooter>
        <Button type="submit" onClick={nextHandler}>Next</Button>
        
          {/* {
            loading ? <Loader /> :
          } */}


        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* <SelectMember Open={nextDialog} SetOpen={setNextDialog} members={members} backHandler={backHandler} nextHandler={nextHandler} /> */}
      




    
    <Dialog open={nextDialog} onOpenChange={setNextDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
       


          <SelectMember members={members} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />

      





        <DialogFooter>
          <Button type="submit" variant={"outline"} onClick={backHandler}>Back</Button>
          {
            loading ? <Loader/> : 
            <Button type="submit" onClick={SubmitHandler}>Create Group</Button>
          }


          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
















    {/* <Dialog open={nextDialog} onOpenChange={setNextDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
        <DialogTitle>Add Members</DialogTitle>
        </DialogHeader>
        <div className='tt_ss'>
        
          
          <div className="create_ss">
            <Textarea id="group" placeholder='Write the purpose of this groups' className="col-span-3" onChange={e=>onChangeMember(e.target.value)}  />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={"outline"} onClick={backHandler}>Back</Button>
          <Button type="submit" onClick={SubmitHandler}>Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}



    </>
  )
}

export default CreateGroup
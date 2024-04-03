"use client";

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

import { Group, Member } from '@prisma/client';
import AddMember from "./AddMember";
import { useState } from "react";
import Loader from "../Loaders/Loader";
import LetterAvatar from "../UserAvatar/LetterAvatar";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";


const DATE_FORMAT = "d MMM yyyy";

  interface Props {
    onOpen:boolean,
    serverId:String,
    setOpen: Function,
    members:Member[],
    group: Group,
    allMembers:Member[]
  }

function GroupDetails({ members, group, allMembers, serverId}:Props) {
    const [currentDialog, setCurrentDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextDialog, setNextDialog] = useState(false);
    const [selected, setSelected] = useState([]);

    const router = useRouter();
  
    const SubmitHandler =async()=>{
        try {
            console.log(selected);
            setLoading(true);
            const res = await axios.put(`/api/group/add?groupId=${group.id}&serverId=${serverId}`, {members:selected});
            if(res.status===200){
                setLoading(false);
            }
            router.refresh();
            setLoading(false);
        } catch (error) {
            console.log(error);
            
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

    const RemoveHandler =async(memberId:string)=>{
      try {
        const res = await axios.put(`/api/group/remove?groupId=${group.id}&serverId=${group.serverId}`, {memberId});
        router.refresh();
      } catch (error) {
        console.log(error);
        
      }
    }

    const ShowHideBtn =(memberId:string)=>{
      const btn = document.getElementById(`removedBtn${memberId}`);
      if(!btn) return;
      if(btn.style.display==="none"){
        btn.style.display = "inline";
      }else {
        btn.style.display = "none";

      }
    }
    // const hideDeleteButton=(memberId:string)=>{

    // }
    
  return (
    <>
   
    <Dialog open={currentDialog} onOpenChange={setCurrentDialog} >
      <DialogTrigger asChild className="">
        <div className="single_note">
        <div className="single_group" >
      <div className='group_upper'>
        <div className='grp_name'>{group.name}</div>
        <div className='grp_handle'>@{group.handle}</div>
      </div>
      <div className='group_lower' >
        <div className='grp_l'>{group.memberIds.length} members</div>
        <div className='grp_des'>{group.description}</div>
      </div>
    </div>
        </div>
      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] groupDetailsDialog">
        
        <div className="group_dialog">
            <div className="grp_header">
              <div className="gp_name">@{group.handle}</div>
              <div>Created By: {group.createdUser.name}</div>
              <div>Created At: {format(new Date(group.createdAt), DATE_FORMAT)}</div>
            </div>
           
            <hr className="my-2" />

            <div className="allmmbr">
            <p>All Member ({group.memberIds.length})</p>

            {group.members && group.members.map((member:Member)=>
            <div className="gp_membr" key={member.id} onMouseEnter={()=>ShowHideBtn(member.id)} onMouseLeave={()=>ShowHideBtn(member.id)}>
                    {member.user.profilePic===null ? 
                   <div className="flex justify-between items-center">                  
                <div className="d-flex gap-1"> 
                <LetterAvatar name={member.user.name[0]} size={30} radius={5} /> {member.user.name}
                </div>
                <div>
                  <button onClick={()=>RemoveHandler(member.id)} id={`removedBtn${member.id}`} style={{display:"none"}}><AiFillDelete/></button>
                </div>
                </div>
                 : 
                <div className="d-flex gap-1">
                <UserAvatar src={member.user.profilePic}  /> {member.user.name}
                </div>}
            </div>
           
            )}
            </div>
            <DialogFooter>
          <Button type="submit" onClick={nextHandler} className="grp_footer">Add Member</Button>
        </DialogFooter> 
        </div>
      </DialogContent>
    </Dialog>
    

    <Dialog open={nextDialog} onOpenChange={setNextDialog}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
       


          <AddMember members={members} allMembers={allMembers}  selected={selected}  setSelected={setSelected} />

      





        <DialogFooter>
          <Button type="submit" variant={"outline"} onClick={backHandler}>Back</Button>
          {
            loading ? <Loader/> : 
            <Button type="submit" onClick={SubmitHandler}>Add</Button>
          }


          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default GroupDetails
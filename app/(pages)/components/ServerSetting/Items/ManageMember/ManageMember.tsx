import React, { useEffect, useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { Member, User } from '@prisma/client'
import LetterAvatar from '../../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../../UserAvatar/UserAvatar'
import Avatar from 'react-avatar';
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { useRouter } from 'next/navigation'

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
import Loader from '../../../Loaders/Loader'


interface Props {
    setOpen: any
    members:Member[]
    serverId:string
    ownerId:string
    hasPermission:boolean
  }
  const DATE_FORMAT = "d MMM yyyy";
  function ManageMember({setOpen, members, serverId, ownerId, hasPermission}:Props) {
  console.log(members[0].role)
  const [loading, setLoading] = useState(false);
  const [removeDialog, setRemovedDialog] = useState(false);
  const [roleDialog, setRoleDialog] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [drpDn, setDrpDn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  let admins:Member[] = []
  let owner:Member[] = []
  let moderators:Member[] = []
  let users:Member[] = []

    for(let i=0; i<members.length; i++){
      if(members[i].userId===ownerId){
        owner.push(members[i]);
      }
      if(members[i].role==="admin"){
        admins.push(members[i]);
      }else if(members[i].role==="moderator"){
        moderators.push(members[i]);
      }else {
        users.push(members[i]);
      }
    }
    const RemoveMember =async()=>{
      try {
        setLoading(true);
        const res = await axios.put(`/api/server/update/member/remove?serverId=${serverId}`, {memberId })
        setLoading(false);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
    const UpdateRole =async()=>{
      try {
        setLoading(true);
        const res = await axios.put(`/api/server/update/member/role?serverId=${serverId}`, {role:role,memberId })
        setLoading(false);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }

    const RemovedHandler=(memberId:string, memberName:string)=>{
      console.log("Three dot");
      setMemberId(memberId);
      setName(memberName);
      setRemovedDialog(true);
    }
    const RoleHandler=(memberId:string, memberName:string, role:string)=>{
      console.log("Three dot");
      setMemberId(memberId);
      setName(memberName);
      setRole(role);
      setRoleDialog(true);
    }

    console.log(drpDn);
  

  return (
    <>
    
    <ItemHeader setOpen={setOpen} title='Manage Members' />
    <div className="setting_section" style={{borderBottom:"none"}}>       
        <div className="setting_section_title">Owner & Admin </div>
        <div className="setting_section_content">   

            <Table className='server_member_table'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Sl No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined At</TableHead>
          {
            hasPermission && <TableHead>Operation</TableHead>
          }
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {owner &&  owner.map((member:Member, i:number) => (
          <TableRow key={member.id}>
            <TableCell>{i+1}</TableCell>
            <TableCell>
                      <div className="flex items-center justify-center gap-1">
                          {
                            member.user.profilePic===null ? 
                            <LetterAvatar name={member?.user?.name} size={30} radius={50} /> :
                            <UserAvatar src={member?.user?.profilePic} />
                            
                          }
                          {member.user.name}
                          </div>
            </TableCell>
            <TableCell>
            Owner
            </TableCell>
            <TableCell>{format(new Date(member.createdAt), DATE_FORMAT)}</TableCell>
            {
              hasPermission && <TableCell className='member_operations'>
              </TableCell>
            }
            
          </TableRow>
        ))}

      {moderators && moderators.map((member:Member, i:number) => (
          <TableRow key={member.id}>
            <TableCell>{i+1}</TableCell>
            <TableCell>
                      <div className="flex items-center justify-center gap-1">
                          {
                            member.user.profilePic===null ? 
                            <LetterAvatar name={member?.user?.name} size={30} radius={50} /> :
                            <UserAvatar src={member?.user?.profilePic} />
                            
                          }
                          {member.user.name}
                          </div>
            </TableCell>
            <TableCell>
            Administrator
            </TableCell>
            <TableCell>{format(new Date(member.createdAt), DATE_FORMAT)}</TableCell>
            {
              hasPermission && <TableCell className='member_operations'>
              <button className='bg-gray-500 text-white' onClick={()=>RoleHandler(member.id, member.user.name, "user")}>User</button>
              <button className='bg-red-500 text-white' onClick={()=>RemovedHandler(member.id, member.user.name)}>Remove</button>
              </TableCell>
            }
          </TableRow>
        ))}

      {users && users.map((member:Member, i:number) => (
          <TableRow key={member.id}>
            <TableCell>{i+1}</TableCell>
            <TableCell>
                      <div className="flex items-center justify-center gap-1">
                          {
                            member.user.profilePic===null ? 
                            <LetterAvatar name={member?.user?.name} size={30} radius={50} /> :
                            <UserAvatar src={member?.user?.profilePic} />
                            
                          }
                          {member.user.name}
                          </div>
            </TableCell>
            <TableCell>
            Regular Member
            </TableCell>
            <TableCell>{format(new Date(member.createdAt), DATE_FORMAT)}</TableCell>
            {
              hasPermission && <TableCell className='member_operations'>
              <button className='bg-gray-500 text-white' onClick={()=>RoleHandler(member.id, member.user.name, "moderator")}>Moderator</button>
              <button className='bg-red-500 text-white' onClick={()=>RemovedHandler(member.id, member.user.name)}>Remove</button>
              
              </TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
      
    </Table>

             
        </div>
    </div>

  


    <Dialog open={removeDialog} onOpenChange={setRemovedDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Remove Member</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-gray-800">
       
        <div>
          <div className='text-lg font-bold text-gray-300 my-4'>
          Are you absolutely sure to remove <span className='text-gray-200'>{name} ?</span> 
          </div>
        <div className='text-gray-400 font-sm'>
          This action cannot be undone. This action will removed the member from the server.
        </div>
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> : <> 
            <Button variant={"outline"} onClick={()=>setRemovedDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-red-500' onClick={()=>RemoveMember()}>Remove</Button>
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={roleDialog} onOpenChange={setRoleDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Remove Member</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-gray-800">
       
        <div>
          <div className='text-lg font-bold text-gray-300 my-4'>
          Are you absolutely sure to make him <span className='text-gray-200'>{role} ?</span> 
          </div>
      
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> : <> 
            <Button variant={"outline"} onClick={()=>setRoleDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-green-500 hover:bg-green-600' onClick={()=>UpdateRole()}>Save</Button>
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default ManageMember
import React from 'react'
import {Separator} from "../../../../components/ui/separator";
import { RiArrowDropLeftFill, RiArrowDropRightFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidUserCircle } from "react-icons/bi";
import SingleMember from "@/app/(pages)/components/Inbox/SingleMember";
import Invite from '../inviteCode/Invite';
import { Member } from '@prisma/client';


interface Props {
  members:Member[]
  serverId:string
  inviteCode:string
  name:string
  userName:string
}

function Inbox({members,serverId, inviteCode, name, userName}:Props) {

  return (
    <>
    <Separator className='sidebar_separator' />

    {
      members.length!==0 &&
      <div className="dm_container">
    <button className='dm_msg'><RiArrowDropLeftFill/>   Direct Messages  </button>
    <div className="sidecontent direct_message">

        {
            members && members.map((member)=>(
                <SingleMember key={member.id} member={member} serverId={serverId}  />
            ))
        }
    </div>    
    </div>
    }

    

    {/* <Separator/> */}
    <Invite  inviteCode={inviteCode} serverName={name} userName={userName} />
    
    </>
  )
}

export default Inbox
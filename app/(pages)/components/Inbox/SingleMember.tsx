"use client";
import { Member } from '@prisma/client';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import {BiSolidUserCircle} from "react-icons/bi";

interface Props {
  member:Member,
  serverId:string
}
function SingleMember({member, serverId}:Props) {
    const router = useRouter();
    const path = `/servers/${serverId}/inbox/${member?.id}`;
    const onCick =()=>{
        router.push(path);

    }
    const pathname= usePathname();
  return (
    <>

    <button onClick={onCick} key={member.id} className={pathname===path ? "active_user":""}><BiSolidUserCircle/> <span className='overflow_hidden'>{member.user===null? "User" : member.user.name}</span>  </button>
  

    </>
  )
}

export default SingleMember
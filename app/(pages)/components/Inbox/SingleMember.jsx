"use client";
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import {BiSolidUserCircle} from "react-icons/bi";

function SingleMember({member, serverId}) {
    const router = useRouter();
    const path = `/servers/${serverId}/inbox/${member?.id}`;
    const onCick =()=>{
        router.push(path);

    }
    const pathname= usePathname();
  return (
    <>

    <button onClick={onCick} key={member.id} className={pathname===path ? "active_user":""}><BiSolidUserCircle/> {member.user===null? "User" : member.user.name}</button>
  

    </>
  )
}

export default SingleMember
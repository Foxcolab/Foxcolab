'use client';
import { Test } from '@prisma/client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoSettings } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";

interface SidebarProps {
    test:Test,
    params:{
        id:string,
        testId:string,
        testChannelId:string
    }
}

function TestSidebar({test, params}:SidebarProps) {
    const pathname = usePathname();
    console.log("PATHNAME ", pathname);
    
  return (
    <>
    
    <div className="testsidebar ">
        <button className='sidebutton'>{test.activated===true ? "ACTIVATED" : "SET UP IN PROGRESS"}</button>
        <Link href={`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}`} className={pathname===`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}` ? "active_link": ''}><IoSettings/> Basic Setting </Link>
        <Link href={`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/questions/`} className={pathname===`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/questions` ? "active_link": ''}> <MdDashboardCustomize /> Question Manager</Link>
        <Link href={`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/update`} className={pathname===`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/update` ? "active_link": ''}><TbEdit/> Update </Link>
        <Link href={`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/results`} className={pathname===`/servers/${params.id}/test-channel/${params.testChannelId}/${params.testId}/results` ? "active_link": ''}><FaDatabase/> Results </Link>
    </div>
    
    </>
  )
}

export default TestSidebar;
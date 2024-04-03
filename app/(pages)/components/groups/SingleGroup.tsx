"use client";
import { Group, Member } from '@prisma/client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { FaInfoCircle } from 'react-icons/fa'
import { ActionTooltip } from '../tooolkit/Toolkit'
import { format } from 'date-fns'
import { FaNoteSticky } from 'react-icons/fa6'
import GroupDetails from './GroupDetails';


interface GroupProps {
    group:Group,
    allMembers:Member[],
    serverId:String
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function SingleGroup({group, allMembers, serverId}:GroupProps) {
  


  return (
    <>
    

    
    <GroupDetails  members={group.members} group={group} allMembers={allMembers} serverId={serverId} />
    {/* <hr className='note_hr' /> */}
    
    </>
  )
}

export default SingleGroup
"use client";
import { ForumManager, Forums, ForumsChannel, Member } from '@prisma/client'
import React, { useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import ForumContainer from './ForumContainer'
import OpenForumContainer from './OpenForum/OpenForumContainer'


interface Props {
    name:string
    members:Member[]
    serverMembers:Member[]
    description:string
    createdBy:string
    createdAt:string
    type:string
    isAdmin:boolean
    sendMsg:boolean
    managers:ForumManager
    forums:Forums[]
    sectionId:string
}
function ForumsCom({name, members, serverMembers, description, createdBy, createdAt, type, isAdmin, managers, sendMsg,sectionId,forums}:Props) {
    const [listStyle, setListStyle] = useState("list");
    const [forum, setForum] = useState<null | Forums>(null);
  return (
    <>

        {
            forum===null ? <>
            <ForumContainer name={name} members={members} serverMembers={serverMembers} description={description} createdBy={createdBy} createdAt={createdAt} type={type} isAdmin={isAdmin} managers={managers} sendMsg={sendMsg} sectionId={sectionId} forums={forums} setForum={setForum} listStyle={listStyle} />
             </> : 
            <>
     <ResizablePanelGroup direction="horizontal">
  <ResizablePanel>
  <ForumContainer name={name} members={members} serverMembers={serverMembers} description={description} createdBy={createdBy} createdAt={createdAt} type={type} isAdmin={isAdmin} managers={managers} sendMsg={sendMsg} sectionId={sectionId} forums={forums} setForum={setForum} listStyle={listStyle} />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <OpenForumContainer setForum={setForum} forum={forum} managerIds={managers.memberIds} />
  </ResizablePanel>
</ResizablePanelGroup>           
            
             </>
        }
    
    </>
  )
}

export default ForumsCom
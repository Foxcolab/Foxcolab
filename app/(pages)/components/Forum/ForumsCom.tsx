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
    managers:ForumManager | null
    forums:Forums[]
    sectionId:string
    schema:ForumsChannel
    member:Member
}
function ForumsCom({name, members, serverMembers, description, createdBy, createdAt, type, isAdmin, managers, sendMsg,sectionId,forums, schema, member}:Props) {
    const [listStyle, setListStyle] = useState("list");
    const [forum, setForum] = useState<null | Forums>(null);


  let whoCanComment = false;
  let whoCanDelete = false;
  let whoCanUploadMediaInComment = false;
  const isManager = managers.memberIds.includes(member.id);
  const isMember = schema.memberIds.includes(member.id);
  if(((isAdmin || isManager || isMember) && schema?.whoCanUploadMediaInComment==="member") || ((isManager || isAdmin) && schema?.whoCanUploadMediaInComment==="manager") || (isAdmin && schema?.whoCanUploadMediaInComment==="admin") ){
    whoCanUploadMediaInComment = true;
  }  
  if(((isAdmin || isManager || isMember) && schema?.whoCanComment==="member") || ((isManager || isAdmin) && schema?.whoCanComment==="manager") || (isAdmin && schema?.whoCanComment==="admin") ){
    whoCanComment = true;
  }  
  if(((isAdmin || isManager || isMember) && schema?.whoCanDeletePost==="member") || ((isManager || isAdmin) && schema?.whoCanDeletePost==="manager") || (isAdmin && schema?.whoCanDeletePost==="admin") ){
    whoCanDelete = true;
  }  
  // console.log("IS ADMIN",isAdmin, isManager, isMember, member);
  console.log(whoCanComment, whoCanDelete, whoCanUploadMediaInComment)

  return (
    <>

        {
            forum===null ? <>
            <ForumContainer name={name} members={members} serverMembers={serverMembers} description={description} createdBy={createdBy} createdAt={createdAt} type={type} isAdmin={isAdmin} managers={managers} sendMsg={sendMsg} sectionId={sectionId} forums={forums} setForum={setForum} listStyle={listStyle} schema={schema} member={member}  />
             </> : 
            <>
     <ResizablePanelGroup direction="horizontal">
  <ResizablePanel>
  <ForumContainer name={name} members={members} serverMembers={serverMembers} description={description} createdBy={createdBy} createdAt={createdAt} type={type} isAdmin={isAdmin} managers={managers} sendMsg={sendMsg} sectionId={sectionId} forums={forums} setForum={setForum} listStyle={listStyle} schema={schema} member={member} />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <OpenForumContainer setForum={setForum} forum={forum} managerIds={managers.memberIds} whoCanComment={whoCanComment} whoCanDelete={whoCanDelete} whoCanUploadMediaInComment={whoCanUploadMediaInComment} member={member}  />
  </ResizablePanel>
</ResizablePanelGroup>           
            
             </>
        }
    
    </>
  )
}

export default ForumsCom
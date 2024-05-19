"use client";
import { ForumManager, Forums, ForumsChannel, Member } from '@prisma/client'
import React, { useState } from 'react'
import SingleForums from './SingleForums'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import OpenForumContainer from './OpenForum/OpenForumContainer';
import SchemaHeader from '../Schema/Header/SchemaHeader';
import ForumHeader from './ForumHeader';
import { cn } from '@/lib/utils';


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
  setForum:any
  listStyle:string
  schema:ForumsChannel
  member:Member
  isOpen:boolean
}
function ForumContainer({name, members, serverMembers, description, createdBy, createdAt, type, isAdmin, managers, sendMsg,sectionId,forums, setForum, listStyle,schema, member, isOpen}:Props) {
    
  let canCreateForum = false;
  let canDeleteForum = false;
  let uploadMediaInComment = false;
  const isManager = managers.memberIds.includes(member.id);
  const isMember = schema.memberIds.includes(member.id);
  console.log(schema.memberIds);

  if(((isAdmin || isManager || isMember) && schema?.whoCanCreatePost==="member") || ((isManager || isAdmin) && schema?.whoCanCreatePost==="manager") || (isAdmin && schema?.whoCanCreatePost==="admin") ){
    canCreateForum = true;
  } 
  if(((isAdmin || isManager || isMember) && schema?.whoCanDeletePost==="member") || ((isManager || isAdmin) && schema?.whoCanDeletePost==="manager") || (isAdmin && schema?.whoCanDeletePost==="admin") ){
    canDeleteForum = true;
  } 
  if(((isAdmin || isManager || isMember) && schema?.whoCanUploadMediaInComment==="member") || ((isManager || isAdmin) && schema?.whoCanUploadMediaInComment==="manager") || (isAdmin && schema?.whoCanUploadMediaInComment==="admin") ){
    uploadMediaInComment = true;
  } 

  return (
    <>


<div className={cn('forum_msg_container', isOpen ? "forum_open_radius":"")}>

   
<SchemaHeader
name={name}
members={members}
serverMembers={serverMembers}
description={description}
createdBy={createdBy}
createdAt={createdAt}
type={type}
isAdmin={isAdmin}
schemaType="Forums"
managers={managers}
sendMsg={sendMsg}
schema={schema}
member={member}


/>

<div className="canvas_container">
  <ForumHeader sectionId={sectionId} canCreateForum={canCreateForum} />
  <div className='cnvs_sc'>
    {
      forums.length>0 && <div><b>All Forums</b></div>
    }
    
   </div>

  
  {/* <ForumContainer forums={forums} /> */}
  <div>{
            forums.length>0 ? <>
             {
              forums &&  forums.map((forum)=>(
                    <SingleForums forum={forum} key={forum.id} ListStyle={listStyle} setForum={setForum}   />
                ))
            }

            </> :
            <> 
            
            <div className='mt-[10rem] flex items-center justify-center'><h1>No forums found!</h1></div>
            
             </>
        }
        </div>

</div>


</div>
   

       
      
    
    
    </>
  )
}

export default ForumContainer
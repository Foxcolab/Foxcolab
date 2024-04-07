"use client";
import { ForumManager, Forums, Member } from '@prisma/client'
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

}
function ForumContainer({name, members, serverMembers, description, createdBy, createdAt, type, isAdmin, managers, sendMsg,sectionId,forums, setForum, listStyle}:Props) {
    

  return (
    <>


<div className="body_content_container">

   
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



/>

<div className="canvas_container">
  <ForumHeader sectionId={sectionId} />
  <div className='cnvs_sc'>
    <div><b>All Forums</b></div>
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
            <> <h1>No forums found!</h1>
             </>
        }
        </div>

</div>


</div>
   

       
      
    
    
    </>
  )
}

export default ForumContainer
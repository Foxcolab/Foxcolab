"use client";
import { Forums, UploadedFile } from '@prisma/client'
import { format } from 'date-fns';
import React from 'react'
import { TbMessageCircle2Filled } from "react-icons/tb";
const DATE_FORMAT = "d MMM yyyy, HH:mm";

import ForumFile from './ForumFile';


interface Props {
  forum:Forums
  ListStyle:string
  setForum:any
  
}
function SingleForums({forum,ListStyle, setForum}:Props) {


  let count = 0;

  const forumFile:UploadedFile[] = forum.responses[0].uploadedFiles;

 

  return (
    

    <>
    <button onClick={()=>setForum(forum)} className='text-left w-full'>
    <div className="single_forums w-full">
      <div className='forums_description w-full'>
      <div className='forums_title'>{forum.title}</div>
        <div> <span className="forum_createdBy">{forum?.member?.user?.name}:</span>
        <span className='text-zinc-400'>{forum?.responses[0].content}</span>
          </div>
       <div className='forum_Desc'>
        <span><TbMessageCircle2Filled/>{forum?.responses?.length}</span>
        <span>{format(new Date(forum.createdAt), DATE_FORMAT)}</span>
        </div>
      </div>

     


      {
       forumFile && forumFile.map((file)=>(
          <>
          {
            file.type==="image" && count===0 ?
             <div className='forums_content'>
              <span style={{display:"none"}}>{count++}</span>
            <ForumFile fileUrl={forumFile[0].publicUrl} listStyle={ListStyle} type={file.type}  />
            </div>
            : 
            file.type==="video"  && count===0 ?
        
             <div className='forums_content'>
              <span style={{display:"none"}}>{count++}</span>
            <ForumFile fileUrl={forumFile[0].publicUrl} listStyle={ListStyle} type={file.type} />
            </div>
            : ''
          }
          
          </>
        ))
      }

    
     
    </div>
    </button>


    </>




  )
}

export default SingleForums
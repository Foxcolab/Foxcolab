"use client";
import React, { useState } from 'react'
import { Later } from '@prisma/client';
import SinglePost from './SinglePost';
interface PinnedProps {
  mySavedPost: [Later],
  serverId:String,
  userId:String

}
function Pinned({mySavedPost, serverId, userId}:PinnedProps) {
    const [sts, setStatus] = useState('progress');
    const [savedPost, setSavedPost] = useState([]);
    // const []

    const PmsgStatus =(status:string)=>{
        // console.log(status);
        setStatus(status);
       
        if(status==="progress"){
          for(let i=0; i<mySavedPost.length;i++){
            if(mySavedPost[i].status==="progress")
            savedPost.push(mySavedPost[i]);
          }
          document.getElementById('progress')?.classList.add("activePmsg");
          document.getElementById('archived')?.classList.remove("activePmsg");
          document.getElementById('completed')?.classList.remove("activePmsg");
        }else if(status==="archived"){
          for(let i=0; i<mySavedPost.length;i++){
            if(mySavedPost[i].status==="archived")
            savedPost.push(mySavedPost[i]);
          }
          document.getElementById('progress')?.classList.remove("activePmsg");
          document.getElementById('archived')?.classList.add("activePmsg");
          document.getElementById('completed')?.classList.remove("activePmsg");
        }else {
          for(let i=0; i<mySavedPost.length;i++){
            if(mySavedPost[i].status==="completed")
            savedPost.push(mySavedPost[i]);
          }
          document.getElementById('progress')?.classList.remove("activePmsg");
          document.getElementById('archived')?.classList.remove("activePmsg");
          document.getElementById('completed')?.classList.add("activePmsg");
        }
      }
    //   PmsgStatus('progress');
  return (
    <>
            <div className="pmsg_sts">
            <button onClick={()=>PmsgStatus("progress")} id='progress' className='activePmsg'>In Progress</button>
            <button onClick={()=>PmsgStatus("archived")} id='archived'>Archived</button>
            <button onClick={()=>PmsgStatus("completed")} id='completed'>Completed</button>
        </div>

        <div>
            {
              savedPost.map((savedPost)=>(
               <>
               <SinglePost serverId={serverId} userId={userId} PinnedPost={savedPost.message} status={sts} /> : ''
              
               
               </> 
              ))
            }
        </div>







    
    </>
  )
}

export default Pinned
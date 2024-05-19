"use client";
import { Canvas, Member, Note, canvasManager } from '@prisma/client'
import React, { useState } from 'react'
import SingleCanvas from '../SingleCanvas';

interface Props {
    canvas:Canvas & {
        manager:canvasManager | null
    } &  {
        notes: Note[]
    },
    member:Member
    isAdmin:boolean 
}
function CanvasContainer({canvas, isAdmin, member}:Props) {
    const [listStyle, setListStyle] = useState('list');
    
    let DeletePermission =false;
    const isManager = canvas.manager?.memberIds.includes(member.id);
    const isMember = canvas.memberIds.includes(member.id);
    if(((isAdmin || isManager || isMember) && canvas?.whoCanDeleteNote==="member") || ((isManager || isAdmin) && canvas?.whoCanDeleteNote==="manager") || (isAdmin && canvas?.whoCanDeleteNote==="admin") ){
        DeletePermission = true;
  } 

  const notes = canvas?.notes;


  return (
    <>
    
    {
        notes.length===0 ? 
        <> 
        <div className='flex items-center justify-center mt-20'>
        <h1>No notes found!</h1>
        </div>
        
        </> : <> 
            <div className='all_canvases'>
            {
            notes.length!==0 && notes.map((note:Note)=>(
                <>
                <SingleCanvas note={note} isAdmin={isAdmin} whoCanDeleteNote={DeletePermission} memberId={member.id} managerIds={canvas?.manager?.memberIds || []} memberIds={canvas.memberIds} />
                </>
            ))
            }
            </div>
            
        
        </>
    }
    
    
    
    </>
  )
}

export default CanvasContainer;
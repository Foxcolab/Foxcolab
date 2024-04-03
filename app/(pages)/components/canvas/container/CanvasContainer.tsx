"use client";
import { Note } from '@prisma/client'
import React, { useState } from 'react'
import SingleCanvas from '../SingleCanvas';

interface Props {
    notes:Note[]
}
function CanvasContainer({notes}:Props) {
    const [listStyle, setListStyle] = useState('list');
    console.log("Notes", notes);
    console.log("Notes Length:", notes.length);
  return (
    <>
    
    {
        notes.length===0 ? 
        <> 
        <h1>No notes found!</h1>
        </> : <> 
            {
            notes.length!==0 && notes.map((note:Note)=>(
                <>
                <SingleCanvas note={note}   />
                </>
            ))
            }
        
        </>
    }
    
    
    
    </>
  )
}

export default CanvasContainer;
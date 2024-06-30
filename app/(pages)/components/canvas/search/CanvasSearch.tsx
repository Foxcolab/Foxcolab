"use client";
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import CreateNote from '../Note/CreateNote';

interface Props {
  sectionId:string
  whoCanCreateNote:boolean
}
function CanvasSearch({sectionId, whoCanCreateNote}:Props) {
  

  return (
    <>
    
    <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for canvas..' />
        {
          whoCanCreateNote && <CreateNote sectionId={sectionId} />
        }
        
      </div>
 


    </>
  )
}

export default CanvasSearch
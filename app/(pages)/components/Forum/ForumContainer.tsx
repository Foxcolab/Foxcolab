"use client";
import { Forums } from '@prisma/client'
import React, { useState } from 'react'
import SingleForums from './SingleForums'

interface Props {
    forums:Forums[]
}
function ForumContainer({forums}:Props) {
    const [listStyle, setListStyle] = useState("list");
  return (
    <>
        {
            forums.length>0 ? <>

            {
              forums &&  forums.map((forum)=>(
                    <SingleForums forum={forum} key={forum.id} ListStyle={listStyle}  />
                ))
            }

            </> :
            <>
            
            <h1>No forums found!</h1>
             </>
        }
    
    
    </>
  )
}

export default ForumContainer
"use client";
import { Draft, Message } from '@prisma/client'
import React, { useState } from 'react'
import Drafts from './Drafts';
import Sents from './Sents';
import Scheduled from './Scheduled';

interface DraftProps {
    drafts:Draft[]
    sents:Message[]
}

function DraftContainer({drafts, sents}:DraftProps) {
    const [state, setState] = useState("Drafts");

    const PmsgStatus =(status:string)=>{
        setState(status);
      }
  return (
    <>

<div className="pmsg_sts">
            <button onClick={()=>PmsgStatus("Drafts")} id='progress' className={state==="Drafts"? "activePmsg": ""} >Drafts</button>
            <button onClick={()=>PmsgStatus("Scheduled")} id='archived' className={state==="Scheduled"? "activePmsg": ""} >Scheduled</button>
            <button onClick={()=>PmsgStatus("Sent")} id='archived' className={state==="Sent"? "activePmsg": ""} >Sent</button>
        </div>
    
    <div className="section_container">

       {
        state==="Drafts" ? <Drafts  drafts={drafts} /> : state==="Sent"? <Sents Sents={sents}  /> : <Scheduled Scheduled={[]} />
       } 
    {
          drafts.length===0 && 
        <h1 className='nopinn'>No Draft messages yet.</h1>

        }
    </div>
    
    
    </>
  )
}

export default DraftContainer
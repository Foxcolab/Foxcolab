"use client";
import { Member, Message } from '@prisma/client';
import React, { useState } from 'react'
import SingleForms from './SingleForms';
import PendingForms from './PendingForms';

interface Props {
  myForms: Message[]
  submittedForms:Message[]
  pendingForms:Message[]
  currentMember:Member
}

function FormContainer({myForms, submittedForms, pendingForms, currentMember}:Props) {
    const [state, setState] = useState("Created");

  return (
    <>
     <div className="pmsg_sts">
        <button className={state==="Created"? "activePmsg": ""} onClick={()=>setState("Created")}>Created by you</button>
        <button className={state==="Filled"? "activePmsg": ""} onClick={()=>setState("Filled")}>Filled Form</button>
        <button className={state==="Pending"? "activePmsg": ""} onClick={()=>setState("Pending")}>Pending</button>
    </div>

    {
        state==="Created" ?
        <> 
        {
          myForms.length<=0 ? <div className='mt-[10rem] flex items-center justify-center'>
            <h2>You don't have any created form</h2>
          </div> : <> 
          
         <div className="mt-4">
         <div className="mt-4">
        {
          myForms && myForms.map((message)=>(
            <SingleForms Message={message}  key={message.id} type="myForms" currentMember={currentMember} />
          ))
        }
        </div>
          </div>
          </>
        }
        
         </> :
        state==="Filled" ?
        <>
        {
          submittedForms.length<=0 ? <div className='mt-[10rem] flex items-center justify-center'>
            <h2>You don't have any filled form</h2>
          </div> : <> 
          
         <div className="mt-4">
            {
          submittedForms && submittedForms.map((message)=>(
            <SingleForms Message={message}  key={message.id} type="submittedForm" currentMember={currentMember} />
          ))
        }
      
         </div>
         </> 
        }
        
        </>
        
        :
        state==="Pending" ?
        <>  {
          pendingForms.length<=0 ? <div className='mt-[10rem] flex items-center justify-center'>
            <h2>You don't have any pending form to submit</h2>
          </div> : <> 
          
         <div className='mt-4'>
         {
             pendingForms.map((message)=>(
              <PendingForms key={message.id} Message={message} currentMember={currentMember} />
            ))
          }
         </div>
          
          </>
        }  </> :
        <> 
        <div className="mt-4">
        {
          myForms && myForms.map((message)=>(
            <SingleForms Message={message}  key={message.id} type="myForms" />
          ))
        }
        </div>
        
         </>

    }
    
    </>
  )
}

export default FormContainer
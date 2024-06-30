"use client";
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

interface Props {
    title:string
    answer:any
}
function FAQ({title, answer}:Props) {
    const [show, setShow] = useState(false);
  return (
    <>
    
                <div className='border-b pb-4 cursor-pointer' onClick={()=>setShow(!show)}>
                    <div className='flex justify-between py-4' onClick={()=>setShow(!show)}>
                        <div className='text-[1.1rem] font-semibold'>{title}</div>
                        <div className='flex-none text-[2rem]'> {!show ?<MdOutlineKeyboardArrowUp/> : <MdOutlineKeyboardArrowDown/> } </div>
                    </div>
                    {
                      show &&
                      <>
                      <div dangerouslySetInnerHTML={{__html:answer}} />
                      
                      </>
                      
                      
                    }
                    
                    <div>

                    </div>
                </div>
    
    
    
    </>
  )
}

export default FAQ
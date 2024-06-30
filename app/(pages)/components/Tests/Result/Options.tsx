import React, { useState } from 'react'
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from "react-icons/io"
import { MdCheckCircle } from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { VscBlank } from 'react-icons/vsc'

interface Props {
    option:string
    rightAns:string[]
    selectedAns:string[]
}
function Options({option, rightAns, selectedAns}:Props) {
    const isAttempted =selectedAns ?  selectedAns.includes(option) : false;
    const isRight = rightAns.includes(option);

  return (
    <>
     <p 
                    // className={`${rightAns.map((que)=>(option===que ? "d-flex align-center gap-2 text-green-600 font-bold" : "d-flex align-center gap-2" ))}   `}
                    className='flex items-center gap-1'
                    
                    >
                        <span className=' p-1 mb-1'>
                        {
                            (isAttempted && isRight) && <span className='text-green-500  text-[1.5rem]'><IoCheckmarkCircleOutline/></span>
                        }
                        {
                            (isAttempted && !isRight) && <span className='text-red-500  text-[1.4rem]'  ><RxCrossCircled/></span>
                        }
                        {
                            !isAttempted &&  <span className=' text-[1.4rem]'  ><VscBlank/></span> 
                        }
                        </span>
                        




                        <div 
                        // className='flex items-center gap-1'
                        className={isRight && isAttempted ? "bg-[#d8ece4]  flex items-center gap-1 w-full p-1 rounded mb-1" : isAttempted && !isRight ?   "flex items-center gap-1 w-full p-1  rounded mb-1" : !isAttempted && isRight? "flex items-center gap-1 w-full p-1 mb-1 bg-[#d8ece4] dark:text-black rounded": "flex items-center gap-1 w-full p-1 mb-1 " }
                        >
                        <span className='text-[1.5rem] text-[#b3cedd]'>
                        {
                            isAttempted ? <IoMdRadioButtonOn  /> :  <IoMdRadioButtonOff />
                        }
                        </span>
                            <div dangerouslySetInnerHTML={{__html: option}}/>
                        </div>
                    </p>
    
    
    
    </>
  )
}

export default Options
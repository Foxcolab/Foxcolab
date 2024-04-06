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
    console.log("Is Attempted", isAttempted, option, selectedAns)

  return (
    <>
     <p 
                    // className={`${rightAns.map((que)=>(option===que ? "d-flex align-center gap-2 text-green-600 font-bold" : "d-flex align-center gap-2" ))}   `}
                    className='flex items-center gap-1'
                    
                    >
                        <span className=' p-1 mb-1'>
                        {
                            (isAttempted && isRight) && <span className='text-green-500  text-xl'><IoCheckmarkCircleOutline/></span>
                        }
                        {
                            (isAttempted && !isRight) && <span className='text-red-500  text-xl'  ><RxCrossCircled/></span>
                        }
                        {
                            !isAttempted &&  <span className=' text-xl'  ><VscBlank/></span> 
                        }
                        </span>
                        




                        <div 
                        // className='flex items-center gap-1'
                        className={isRight && isAttempted ? "bg-green-800 text-white flex items-center gap-1 w-full p-1 rounded mb-1" : isAttempted && !isRight ?   "flex items-center gap-1 w-full p-1 bg-red-700 text-white rounded mb-1" : !isAttempted && isRight? "flex items-center gap-1 w-full p-1 mb-1 bg-green-300 dark:text-black rounded": "flex items-center gap-1 w-full p-1 mb-1 " }
                        >
                        <span className='text-xl'>
                        {
                            isAttempted ? <IoMdRadioButtonOn /> :  <IoMdRadioButtonOff/>
                        }
                        </span>
                            <div dangerouslySetInnerHTML={{__html: option}}/>
                        </div>
                    </p>
    
    
    
    </>
  )
}

export default Options
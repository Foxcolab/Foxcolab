import Image from 'next/image'
import React from 'react'
import { BiSolidTree } from 'react-icons/bi'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'

function SaveTree() {
  return (
    <>
    <div className="pt-24 pb-8">

        <div className='landling_feature_title'>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center text-green-600'> <span className='double_quote'><sup><RiDoubleQuotesL/> </sup></span><span className='text-green-600'><BiSolidTree/></span> Let's save trees together <span className='text-green-600'><BiSolidTree/></span> <sup className='double_quote'><RiDoubleQuotesR/></sup>  </div>
        </div>
        
    </div>
    <div className='flex items-center justify-center flex-col text-lg my-4 font-semibold tree_text'>
        <div>Choose online workspace with Foxcolab and reduce your ecological footprint.</div>
        <div> Help us save trees and water for future generations.</div>
        </div>
    <div className='saved_Tree'>
        <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/pngimg.com+-+forest_PNG12.png'} alt=''  width={100} height={100} unoptimized />
    </div>



    </div>
    
    
    </>
  )
}

export default SaveTree
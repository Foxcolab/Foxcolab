import Link from 'next/link'
import React from 'react'

function ChoseBetter() {
  return (
    <>
    
    <div className='choose_better mb-4'>
                <div className='text-center font-semibold text-[2rem] md:text-[3rem] mb-6'>Choose a better way to work</div>
                <div className='text-center my-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-red-600 border text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
        </div>
    
    </>
  )
}

export default ChoseBetter
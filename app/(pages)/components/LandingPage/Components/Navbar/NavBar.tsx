"use client";
import React from 'react'
import Navigations from './Navigations';
import Link from 'next/link';

function NavBar() {

  return (
    <>
    
    <div className="nav_container">
        <div className='flex items-center gap-8'>
            <Link href={'/'} className=' nav_logo_title flex cursor-pointer items-center  overflow-hidden rounded pr-2'><span className='bg-[#E04D6C] px-2 border border-[#E04D6C] text-white' >Fox</span><span className='border border-l-0 rounded rounded-l-none px-2'>Colab</span></Link>
            <div className='flex items-center gap-4 navigations_container'>
              <Navigations />
              
                {/* <div>Product</div>
                <div>Features</div>
                <div>Solution</div>
                <div>Resource</div>
                <div>Pricing</div> */}
                <Link href={'/pricing'} className='group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2  font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none hover:bg-[#f6f6f6] hover:text-[#E04D6C]  cursor-pointer'>Pricing</Link> 
            </div>
        </div>
        <div className='flex items-center gap-4'>
            <Link href={'/login'} className='group inline-flex w-max items-center justify-center rounded-md hover:bg-[#f6f6f6] hover:text-[#E04D6C] px-4 py-2  font-medium transition-colors   focus:outline-none '>Login</Link>
            <Link href={'/register'} className='bg-[#E04D6C] px-5 py-[0.4rem] text-white  group inline-flex w-max items-center justify-center rounded-md  font-medium transition-colors    focus:outline-none '>Start Free</Link>
        </div>
    </div>
    
    
    
    
    </>
  )
}

export default NavBar
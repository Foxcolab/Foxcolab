"use client";
import React from 'react'
import Navigations from './Navigations';
import Link from 'next/link';

function NavBar() {

  return (
    <>
    
    <div className="nav_container">
        <div className='flex items-center gap-8'>
            <Link href={'/'} className='text-[1.2rem] font-semibold'>Foxcolab</Link>
            <div className='flex items-center gap-4 navigations_container'>
              <Navigations />
              
                {/* <div>Product</div>
                <div>Features</div>
                <div>Solution</div>
                <div>Resource</div>
                <div>Pricing</div> */}
                <div className='group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none hover:bg-[#f6f6f6] hover:text-black cursor-pointer'>Pricing</div> 
            </div>
        </div>
        <div className='flex items-center gap-4'>
            <Link href={'/login'} className='group inline-flex w-max items-center justify-center rounded-md hover:bg-[#f6f6f6] px-4 py-2 text-sm font-medium transition-colors   focus:outline-none '>Login</Link>
            <Link href={'/register'} className='bg-black px-4 py-2 text-white  group inline-flex w-max items-center justify-center rounded-md  text-sm font-medium transition-colors    focus:outline-none '>Start Free</Link>
        </div>
    </div>
    
    
    
    
    </>
  )
}

export default NavBar
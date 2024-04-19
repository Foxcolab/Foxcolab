import Link from 'next/link'
import React from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import ChannelUiPic from "./Assests/ChannelUi.png"
import Image from 'next/image'
function HeroSection() {
  return (
    <>
    
    {/* <div className="hero_section">
[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]
    </div> */}
    <div className="relative h-full w-full bg-white"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] hero_background ">
        <div className='hero_container'>
            <div className='flex flex-col justify-center items-center hero_content'>
                  <div className='hero_title'>The Modern Workspace for</div>
                  <div className="flex gap-4 items-center justify-center mt-4">
                  <div className='work_for_item'>
                    <div>Engineers</div>
                    <div>Enterprise</div>
                    <div>Designers</div>
                    <div>Small Business</div>
                    <div>Personal Work</div>
                    <div>Remote Work</div>
                   
                  </div>
                  <div className="work_for_item">
                  <div>Startup</div>
                    <div>Education</div>
                    <div>Non Profits</div>
                    <div>Product Managers</div>
                    <div>Students</div>
                    <div>Gaming</div>
                  </div>
                  </div>
            </div>

            <div className='flex items-center justify-center my-6'>
              <Link href={'/register'} className='bg-green-500  px-4 py-[0.45rem] hover:bg-green-600 rounded-md text-white flex items-center gap-2'>Start Foxcolab - It's free <span className='text-[1.2rem]'><IoArrowForwardCircleOutline/></span> </Link>
            </div>




        </div>
         
        </div>
        
        </div>
    
    </>
  )
}

export default HeroSection
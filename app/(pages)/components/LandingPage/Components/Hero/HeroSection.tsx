import Link from 'next/link'
import React from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import ChannelUiPic from "./Assests/ChannelUi.png"
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'
function HeroSection() {
  return (
    <>
    
    {/* <div className="hero_section">
[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]
    </div> */}
    <div className="relative h-fit w-full bg-white"><div className="relative h-fit w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] hero_background ">
        <div className='hero_container'>
            <div className='flex flex-col justify-center items-center hero_content'>
              
                  <div className='hero_title'>The Modern Workspace for</div>
                  <div className=" work_for_container">
                  <div className='work_for_item'>
                    <div>Engineers</div>
                    <div>Designers</div>
                    <div>Enterprise</div>
                    <div>Remote Work</div>
                    <div>Personal Work</div>
                    <div>Small Business</div>
                   
                  </div>
                  <div className="work_for_item">
                    <div>Gaming</div>
                    <div>Startup</div>
                    <div>Students</div>
                    <div>Education</div>
                    <div>Non Profits</div>
                    <div>Product Managers</div>
                  </div>
                  </div>
            </div>

            <div className='flex flex-col items-center justify-center my-6'>
              <Link href={'/register'} className='bg-[#E04D6C]  px-4 py-[0.45rem]  rounded-md text-white flex items-center gap-2 font-semibold'>Start <span className='font-semibold'>Foxcolab</span> - It's free <span className='text-[1.2rem]'><IoArrowForwardCircleOutline/></span> </Link>
              <div className="text-[0.7rem] flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1"><span className='p-[0.2rem] bg-[#eeccd3] text-[#E04D6C] rounded-full'><GiCheckMark/></span>No credit card needed</div>
                <div className="flex items-center gap-1"><span className='p-[0.2rem] bg-[#eeccd3] text-[#E04D6C] rounded-full'><GiCheckMark/></span>Free for individuals</div>
                <div className="flex items-center gap-1"><span className='p-[0.2rem] bg-[#eeccd3] text-[#E04D6C] rounded-full'><GiCheckMark/></span>Designed for efficiency</div>
              </div>
            </div>
          




        </div>
         
        </div>
        
        </div>
    
    </>
  )
}

export default HeroSection
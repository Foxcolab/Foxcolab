"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import CompareFeatures from '../Components/CompareFeatures';



function Guilded() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    
    <HeaderFooter>
        
        <div className='hp_hero'>
                <div className='my-8'>
                    <div className='uppercase font-semibold text-[0.9rem]'>Guilded vs Foxoclab </div>
                    <div className='text-[2.9rem] my-2 font-bold leading-[2.7rem]'>#1 Business <span className='text-[#E04D6C]'>Guilded</span> alternative</div>
                    <div className='text-[1.2rem] mt-3'>Team communication app for businesses from different industries. Enjoy team communication and collaboration at its best.</div>
                    <div className='mt-4'>
                    <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-[#E04D6C] text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                    </div>
                </div>
                <div>
                    <div className='h-full rounded shadow-md w-full bg-red-500'></div>
                </div>
            </div>
    
            <div className='my-8'>
                <div className='text-center font-semibold text-[1.8rem]'>Get more from Guilded alternative
    </div>
                <div className='text-center text-[1.1rem]'>Channels are flexible spaces for all the people, tools and files that you need to get work done – no matter how you work.
    
                <div className="grid_three mx-8">
                    <div className='py-8 px-16 h-[10rem]'>
                        <div className='border rounded-md shadow hover:shadow-lg cursor-pointer'>
                          <div className='w-full h-[10rem] bg-[#E04D6C] rounded-t-md'>
                        </div>
                        <div className='text-left p-4' >
                        <div className='font-semibold my-2'>Send voice messages</div>
                        <div  className='text-[0.95rem]'>Use voice messages to share ideas and updates, or just to say hello to your team members.</div>
                        </div>
                        </div>
                    </div>
                    <div className='py-8 px-16 '>
                        <div className='border rounded-md shadow hover:shadow-lg cursor-pointer'>
                          <div className='w-full h-[10rem] bg-[#E04D6C] rounded-t-md'>
                        </div>
                        <div className='text-left p-4' >
                        <div className='font-semibold my-2'>Share files and links</div>
                        <div  className='text-[0.95rem]'>Share photos, videos, links, docs and files from anywhere, using your phone, or computer.</div>
                        </div>
                        </div>
                    </div>
                    <div className='py-8 px-16 '>
                        <div className='border rounded-md shadow hover:shadow-lg cursor-pointer'>
                          <div className='w-full h-[10rem] bg-[#E04D6C] rounded-t-md'>
                        </div>
                        <div className='text-left p-4' >
                        <div className='font-semibold my-2'>Send Video messages</div>
                        <div  className='text-[0.95rem]'>Use Video messages to share ideas and updates, or just to say hello to your team members.</div>
                        </div>
                        </div>
                    </div>
                </div>
    
                <div className='grid_two py-4'>
                <div className='flex justify-center mt-8'>
                    <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded shadow-md'></div>
                </div>
                <div className='text-left mx-[6rem] flex items-center'>
                <div className='p-4  flex-col w-full '>
                    <div className='font-semibold text-[1.8rem]'>Organize conversations
                </div>
                    <div className='text-gray-600 text-[1.0rem]'>Use Pumble when you want to get things done, and with the features for your business.</div>
                    <div className='my-4 text-gray-600 text-[1rem]'>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Create channels</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Send direct messages</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Record video messages</div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='grid_two py-4'>
            <div className='text-left mx-[6rem] flex items-center'>
                <div className='py-4 pl-8 flex-col w-full '>
                    <div className='font-semibold text-[1.8rem]'>Have all teams, together
                </div>
                    <div className='text-gray-600 text-[1.0rem]'>Invite anyone on a team meeting, share ideas and screens, or just say hello..</div>
                    <div className='my-4 text-gray-600 text-[1rem]'>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Share screen during a meeting</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Record voice messages</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Record video messages</div>
                    </div>
                    </div>
                </div>
                <div className='flex justify-center mt-8'>
                    <div className='h-[22rem] w-[28rem] bg-cyan-200 rounded'></div>
                </div>
            </div>
            <div className='grid_two py-4'>
                <div className='flex justify-center mt-8'>
                    <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
                </div>
                <div className='text-left mx-[6rem] flex items-center'>
                <div className='py-4 pl-8 flex-col w-full '>
                    <div className='font-semibold text-[1.8rem]'>Be more productive
                </div>
                    <div className='text-gray-600 text-[1.0rem]'>Move away from different distractions, and put focus on your work.</div>
                    <div className='my-4 text-gray-600 text-[1rem]'>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span>Manage notifications as you want</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Notify the group at once</div>
                      <div className='flex items-center gap-1'><span className='text-[#E04D6C]'><IoIosCheckmarkCircle/></span> Set workspace permissions</div>
                    </div>
                    </div>
                </div>
            </div>
    
           

            <CompareFeatures/>
            <ChoseBetter />
    
            </div>
            </div>
    
    
    
    
    
    
    
        </HeaderFooter>
    
    </>
  )
}

export default Guilded
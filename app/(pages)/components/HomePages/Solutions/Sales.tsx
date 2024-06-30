"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RxDividerVertical } from 'react-icons/rx';
import Image from 'next/image';

function Sales() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

      const [activee, setActive] = useState(1);
  return (
    <>
    
    <HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='my-8'>
                <div className='uppercase font-semibold text-[0.9rem]'>Sales</div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Transforming Sales Operations with Foxcolab </div>
                <div className='text-[1.2rem] mt-3 mr-6'>Empower Teams, Enhance Relationships, and Drive Growth</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

      
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Customer Relationship Management (CRM)</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab offers CRM functionalities to manage customer interactions, track leads, and nurture relationships throughout the sales cycle. It includes features for lead scoring, pipeline management, and sales forecasting.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Sales Pipeline Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>The platform enables sales teams to visualize and manage their sales pipelines effectively. It supports stages customization, activity tracking, and collaboration among team members for efficient deal management.
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
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Lead Management and Nurturing</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab facilitates lead capture, qualification, and nurturing through automated workflows and personalized communications. It integrates with marketing tools to ensure seamless lead handoff from marketing to sales.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Proposal and Contract Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Sales professionals can use Foxcolab to create, send, and track proposals and contracts. It supports document collaboration, version control, and electronic signatures to streamline the closing process.
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
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Sales Performance Analytics</div>
                <div className='mx-[6rem] text-[1.1rem]'>The platform provides analytics and reporting tools to measure sales performance, track KPIs, and identify growth opportunities. It offers dashboards for real-time insights into sales metrics and team performance.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Integration with Communication Tools</div>
                <div className='mx-[6rem] text-[1.1rem]'>Integrating with communication platforms like email and messaging apps, Foxcolab ensures seamless communication within sales teams and with prospects. It centralizes communication history for better context.
            </div>
            </div>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-cyan-200 rounded'></div>
            </div>
        </div>

     

        
        <div className='py-8 mx-[8rem]'>
          <div className='flex items-center justify-between'>
          <div className=' text-[1.8rem] font-bold'>Access resources</div>
          <div className='flex items-center gap-4'>
            <div className={cn('h-[5rem] w-[5rem] rounded-full border flex justify-center items-center cursor-pointer', activee===1 ? "text-black border-black" : "text-gray-500")} onClick={()=>setActive(1)}>1
            
            </div>
            <div className={cn('h-[5rem] w-[5rem] rounded-full border flex justify-center items-center cursor-pointer', activee===2 ? "text-black border-black" : "text-gray-500")} onClick={()=>setActive(2)}>2</div>
            <div className={cn('h-[5rem] w-[5rem] rounded-full border flex justify-center items-center cursor-pointer', activee===3 ? "text-black border-black" : "text-gray-500")} onClick={()=>setActive(3)}>3</div>
            <div className={cn('h-[5rem] w-[5rem] rounded-full border flex justify-center items-center cursor-pointer', activee===4 ? "text-black border-black" : "text-gray-500")} onClick={()=>setActive(4)}>4</div>
          </div>
          </div>
          <div className=" p-4 border mt-8 rounded shadow">
            <div className='flex justify-center '>
            <div className='h-[30rem] w-full  bg-green-500 rounded   '>
              {activee===1 ? "Active 1" : activee===2 ? "Active 2" : activee===3 ? "Active 3" : "Active 4"}
            </div>
            </div>
        </div>
        </div>




       <ChoseBetter />

      </div>
    </HeaderFooter>
    
    </>
  )
}

export default Sales
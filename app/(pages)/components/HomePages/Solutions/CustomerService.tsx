"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RxDividerVertical } from 'react-icons/rx';
import Image from 'next/image';

function CustomerService() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Customer Service </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Enhancing Customer Service with Foxcolab</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Streamline Communication and Support for Exceptional Customer Experiences</div>
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
                <div className='font-semibold text-[1.8rem]'>Real-time Customer Support</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's text channels and voice messaging features enable customer service teams to provide real-time support. Agents can communicate with customers efficiently, answer queries, and resolve issues promptly.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Multi-channel Communication</div>
                <div className='mx-[6rem] text-[1.1rem]'>Customers can reach out through various channels supported by Foxcolab, including text channels, voice and video messaging. This flexibility allows for personalized customer interactions based on their preferred communication method.
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
                <div className='font-semibold text-[1.8rem]'>Knowledge Base Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's Docs feature can be utilized to create and maintain a knowledge base for customer service. Agents can collaborate on documents, update FAQs, troubleshooting guides, and share relevant information with the team.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Automated Responses and Alerts</div>
                <div className='mx-[6rem] text-[1.1rem]'>Utilizing Foxcolab's automation features, customer service teams can set up automated responses for common queries and alerts for critical issues. This streamlines communication and ensures timely responses to customer inquiries.
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
                <div className='font-semibold text-[1.8rem]'>Feedback and Survey Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's polling and forms features enable customer service teams to gather feedback and conduct surveys. This helps in understanding customer satisfaction levels, identifying areas for improvement, and making data-driven decisions.

</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Collaborative Problem Solving</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab facilitates collaborative problem-solving among customer service teams. Agents can share screens, exchange information, and seek assistance from colleagues to resolve complex customer issues efficiently.
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
            <div className='h-[30rem] w-full  bg-green-500 rounded shadow  '>
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

export default CustomerService
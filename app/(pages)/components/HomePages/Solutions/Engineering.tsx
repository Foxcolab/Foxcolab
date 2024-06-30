"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RxDividerVertical } from 'react-icons/rx';
import Image from 'next/image';

function Engineering() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Engineering </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Empowering Engineers with Collaborative Tools
                </div>
                <div className='text-[1.2rem] mt-3 mr-6'>Enhance Efficiency and Innovation Across Engineering Projects</div>
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
                <div className='font-semibold text-[1.8rem]'>Collaborative Design and Planning</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab provides collaborative tools such as text channels, voice and video messaging, and screen sharing. Engineers can discuss design concepts, iterate on plans, and receive real-time feedback from team members.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Document and Project Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Engineers can utilize Foxcolab's Docs feature to create project documentation, technical specifications, and design proposals using a block-based editor. They can organize documents within canvases and collaborate on them with team members.
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
                <div className='font-semibold text-[1.8rem]'>Integration with Engineering Tools</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab integrates with third-party applications through its Automation feature, allowing engineers to streamline workflows with tools they already use. This includes integrating with CAD software, project management tools, and version control systems.</div>
            </div>
        </div>

        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Visualization and Simulation</div>
                <div className='mx-[6rem] text-[1.1rem]'>Engineers can leverage Foxcolab's capabilities for sharing and viewing documents, spreadsheets, and other data-rich content. This includes visualizing simulations, sharing 3D models, and annotating diagrams collaboratively.
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
                <div className='font-semibold text-[1.8rem]'>Project Tracking and Monitoring</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's reporting and analytics features enable engineers to track project progress, monitor resource utilization, and analyze performance metrics. This helps in identifying bottlenecks, optimizing workflows, and ensuring project milestones are met.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Secure Data Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>With Foxcolab's permissions and access control features, engineers can manage sensitive data securely. They can control who has access to design files, project documentation, and confidential information, ensuring data privacy and compliance.
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
                <div className='font-semibold text-[1.8rem]'>Remote Collaboration and Support</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's voice and video messaging, screen sharing, and interactive features facilitate remote collaboration among distributed engineering teams. Engineers can conduct virtual meetings, provide remote support, and share knowledge effectively.</div>
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

export default Engineering
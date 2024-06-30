"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RxDividerVertical } from 'react-icons/rx';
import Image from 'next/image';

function HealthLifeScience() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Health & Life Science </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Advancing Healthcare with Foxcolab</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Enhance Collaboration and Innovation in Medical and Life Sciences</div>
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
                <div className='font-semibold text-[1.8rem]'>Secure Communication and Collaboration</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's text channels, voice messaging, and video conferencing features enable secure communication among healthcare professionals. Teams can discuss patient cases, share medical insights, and collaborate on research projects.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Document Management and Compliance</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab facilitates document management for healthcare organizations, ensuring secure storage and sharing of medical records, research papers, and compliance documents. It supports adherence to regulatory standards such as HIPAA in the United States.
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
                <div className='font-semibold text-[1.8rem]'>Clinical Data Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's data management capabilities help healthcare providers organize and analyze clinical data effectively. It supports data integration, patient data anonymization (where applicable), and secure data sharing for research purposes.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Telemedicine and Remote Consultations</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab supports telemedicine initiatives by providing video messaging and screen sharing capabilities. Healthcare professionals can conduct remote consultations, share medical reports, and collaborate with specialists in real-time.
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
                <div className='font-semibold text-[1.8rem]'>Research Collaboration and Data Analysis</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's collaborative tools facilitate research collaboration among life scientists and healthcare researchers. Teams can share research findings, analyze data using integrated analytics tools, and collaborate on scientific publications.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Patient Engagement and Education</div>
                <div className='mx-[6rem] text-[1.1rem]'>Healthcare providers can use Foxcolab to engage patients through interactive forms, educational materials, and virtual support groups. It supports patient education, health surveys, and feedback collection to improve care delivery.
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
                <div className='font-semibold text-[1.8rem]'>Remote Monitoring and Health Analytics</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab integrates with health monitoring devices and analytics platforms to support remote patient monitoring and population health management. It helps healthcare organizations track health trends, manage chronic conditions, and improve patient outcomes.</div>
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

export default HealthLifeScience
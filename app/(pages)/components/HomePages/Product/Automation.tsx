"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Automation() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
<HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='my-8'>
                <div className='uppercase font-semibold text-[0.9rem]'>Automation </div>
                <div className='text-[2.8rem] font-bold leading-[2.5rem]'>Enhance Work Efficiency with Automation</div>
                <div className='text-[1.2rem] mt-3'>Integrate Third-Party Applications to Streamline Processes</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is workflow automation?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>


        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Workflow Automation</div>
                <div className='mx-[6rem] text-[1.1rem]'>Users can create automated workflows that trigger actions based on predefined conditions, reducing manual tasks and enhancing efficiency.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Task Scheduling</div>
                <div className='mx-[6rem] text-[1.1rem]'>Automate routine tasks and processes by scheduling actions to occur at specific times or intervals, improving productivity and consistency.
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
                <div className='font-semibold text-[1.8rem]'>Data Synchronization</div>
                <div className='mx-[6rem] text-[1.1rem]'>Automatically synchronize data between Foxcolab and connected applications, maintaining consistency across platforms.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Customizable Automation Rules</div>
                <div className='mx-[6rem] text-[1.1rem]'>Define custom rules and conditions to automate complex workflows tailored to specific organizational needs and processes.
            </div>
            </div>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-cyan-200 rounded'></div>
            </div>
        </div>
       


        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="What is automation in Foxcolab?"
            answer={`<div>Automation in Foxcolab refers to the ability to streamline workflows by integrating with third-party applications and automating repetitive tasks and processes.
              </div>`}
            />
           
           <FAQ
            title="What types of tasks can be automated using Foxcolab's Automation feature?"
            answer={`<div>Users can automate a wide range of tasks, including data synchronization between applications, task scheduling, automated notifications, and triggering actions based on specific events or conditions.
              </div>`}
            />
           
           <FAQ
            title="Can I create custom automation workflows in Foxcolab?"
            answer={`<div>Yes, Foxcolab allows users to create custom automation workflows by defining rules and conditions using a user-friendly interface. This flexibility enables tailored automation solutions for various business needs.
              </div>`}
            />
           
           <FAQ
            title="How does automation help improve work efficiency in Foxcolab?"
            answer={`<div>Automation reduces manual effort by handling repetitive tasks, ensuring consistency in processes, and freeing up time for more strategic activities. It also minimizes errors and delays associated with manual work.
              </div>`}
            />
           
          
           

        </div>
            
        </div>
       <ChoseBetter />

      </div>
    </HeaderFooter>


    </>
  )
}

export default Automation
"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RxDividerVertical } from 'react-icons/rx';
import Image from 'next/image';

function Education() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Education</div>
                <div className='text-[2.8rem] font-bold leading-[2.5rem]'> Transforming Education with Foxcolab</div>
                <div className='text-[1.2rem] mt-3'>Empower Collaboration and Engagement in Learning</div>
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
                <div className='font-semibold text-[1.8rem]'>Virtual Classrooms and Lectures</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's video messaging and screen sharing features can support virtual classrooms and lectures. Educators can conduct live sessions, share presentations, and engage students in real-time discussions.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Collaborative Projects and Assignments</div>
                <div className='mx-[6rem] text-[1.1rem]'>Students and educators can use Foxcolab's text channels, documents (docs), and spreadsheets features to collaborate on projects and assignments. They can work together, share resources, and track progress within dedicated channels.


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
                <div className='font-semibold text-[1.8rem]'>Content Sharing and Resource Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's document management capabilities allow educators to share study materials, lecture notes, and resources with students. They can organize content within canvases and provide easy access to educational materials.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Interactive Polls and Quizzes</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's polling and forms features enable educators to create interactive polls, quizzes, and assessments. They can collect responses, analyze results, and provide instant feedback to students.
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
                <div className='font-semibold text-[1.8rem]'>Parent-Teacher Communication</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab supports communication between educators, students, and parents. Parent-teacher conferences, updates on student progress, and collaborative discussions can be facilitated through the platform.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Administrative and Staff Collaboration</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's features can facilitate collaboration among administrative staff, teachers, and support teams. They can coordinate school activities, share administrative documents, and streamline communication within the institution.
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
                <div className='font-semibold text-[1.8rem]'>Remote Learning Support</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab provides tools for remote learning, including video messaging, screen sharing, and virtual whiteboards. It enables educators to deliver engaging lessons and support students in virtual environments.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Professional Development and Training</div>
                <div className='mx-[6rem] text-[1.1rem]'>Educators can use Foxcolab for professional development workshops, training sessions, and peer collaboration. They can share best practices, conduct webinars, and enhance teaching skills through interactive learning experiences.
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

export default Education
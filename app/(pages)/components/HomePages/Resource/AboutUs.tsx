"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ChoseBetter from '../Components/ChoseBetter';

function AboutUs() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    <HeaderFooter>
        <div className='bg-[#fbf7f1] py-[5rem] px-[5rem]'>
          <div className=' text-[4rem] font-bold  text-center leading-[4.5rem]'>
          Make work life simpler, more <br /> pleasant and more productive.
          </div>
          <div className='px-[5rem] text-center text-[1.2rem] font-semibold mt-4'>Empowering teams with innovative collaboration  tools, <br /> Foxcolab enhances productivity and communication through seamless <br /> integration of messaging, file sharing, and project management features.</div>
        </div>
        
          



        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex  flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Innovative Collaboration Platform</div>
                <div className='mr-[6rem] text-[1.1rem] text-left'>At Foxcolab, we are dedicated to empowering teams with cutting-edge collaboration tools that enhance productivity and streamline communication. Our platform is designed to meet the diverse needs of modern teams, fostering a collaborative environment where creativity and efficiency thrive.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='py-4 px-8 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] pl-[6rem]'>Comprehensive Messaging Solutions</div>
                <div className='ml-[6rem] text-[1.1rem]'>Communication is at the heart of effective teamwork. Foxcolab offers a range of messaging options, including text channels for real-time conversations, voice messaging for quick verbal updates, and video messaging for more personal interactions. These tools ensure that team members can communicate clearly and effectively, no matter their location.
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
            <div className='p-4 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] pr-[6rem]'>Seamless File Sharing</div>
                <div className='mr-[6rem] text-[1.1rem] '>Keeping everyone on the same page is crucial for team success. Foxcolab makes it easy to share documents, images, and other files, supporting collaboration and ensuring that all team members have access to the information they need. Our file-sharing features are secure and straightforward, allowing for effortless collaboration.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] pl-[6rem]'>Robust Project Management</div>
                <div className='ml-[6rem] text-[1.1rem]'>Managing tasks, projects, and deadlines has never been easier. Foxcolab provides a comprehensive suite of project management tools, including Gantt charts, timelines, and task prioritization features. These tools help teams stay organized, track progress, and meet their goals efficiently.
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
            <div className='p-4 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] '>Dynamic Workspaces</div>
                <div className='mr-[6rem] text-[1.1rem]'>Foxcolab offers dynamic workspaces where teams can create and collaborate on project boards, documents, and spreadsheets. Our platform supports a variety of project management methodologies, including agile, to accommodate different workflows and ensure that projects stay on track.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] pl-[6rem]'>Interactive Polls and Forms</div>
                <div className='ml-[6rem] text-[1.1rem]'>Gathering feedback and collecting data is essential for informed decision-making. Foxcolab allows teams to create customizable polls and forms, making it easy to conduct surveys, gather opinions, and collect structured data. Our interactive tools facilitate engagement and ensure that every team member's voice is heard.
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
            <div className='p-4 flex flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] '>Enhanced Security</div>
                <div className='mr-[6rem] text-[1.1rem]'>We prioritize the security of your data. Foxcolab employs robust security measures, including role-based access control, encryption, and secure private and public servers. These features ensure that your information is protected and that only authorized users have access to sensitive data.</div>
            </div>
        </div>






<ChoseBetter />



    </HeaderFooter>
    
    </>
  )
}

export default AboutUs
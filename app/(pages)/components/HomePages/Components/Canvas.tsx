"use client";
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react'
import HeaderFooter from './HeaderFooter';
import Link from 'next/link';
import ChoseBetter from './ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ';
import Image from 'next/image';

const items = [
    {
        url:"",
        title:"Efficient Organization",
        description:"Simplifies the process of organizing thoughts and ideas with intuitive tools for seamless navigation and categorization."
    },
    {
        url:"",
        title:"Interactive Comments",
        description:"Encourages collaboration and deeper engagement through integrated commenting features, enabling meaningful discussions on notes and ideas."
    },
    {
        url:"",
        title:"Enhanced Productivity",
        description:"Combines robust note-taking capabilities with collaborative tools to boost productivity and streamline workflows effectively."
    },
   
]
function Canvas() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

  return (
    <>
    
    <HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='hp_container'>
                <div className='uppercase font-semibold text-[0.9rem]'>Canvas </div>
                <div className='hp_title'>Collaborative note-taking with integrated comments</div>
                <div className='hp_subtitle'>Facilitates seamless organization of thoughts and ideas, with integrated commenting for engaging discussions and productive collaboration.</div>
                <div className='hp_link'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
            <div className='hp_hero_img '>
                    <Image src={"https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/33801.jpg"} height={100} width={100} alt='' unoptimized className='shadow-md' />
                </div>
            </div>
        </div>

        <div className="what_section_title">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Canvas?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
     
        {
            items.map((item, i)=>(
                i%2==0 ? <div className='grid_two py-4' key={i}>
                <div className='grid_two_img_container'>
                    <div className=' section_image_container  bg-yellow-200 rounded'></div>
                </div>
                <div className='grid_two_text_container'>
                    <div className='section_image_title font-semibold '>{item.title}</div>
                    <div className='text-[1rem] md:text-[1.1rem] text-gray-600'>{item.description}</div>
                </div>
            </div> : <div className='grid_two2 ' key={i}>
            <div className='grid_two_text_container2 '>
                <div className='font-semibold text-[1.8rem]'>{item.title}</div>
                <div className='text-[1rem] md:text-[1.1rem] text-gray-600'>{item.description}</div>
            </div>
            <div className='grid_two_img_container'>
                <div className='section_image_container bg-cyan-200 rounded'></div>
            </div>
        </div>

            ))
        }

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-8 md:mx-24 border-t'>
            
            <FAQ
            title='How can I organize my notes in Foxcolab?'
            answer={`<div>
                <div>Foxcolab  provides a user-friendly interface with tools for effortless organization. You can categorize notes by topics, projects, or priorities using tags and folders. This feature allows you to quickly locate and manage your notes, enhancing productivity and clarity in your workflow.
              </div>`}
            
            />
            <FAQ
            title='Can I collaborate with others on notes in Foxcolab?'
            answer={`<div>
                <div>Yes, Foxcolab supports seamless collaboration through integrated commenting features. You can invite colleagues or team members to view, edit, and comment on notes. This fosters teamwork and facilitates meaningful discussions, whether you're brainstorming ideas, sharing feedback, or coordinating tasks.
              </div>`}
            
            />
            <FAQ
            title='Is Foxcolab suitable for personal and professional use?'
            answer={`<div>
                <div>Absolutely! Foxcolab is designed to cater to various needs, making it ideal for both personal organization and professional environments. Whether you're managing personal projects, academic research, or collaborating on business tasks, Foxcolab provides the tools necessary to stay organized and efficient.
              </div>`}
            
            />
            <FAQ
            title='How secure are my notes in Foxcolab?'
            answer={`<div>
                <div>Foxcolab prioritizes the security and privacy of your data. All notes are encrypted both in transit and at rest, ensuring that your information remains confidential and protected against unauthorized access. We employ industry-standard security measures to safeguard your notes, giving you peace of mind while using the platform.
              </div>`}
            
            />
           <FAQ
            title='Can I access Foxcolab across different devices?'
            answer={`<div>
                <div>Yes, Foxcolab offers cross-platform accessibility, allowing you to access your notes from desktop computers, and tablets. Your notes sync automatically across devices in real-time, ensuring that you can work seamlessly whether you're at home, in the office, or on the go. This flexibility empowers you to stay productive and organized wherever you are.
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

export default Canvas
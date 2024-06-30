
"use client";
import React, { useEffect } from 'react'
import ChoseBetter from './ChoseBetter'
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from './HeaderFooter'
import { useTheme } from 'next-themes'
import Image from 'next/image';


const Items = [
    {
        url:"",
        title:"Contextual Messaging",
        description:"Threads in Foxcolab allow for organized communication around a single message or topic. Users can reply directly to specific messages, creating threaded conversations that maintain context and clarity within discussions."
    },
    {
        url:"",
        title:"Attachment Capabilities",
        description:"Users can attach files to messages within threads in Foxcolab. This feature enables seamless sharing of documents, images, or other file types relevant to the ongoing conversation. It supports collaborative work by ensuring all necessary resources are easily accessible within the thread."
    },
    {
        url:"",
        title:"Thread Management Tools",
        description:"Foxcolab provides tools for thread management, including the ability to pin important threads, mark threads as unread, or archive threads when no longer active. These features help users organize and prioritize their communications effectively."
    },
    {
        url:"",
        title:"Real-time Updates and Notifications",
        description:"Users receive real-time updates and notifications for new messages or replies within threads. This ensures timely engagement and keeps team members informed about ongoing discussions and any new contributions to the thread."
    },
   
]

function Thread() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Threads </div>
                <div className='hp_title'>Organized Communication Threads</div>
                <div className='hp_subtitle'>Enhance Collaboration with Contextual Messaging and Attachment Capabilities</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Thread?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
       
       
        {
            Items.map((item, i)=>(
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
            title="What are threads in Foxcolab?"
            answer={`<div>Threads in Foxcolab are organized conversations centered around a single message or topic. They allow users to reply directly to specific messages within a thread, maintaining context and clarity in discussions. Threads help streamline communication by keeping related messages grouped together.
              </div>`}
            
            />
            <FAQ
            title="How do I reply to a message within a thread?"
            answer={`<div>To reply to a message within a thread in Foxcolab, simply click on the message you want to respond and threads section will openand type your reply in text box provided at the bottom of the thread. This ensures that your response is linked directly to the relevant message, keeping the conversation organized and easy to follow.
              </div>`}
            
            />
            <FAQ
            title="Can I attach files to messages within a thread?"
            answer={`<div>Yes, Foxcolab allows users to attach files to messages within threads. This feature enables seamless sharing of documents, images, or other file types directly within the context of the conversation. Attachments can be previewed or downloaded by other participants, facilitating collaborative work and information sharing.
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

export default Thread
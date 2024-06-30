"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'
import Image from 'next/image';

const Items = [
    {
        url:"",
        title:"Record and Send Video Messages",
        description:"Users can record video messages directly within Foxcolab's text channels. This feature enables clear and engaging communication by allowing users to convey messages visually"
    },
    {
        url:"",
        title:"Intuitive Recording Interface",
        description:"Foxcolab offers an intuitive interface for recording video messages. Users can easily initiate recording, add visual elements or annotations, and preview their video before sending it to the channel."
    },
    {
        url:"",
        title:"Real-time Video Recording",
        description:"The video messaging feature supports real-time video recording. Users can capture and share updates, presentations, or demonstrations instantly within text channels, promoting dynamic and interactive communication."
    },
    {
        url:"",
        title:"Playback and Review Capability",
        description:"Foxcolab provides playback and review capabilities for video messages. Recipients can view video messages within the text channel, replaying them as needed to grasp details or follow instructions effectively."
    },
  
]

function VideoMessage() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Video Message </div>
                <div className='hp_title'>Engage Effectively with Video Messaging</div>
                <div className='hp_subtitle'>Record and Share Video Messages in Text Channels for Enhanced Communication.</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>How to Record Video?</div>
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
            title='How do I record and send a video message in Foxcolab?'
            answer={`<div>
            To record and send a video message in Foxcolab, navigate to the desired text channel, click on the video message icon, and start recording your message using your device's camera. Once recorded, you can preview and send the video message to the channel.
              </div>`}
            />
           
           <FAQ
            title=' Is there a limit to the duration of video messages in Foxcolab?'
            answer={`<div>Foxcolab supports flexible duration for video messages, accommodating various communication needs. While specific duration limits may vary based on platform settings, users typically have sufficient time to convey their messages effectively.
              </div>`}
            />
            <FAQ
            title='How do recipients view video messages in Foxcolab?'
            answer={`<div>Recipients can view video messages directly within the text channel where they were sent. Simply click on the video message to play it back. You can replay the video as needed to understand details or follow instructions provided in the message.


              </div>`}
            />
            <FAQ
            title='Are video messages in Foxcolab secure and private?'
            answer={`<div>Yes, Foxcolab prioritizes security and privacy for video messages. Messages are transmitted securely within the platform, ensuring confidentiality and compliance with data protection regulations.
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

export default VideoMessage;
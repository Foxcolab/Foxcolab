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
        title:"Record and Send Voice Messages",
        description:"Users can record their voice messages directly within Foxcolab's text channels. This feature allows for spontaneous and expressive communication, enhancing clarity and personalization in team interactions."
    },
    {
        url:"",
        title:"Attractive and Intuitive Design",
        description:"Foxcolab offers an attractive and intuitive interface for voice messaging. Users can easily navigate, record, and send voice messages with minimal effort, ensuring a seamless user experience."
    },
    {
        url:"",
        title:"Real-time Voice Recording",
        description:"The voice messaging feature supports real-time voice recording. Users can record messages on-the-go, capturing thoughts or updates instantly and sharing them with team members in text channels."
    },
    {
        url:"",
        title:"Playback and Review Options",
        description:"Foxcolab provides playback and review options for voice messages. Recipients can listen to messages at their convenience, replaying them as needed to grasp details or context effectively."
    },
    {
        url:"",
        title:"Secure and Private Messaging",
        description:"Voice messages in Foxcolab prioritize security and privacy. Messages are transmitted securely within the platform, ensuring confidentiality and compliance with data protection standards."
    },
   

]


function VoiceMessage() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Voice Message </div>
                <div className='hp_title'>Enhance Communication with Voice Messaging</div>
                <div className='hp_subtitle'>Record and Send Voice Messages in Text Channels for Clearer Communication</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>How to Record Voice?</div>
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
            title='How do I send a voice message in Foxcolab?'
            answer={`<div>To send a voice message in Foxcolab, navigate to the desired text channel, click on the voice message icon, and start recording your message. Once recorded, you can review and send it to the channel for others to listen to.
              </div>`}
            />

            <FAQ
            title='Can I listen to voice messages sent by others in Foxcolab?'
            answer={`<div>Yes, recipients can listen to voice messages sent by others in Foxcolab. Simply click on the voice message within the text channel to play it back. You can replay the message as needed for clarity or context.
              </div>`}
            />
            
            <FAQ
            title=' Is there a limit to the duration of voice messages in Foxcolab?'
            answer={`<div>Foxcolab allows for flexible duration in voice messages, accommodating various communication needs. While specific duration limits may vary based on platform settings, users typically have sufficient time to convey their messages effectively.
              </div>`}
            />

            <FAQ
            title=' Can I send voice messages across different devices in Foxcolab?'
            answer={`<div>Yes, Foxcolab's voice messaging feature is accessible across different devices. Whether you're using a desktop computer, laptop, or mobile device, you can record and send voice messages in text channels seamlessly.
              </div>`}
            />

            <FAQ
            title='Are voice messages in Foxcolab secure and private?'
            answer={`<div>Yes, Foxcolab prioritizes security and privacy for voice messages. Messages are transmitted securely within the platform, ensuring confidentiality and compliance with data protection regulations.
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

export default VoiceMessage;
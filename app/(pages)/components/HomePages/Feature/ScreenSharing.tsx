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
        title:"Real-time Screen Sharing",
        description:"Foxcolab allows users to share their screens in real-time during text channel discussions. This feature enhances collaboration by enabling participants to view presentations, documents, or software demonstrations directly."
    },
    {
        url:"",
        title:"Interactive Session Recording",
        description:"Users can record screen sharing sessions in Foxcolab. This capability allows for capturing important discussions, presentations, or training sessions, which can be saved and shared for future reference or review."
    },
    {
        url:"",
        title:"Attractive Design Options",
        description:"Screen sharing and recording in Foxcolab can be enhanced with attractive design options. Users can add annotations, highlight sections, or use virtual pointers to emphasize key points during the session."
    },
    {
        url:"",
        title:"Privacy and Security Measures",
        description:"Foxcolab prioritizes privacy and security during screen sharing and recording sessions. All transmissions are encrypted to protect sensitive information, ensuring confidentiality and compliance with data protection regulations."
    },
    {
        url:"",
        title:"Playback and Review Options",
        description:"Recorded sessions can be played back and reviewed within Foxcolab. This feature allows participants to revisit content, clarify details, or extract insights from previous discussions or presentations."
    },
]

function ScreenSharing() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Screen Sharing </div>
                <div className='hp_title'>Collaborate Seamlessly with Screen Share and Recording</div>
                <div className='hp_subtitle' >Share Your Screen and Record Sessions for Enhanced Team Communication</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>How to share screeen?</div>
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
            title="How do I start a screen sharing session in Foxcolab?"
            answer={`<div>To start a screen sharing session in Foxcolab, navigate to the desired text channel, click on the screen share icon, select the screen or application you want to share, and begin the session. Participants in the channel can view your shared screen in real-time.
              </div>`}
            />

            <FAQ
            title="Can I record a screen sharing session in Foxcolab?            "
            answer={`<div>Yes, Foxcolab allows users to record screen sharing sessions. During the session, click on the record button to start recording. Recorded sessions can be saved and shared for later review or reference.
              </div>`}
            />

            <FAQ
            title="How secure are screen sharing sessions in Foxcolab?"
            answer={`<div>Foxcolab prioritizes security during screen sharing sessions by encrypting all transmissions. This ensures that shared content is protected against unauthorized access, maintaining confidentiality and compliance with data security standards.
              </div>`}
            />

            <FAQ
            title="Can I review or playback recorded sessions in Foxcolab?"
            answer={`<div>Yes, recorded screen sharing sessions can be reviewed or played back within Foxcolab. Participants can revisit content, review discussions, or extract information from previous sessions as needed.
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

export default ScreenSharing;
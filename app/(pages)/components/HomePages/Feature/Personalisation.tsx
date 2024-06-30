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
        title:"Multiple Theme Options",
        description:"Foxcolab offers users the flexibility to choose between different themes, including dark and light modes. This customization option allows users to personalize their interface based on their preferences and working environment.",
    },
    {
        url:"",
        title:"Manage Members",
        description:"Administrators in Foxcolab have the ability to manage members within teams or channels. This includes adding new members to collaborate on specific projects or tasks and removing members who no longer require access, ensuring efficient team management.",
    },
    {
        url:"",
        title:"Role-based Permissions",
        description:"Personalization in Foxcolab extends to role-based permissions, where administrators can assign specific roles to team members. Each role comes with predefined permissions, ensuring that users have access to relevant features and data based on their responsibilities",
    },
    {
        url:"",
        title:"Preferences and Settings",
        description:"Foxcolab allows users to customize their preferences and settings according to their workflow and communication needs. This includes configuring notification preferences, language settings, and other platform-specific settings to enhance user experience and efficiency.",
    },
    {
        url:"",
        title:"Data Privacy and Security",
        description:"Personalization features in Foxcolab prioritize data privacy and security. User information, including profile pictures and personal settings, are safeguarded with encryption and compliance with data protection regulations, ensuring confidentiality and trust among users.",
    },
    {
        url:"",
        title:"User-friendly Interface",
        description:"Foxcolab provides an intuitive and user-friendly interface for personalization. This ensures that users can easily navigate through customization options, update their profiles, manage members, and personalize their workspace without technical challenges",
    },
]


function Personalisation() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Personalisation</div>
                <div className='hp_title'>Customize Your Foxcolab Experience</div>
                <div className='hp_subtitle'>Personalize Themes, customize and managed server for Enhanced Collaboration</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Personalization?</div>
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
            title="How do I change the theme in Foxcolab?"
            answer={`<div>To change the theme in Foxcolab, navigate to the settings or preferences section of your profile. Look for an option to select themes and choose between dark mode or light mode based on your preference. Save your changes to apply the new theme.
              </div>`}
            />
             <FAQ
            title="How secure is my personal information in Foxcolab?"
            answer={`<div>Foxcolab prioritizes the security and privacy of user information, including personalization settings. All data is encrypted during transmission and storage, and the platform adheres to strict data protection regulations to ensure confidentiality and integrity of user data.
              </div>`}
            />
             <FAQ
            title="Are there different roles with specific permissions in Foxcolab?"
            answer={`<div>Yes, Foxcolab offers different roles with specific permissions to manage team collaboration effectively. Roles such as admin, manager, and user have predefined permissions that dictate access to features, data, and administrative functions within the platform.
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

export default Personalisation;
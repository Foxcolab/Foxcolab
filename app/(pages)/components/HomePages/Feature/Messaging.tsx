"use client";
import ChoseBetter from '@/app/(pages)/components/HomePages/Components/ChoseBetter';
import HeaderFooter from '@/app/(pages)/components/HomePages/Components/HeaderFooter';
import FAQ from '@/app/(pages)/components/HomePages/Feature/FAQ/FAQ';
import { Metadata } from 'next'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Items = [
    {
        url:"",
        title:"Real-time Communication",
        description:"Instantly exchange messages, ensuring timely updates and quick responses for seamless team collaboration and decision-making."
    },
    {
        url:"",
        title:"Multimedia Support",
        description:"Share files, images, videos, and documents directly within messages, enhancing communication with visual and contextual information."
    },
    {
        url:"",
        title:"Collaborative Tools",
        description:"Use polls, forms, and reactions to engage teams, gather feedback, and streamline decision-making processes for more effective collaboration."
    },
    {
        url:"",
        title:"Integration Capability",
        description:" Integrate seamlessly with other tools and platforms, optimizing workflows by consolidating communication and project management across different applications."
    },
    {
        url:"",
        title:"Security and Privacy",
        description:"Ensure data security with encryption and robust access controls, maintaining confidentiality and compliance with privacy regulations throughout messaging and file sharing."
    },
   
]

function Messaging() {
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
                  <div className='uppercase font-semibold text-[0.9rem]'>Messsaging </div>
                  <div className='hp_title'>Efficient team messaging with multimedia support</div>
                  <div className='hp_subtitle'>Foxcolab enhances team communication with text, file sharing, polls, forms, voice and video messaging, and seamless screen sharing for productive collaboration.</div>
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
              <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Messaging?</div>
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
              title="What features does Foxcolab's messaging offer?"
              answer={`<div>Foxcolab messaging provides a robust set of features designed to facilitate seamless team communication and collaboration. Users can create and participate in text channels for group discussions, share files and documents directly within messages, create polls to gather team opinions quickly, design forms to collect structured feedback or information, send voice messages for clearer communication, engage in video messaging for face-to-face interactions, and share screens to collaborate on projects in real-time.</div>`}
              />
               <FAQ
              title="How secure is Foxcolab messaging?"
              answer={`<div>Foxcolab prioritizes the security and privacy of user data. All communications, including messages and file transfers, are encrypted to prevent unauthorized access. Access controls allow administrators to manage user permissions effectively, ensuring that sensitive information remains protected. Foxcolab complies with industry standards and regulations regarding data privacy, providing users with peace of mind when using the platform for sensitive or confidential communications.</div>`}
              />
               <FAQ
              title="Can Foxcolab integrate with other tools our team uses?"
              answer={`<div>Yes, Foxcolab is designed to integrate seamlessly with a wide range of third-party tools and platforms commonly used in business environments. This integration capability allows teams to consolidate their workflows and communications into a single platform, eliminating the need to switch between multiple applications. Whether it's project management tools, calendar applications, CRM systems, or productivity suites, assessment, Foxcolab enhances productivity by enabling data flow and collaboration across different software solutions.</div>`}
              />
               <FAQ
              title='How does Foxcolab facilitate collaboration through messaging?'
              answer={`<div>Foxcolab enhances collaboration by providing a versatile messaging platform that supports real-time communication and interaction. Teams can exchange messages instantly, ensuring timely updates and responses. Multimedia support enables the sharing of files, images, videos, and documents directly within conversations, providing context and visual information crucial for decision-making. Collaborative tools such as polls and forms allow teams to gather feedback efficiently, while features like voice and video messaging foster richer communication experiences, resembling in-person interactions despite geographical distances.</div>`}
              />
               <FAQ
              title='Is Foxcolab suitable for remote teams? '
              answer={`<div> Yes, Foxcolab is designed with remote and distributed teams in mind. The platform's features and capabilities cater to the unique needs of remote work dynamics, providing tools that facilitate effective communication, collaboration, and project management regardless of team members' locations. Remote teams can rely on Foxcolab to stay connected, share information seamlessly, and maintain productivity levels comparable to in-office environments.            </div>`}
              />
               <FAQ
              title='How does Foxcolab ensure data privacy for users?              '
              answer={`<div>Foxcolab employs robust security measures to safeguard user data and uphold privacy standards. All communication channels within the platform are encrypted, preventing unauthorized interception or access to messages and shared files. Administrators have granular control over user permissions and access rights, allowing them to configure settings that align with organizational privacy policies and regulatory requirements. By prioritizing data privacy, Foxcolab ensures that sensitive information remains confidential and protected against potential security threats.</div>`}
              />
             
             
  
  
          </div>
              
          </div>
         <ChoseBetter />
  
        </div>
      </HeaderFooter>
      </>
    )
  }
  
  export default Messaging;
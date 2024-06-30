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
        title:"Data Encryption",
        description:"Foxcolab employs robust encryption protocols to secure data both in transit and at rest. This ensures that all communications and stored information are protected against unauthorized access or interception."
    },
    {
        url:"",
        title:"Access Controls",
        description:"Administrators can define granular access controls, specifying who can access specific features, data, or functionalities within Foxcolab. This helps enforce least privilege access and reduces the risk of unauthorized use."
    },
    {
        url:"",
        title:"Multi-factor Authentication (MFA)",
        description:"Foxcolab supports multi-factor authentication, adding an extra layer of security by requiring users to verify their identity with additional factors beyond just a password. This mitigates the risk of unauthorized access even if passwords are compromised."
    },
    {
        url:"",
        title:"Regular Security Audits",
        description:"  Foxcolab conducts regular security audits and assessments to identify and address potential vulnerabilities or threats. This proactive approach helps maintain the integrity of the platform's security measures and ensures continuous improvement."
    },
    {
        url:"",
        title:"Compliance with Data Protection Regulations",
        description:"Foxcolab adheres to relevant data protection regulations and standards, such as GDPR or HIPAA, depending on the user's jurisdiction and industry. Compliance measures are integrated into the platform to protect user data and ensure legal adherence."
    },
    {
        url:"",
        title:"Incident Response and Monitoring",
        description:"Foxcolab maintains robust incident response protocols and continuous monitoring capabilities. This allows for the detection of security incidents in real-time and enables prompt response and mitigation to minimize potential impact."
    },
    {
        url:"",
        title:"Secure Infrastructure",
        description:"Foxcolab leverages secure infrastructure providers and best practices for data center management. This includes physical security measures, such as access controls and surveillance, to safeguard servers and data storage facilities."
    },
    {
        url:"",
        title:"User Education and Awareness",
        description:"Foxcolab promotes user education and awareness regarding cybersecurity best practices. This includes providing resources, training, and guidelines to help users understand their role in maintaining security and protecting sensitive information within the platform."
    },
    
]

function Security() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Security </div>
                <div className='hp_title'>Safeguarding Your Data and Privacy</div>
                <div className='hp_subtitle'>Robust Measures to Protect Data Integrity, Privacy, and Compliance Across Your Collaborative Environment</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>How to share files?</div>
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
            <div className=' mx-8 md:mx-24 border-t'>
            
            <FAQ
            title=' How does Foxcolab ensure data security?'
            answer={`<div>Foxcolab prioritizes data security through multiple layers of protection. All data, including communications and stored information, is encrypted using robust encryption protocols. Encryption ensures that sensitive data remains secure both during transit and at rest, protecting it from unauthorized access or interception.
              </div>`}
            
            />
             <FAQ
            title='What measures does Foxcolab have in place to control access to sensitive information?'
            answer={`<div>
            Foxcolab implements granular access controls to manage user permissions effectively. Administrators can define access levels based on roles, departments, or specific project requirements. This includes controlling who can access, view, edit, download, or share sensitive information within the platform. These access controls help enforce least privilege principles, reducing the risk of unauthorized access and data breaches.
              </div>`}
            
            />
             <FAQ
            title='How does Foxcolab ensure compliance with data protection regulations?'
            answer={`<div>Foxcolab complies with relevant data protection regulations and standards, such as GDPR (General Data Protection Regulation) or HIPAA (Health Insurance Portability and Accountability Act), depending on the user's jurisdiction and industry. Compliance measures are integrated into the platform's design and operations, ensuring that user data is handled securely and in accordance with legal requirements.
              </div>`}
            
            />
             <FAQ
            title='What security measures does Foxcolab have in place for incident response and monitoring?'
            answer={`<div>
            Foxcolab maintains robust incident response protocols and continuous monitoring capabilities. This includes real-time monitoring of platform activities and network traffic to detect and respond to security incidents promptly. In the event of a security breach or anomaly, Foxcolab's incident response team is prepared to investigate, mitigate, and take appropriate action to minimize potential impact and safeguard user data.
              </div>`}
            
            />
             <FAQ
            title=" How is Foxcolab's infrastructure secured against physical and cyber threats?            "
            answer={`<div>Foxcolab partners with secure infrastructure providers and follows best practices for data center management. This includes physical security measures such as access controls, surveillance systems, and environmental controls to protect servers and data storage facilities. Cybersecurity measures are also implemented to safeguard against digital threats, ensuring the integrity and availability of the platform's infrastructure.
              </div>`}
            
            />
             <FAQ
            title='How does Foxcolab ensure the security of third-party integrations and data exchanges?'
            answer={`<div>
            Foxcolab rigorously evaluates and selects third-party integrations based on their security standards and practices. Integration points are secured using industry-standard protocols to ensure encrypted data exchanges and protect against vulnerabilities. Regular security assessments and audits are conducted to monitor and maintain the security of integrations, safeguarding user data across interconnected platforms.
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

export default Security;
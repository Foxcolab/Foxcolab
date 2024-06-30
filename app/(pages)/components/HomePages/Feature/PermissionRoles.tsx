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
        title:"Role-based Access Control (RBAC)",
        description:"Foxcolab implements Role-based Access Control to assign specific permissions to users based on their roles (e.g., admin, manager, user). This ensures that each user has appropriate access levels tailored to their responsibilities"
    },
    {
        url:"",
        title:"Granular Permission Settings",
        description:"Administrators in Foxcolab can define granular permission settings for each role. This includes permissions such as creating new channels, managing polls and forms, moderating messages, and controlling who can perform specific actions within the application."
    },
    {
        url:"",
        title:"Customizable Role Definitions",
        description:"oxcolab allows administrators to customize role definitions according to organizational needs. This flexibility enables fine-tuning of roles to match specific workflows and operational requirements."
    },
    {
        url:"",
        title:"Hierarchical Role Structures",
        description:"The role management system in Foxcolab supports hierarchical structures where higher roles (e.g., admin) have broader permissions than lower roles (e.g., manager, user). This hierarchy ensures proper delegation of authority and responsibility."
    },
    {
        url:"",
        title:"Permissions for Specific Features",
        description:"Permissions in Foxcolab are feature-specific, allowing administrators to grant or restrict access to individual features like text channels, polls, forms, and other modules based on user roles. This prevents unauthorized access and enhances data security."
    },
    {
        url:"",
        title:"User-Friendly Interface for Role Management",
        description:"The role management interface in Foxcolab is intuitive and user-friendly. Administrators can easily assign roles, modify permissions, and manage user access without requiring extensive technical knowledge"
    },
    
]

function PermissionRoles() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Permission & Roles </div>
                <div className='hp_title'>Streamlined Permissions and Role Management</div>
                <div className='hp_subtitle'>Efficiently Control Access and Responsibilities Across Different Features and Modules
                 </div>
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
            <div className='mx-24 border-t'>
            
            <FAQ
            title='What is Role-based Access Control (RBAC) in Foxcolab?'
            answer={`<div>Role-based Access Control (RBAC) in Foxcolab is a method of managing access permissions where users are assigned specific roles (e.g., admin, manager, user) with predefined permissions. This ensures that users only have access to the features and data necessary for their roles.
              </div>`}
            
            />
            <FAQ
            title='How do I assign roles to users in Foxcolab?'
            answer={`<div>In Foxcolab, administrators can assign roles to users through the role management interface. They can select a user, choose the appropriate role (admin, administrative, manager, user), and customize permissions based on the user's responsibilities within the organization.
              </div>`}
            
            />

            <FAQ
            title=' Can I customize permissions for different roles in Foxcolab?'
            answer={`<div>Yes, Foxcolab allows administrators to customize permissions for each role. Administrators can define granular permissions such as creating channels, managing polls, forms, and messages, ensuring that permissions align with organizational workflows and security requirements.
              </div>`}
            
            />

            <FAQ
            title=' How does Foxcolab ensure security with role-based permissions?'
            answer={`<div>Foxcolab ensures security by implementing role-based permissions that restrict access based on user roles. This prevents unauthorized users from accessing sensitive data or performing actions beyond their designated responsibilities, enhancing overall data protection.
              </div>`}
            
            />
           <FAQ
            title='Can roles and permissions be changed or updated in Foxcolab?'
            answer={`<div>Yes, administrators in Foxcolab can change or update roles and permissions as needed. They have the flexibility to modify existing roles, create new roles, and adjust permissions to accommodate organizational changes or evolving business requirements.
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

export default PermissionRoles
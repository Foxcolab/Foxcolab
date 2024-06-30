"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import { TbSearch } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';


const items = [
  {
    icon:'📢',
    name:"Announcements",
    description:"Stay updated with the latest news and updates."
  },
  {
    icon:' 📘',
    name:"Foxcolab Basics",
    description:"Learn the essential features and functionalities of Foxcolab."
  },
  {
    icon:'⚙️',
    name:"Account Setting",
    description:"Manage your personal account preferences and security."
  },
  {
    icon:' 🛠️',
    name:"Server Setting",
    description:"Configure server options and permissions for optimal use."
  },
  {
    icon:' 🗂️',
    name:"Schema Setting",
    description:"Customize channels and structures to fit your workflow."
  },
  {
    icon:' 📱',
    name:"App & Activities",
    description:"Explore integrations and track your team’s activities."
  },
  {
    icon:' 💳',
    name:"Payments & Billing",
    description:"Handle subscriptions, payments, and billing information."
  },
  {
    icon:' 🛡️',
    name:"Safety",
    description:"Ensure the security and protection of your data and interactions."
  },
  {
    icon:' 🔒',
    name:"Privacy",
    description:"Understand and manage your privacy settings and data usage."
  },
  {
    icon:' 📝',
    name:"Known Issues",
    description:" Find information on current issues and troubleshooting tips."
  },
  {
    icon:'  🔑',
    name:"Roles & Permissions",
    description:"Define and manage user roles and access levels."
  },
  {
    icon:' 🆘',
    name:"Support & Troubleshooting",
    description:"Get help and resolve issues with Foxcolab."
  },

]

function HelpCentre() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    <HeaderFooter>
    <div className='bg-[#fbf7f1] py-[5rem]'>
        <div className='font-bold text-[3.5rem] text-center'>Hi, can we <span className=' text-[#E04D6C]'>help</span> you?</div>
        <div className="flex items-center justify-center">
        <div className=' rounded-md flex items-center h-[3.8rem] my-6 overflow-hidden w-[600px] shadow bg-white '>
          <span className='text-[2.0rem] flex-none text-gray-600 pl-4'><TbSearch /></span>
          <input type="text" className='border-none outline-none px-4 focus:border-0 bg-transparent h-full w-full text-[1.0rem] ' placeholder='Find anything (eg. Channel, Forums, Test, Canvas)' />
        </div>
        </div>
      </div>

    <div className='pt-[5rem] pb-[2rem] text-center'>
      <div className='text-[2rem] text-center font-semibold'>Need help? We've got your back.
      </div>
      <div className='text-[1.1rem] text-gray-600'>
      From account settings to permissions, find help for everything Discord
      </div>
    </div>

    <div className='grid_eight mx-[5rem] mb-[5rem]'>
      {
        items.map((item, i)=>(
          <div key={i} className='border rounded text-center p-4 shadow-md hover:bg-[#fbfffa] cursor-pointer'>
            <div className="text-[5rem]">{item.icon}</div>
            <div className='text-[1.1rem] font-semibold  py-2'>{item.name}</div>
            <div className=' flex items-center justify-center ' ><Separator className="w-[4rem] bg-[#E04D6C] text-[#E04D6C]" /></div>
            <div className='text-[0.9rem] text-gray-700 py-2'>{item.description}</div>
          </div>
        ))
      }
    </div>



    </HeaderFooter>
    
    </>
  )
}

export default HelpCentre
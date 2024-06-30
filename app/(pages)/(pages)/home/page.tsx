
import React from 'react'
import ServerSidebar from "@/app/(pages)/components/Sidebar/Server_Sidebar";
import { MdExplore } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { GiArtificialHive } from "react-icons/gi";
import { IoGameControllerOutline } from "react-icons/io5";
import DiscoverContent from "@/app/(pages)/components/DiscoverContent/DiscoverContent"
import { NextSeo } from 'next-seo';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServerCategory from '../../components/home/LoginHome/ServerCategory';
import HomeContainer from '../../components/home/container/HomeContainer';
import { User } from '@prisma/client';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import AdminServer from '@/lib/db/AdminServer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Foxcolab',
  // description: "Select your servers.",
}

async function HomePage() {

  const user = await myProfile();
  if(!user) redirect(`/`)


  let servers = await AdminServer();

  if(servers===undefined){
    servers = [];
  }
  // const servers = await db






  return (
    <>
    
  <div className='home_container d-flex '>
  <ServerSidebar home={true} user={user} />
  
  <HomeContainer servers={servers} />


  </div>







  {/* <div className='sidebg'>
    <div className='discover'>Discover</div>
    <div className="discover_item">
      {
        list.map((lis, i)=>(
          <button key={i} className={lis.title===title? 'active_discover':''} ><span>{lis.icon}</span>{lis.title}</button>
        ))
      }
    </div>
  </div>
  <div className="dicover_content">
    <DiscoverContent/>
  </div> */}
  {/* </div> */}
    
    
    
    </>
  )
}

export default HomePage
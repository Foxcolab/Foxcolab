
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


async function HomePage() {

  const user = await myProfile();





  // const servers = await db





  return (
    <>
    
  <div className='home_container d-flex '>
  <ServerSidebar home user={user} />
  
  <HomeContainer />


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
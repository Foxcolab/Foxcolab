// "use client"

import React from 'react'
import ServerSidebar from "@/app/(pages)/components/Sidebar/Server_Sidebar";
import { MdExplore } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { GiArtificialHive } from "react-icons/gi";
import { IoGameControllerOutline } from "react-icons/io5";
import DiscoverContent from "@/app/(pages)/components/DiscoverContent/DiscoverContent"
import { NextSeo } from 'next-seo';
function HomePage() {
  // const [category, setCategory] = useState('Home');
  const list = [
    {
      title:"Home",
      icon: <MdExplore/>
    },
    {
      title:"Science",
      icon:<GiMaterialsScience/>
    },
    {
      title:"Education",
      icon:<PiStudentFill/>
    },
    {
      title:"AI",
      icon: <GiArtificialHive/>
    },
    {
      title:"Gaming",
      icon: <IoGameControllerOutline/>
    }

  ]
  const title = "Home";

  return (
    <>
    {/* <NextSeo
      title="Home - Foxcolab"
      description="Login in Foxcolab using Email or Google Account or Apple Account."
    /> */}
  <div className='home_container d-flex '>
  <ServerSidebar/>
  <div className='sidebg'>
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
  </div>
  </div>
    
    
    
    </>
  )
}

export default HomePage
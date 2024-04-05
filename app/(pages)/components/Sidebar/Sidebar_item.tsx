"use client"
import React from 'react'
import Image from "next/image";
import { redirect, useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';
import { ActionTooltip } from '../tooolkit/Toolkit';
import { MdExplore } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Link from 'next/link';

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
  };
  
  export const Sidebar_item = ({
    id,
    imageUrl,
    name
  }: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
  
    const onClick = () => {
      router.push(`/servers/${id}`);
      // console.log("Clicked");
      
      // redirect(`/server/${id}`);
    }
  
    return (
      <ActionTooltip
        side="right"
        align="center"
        label={name}
      >
        <Link
          // onClick={onClick}
          href={`/servers/${id}`}
          className="group relative flex items-center" style={{zIndex:'10'}}
        >
          <div className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.id !== id && "group-hover:h-[20px]",
            params?.id === id ? "h-[36px]" : "h-[8px]"
          )} />
          <div className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden border",
            params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
          )}>
            <Image
              fill
              src={imageUrl}
              alt="Channel"
            />
           
          </div>
        </Link>
      </ActionTooltip>
    )
  }

export const EtcItem = ()=> {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const onClick2 =()=>{
    router.push(`/discover-server`);
  }
  const onClick3 =()=>{
    router.push(`/home`);
  }
  return (<>
  
  <ActionTooltip side="right" align="center" label="Explore discoverable servers"><button
          onClick={onClick2}
          className="group relative flex items-center explore"
        >
            <MdExplore/>
           
        </button></ActionTooltip>
  
        <ActionTooltip side="right" align="center" label="Search a server"><button
          onClick={onClick3}
          className="group relative flex items-center explore1"
        >
            <IoSearchSharp/>
           
        </button></ActionTooltip>


  </>)
}



export default Sidebar_item
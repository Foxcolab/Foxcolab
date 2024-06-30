"use client";
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { ActionTooltip } from '../../tooolkit/Toolkit'
import { BiSolidUserCircle } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import ProfileDialog from '../../profile/ProfileDialog';
import { User } from '@prisma/client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface Props {
  user:User
  home:boolean
}
function ServerPorfLog({user, home}:Props) {

  const { status} = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const LogoutHadler = async()=>{
    try {
      setLoading(true);
      if(status==="authenticated"){
        await signOut();
        router.push("/");
        setLoading(false);
        return;
      }else {
        const res = await axios.get(`/api/user/logout`);
        if(res.status===200){
        setLoading(false);
        router.push('/');
        }
      } 
    } catch (error) {
        setLoading(false);
        console.log(error)
    }
  }

  return (
    <>
    
    <div className={cn('flex flex-col gap-3 py-2 w-full justify-center items-center', home===true ? "": "mb-[3rem]")}>
    <Separator className="" />

      <ActionTooltip label='Profile' side='right' align='center'>
        <button className='text-[2rem]' onClick={()=>setOpen(true)}><BiSolidUserCircle/></button>
      </ActionTooltip>
      <ActionTooltip label='Logout' side='right' align='center'>
        {
          loading ? 
          <button className='text-[1.8rem]' style={{color:"var(--color2)"}} disabled><ReloadIcon className="h-7 w-7 animate-spin p-[0.1rem] rounded-full " style={{background:"var(--background2"}} fontSize={30} /> </button> :
          <button className='text-[1.8rem]' style={{color:"var(--color2)"}} onClick={(LogoutHadler)}><MdLogout/></button>
        }
      </ActionTooltip>
    </div>

    {
      open && <ProfileDialog open={open} setOpen={setOpen} user={user} />
    }
    
    
    </>
  )
}

export default ServerPorfLog
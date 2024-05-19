import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import {ModeToggle} from "../mode-toggle/Toggle";
import Link from 'next/link';
import { SocketBadge } from '../SocketBadge/SocketBagde';
import { NameDropDown } from './NameDropDown';
import { Member, Server, User } from '@prisma/client';
import { FaCircleUser } from 'react-icons/fa6';

interface Props {
  server:Server & {
    currentMember:Member & {
      user:User
    }
  }
}

function Header({server}:Props) {
  const member = server.currentMember;
  return (
    <>
 <div className="page_header">
  <div className='header_etc'>

  </div>
  <div className='page_header_content'>
 <div className="header_logo">
              Foxcolab
              {/* <NameDropDown server={server} /> */}
            </div>
        <div className="search">
            <input type="text" className="dark:bg-white" /> <button className="dark:text-black">Search</button>
        </div>
        <div className="etc">
            <div>
                
            </div>
            <Link href={'/profile'} className='prof_logo pr-5' style={{marginRight:"0.5rem"}}> <span ><FaCircleUser className='text-[1.1rem]' /></span> 
            {member.user.name} 

             </Link>
            <SocketBadge/>

    <button className="px-6 py-2"><ModeToggle/></button>

        </div>
    </div>
    </div>
    </>
  )
}

export default Header
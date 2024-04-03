import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import {ModeToggle} from "../mode-toggle/Toggle";
import Link from 'next/link';
import { SocketBadge } from '../SocketBadge/SocketBagde';
import { NameDropDown } from './NameDropDown';
import { Server } from '@prisma/client';

interface Props {
  server:Server
}

function Header({server}:Props) {
  return (
    <>
 <div className="flex-center-between">
    <div className="logo dark:text-[#a54040]">
              <NameDropDown server={server} />
            </div>
        <div className="search">
            <input type="text" className="dark:bg-white" /> <button className="dark:text-black">Search</button>
        </div>
        <div className="etc">
            <div>
                <div className="help_icon">
                <BiSolidHelpCircle />
                </div>
            </div>
            <Link href={'/profile'} className='prof_logo pr-5' style={{marginRight:"0.5rem"}}> <span><FaUserCircle/></span> Bikram 
            <SocketBadge/>
             </Link>
        </div>
    </div>
    
    </>
  )
}

export default Header
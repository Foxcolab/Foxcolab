import React from 'react'
import {FaUsers} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import {MdNoteAlt} from "react-icons/md";
import { GoDot } from "react-icons/go";
import { Separator } from '@/components/ui/separator';

function Conversation({otherName}:{otherName:string}) {
  return (
    <>
    
    {/* <div className="chat_section">
        <div className="channel_title">
        <div className='channel_name'><button className='usericon'><span className=''><FaCircleUser/></span> {otherName}<IoIosArrowDown/></button></div>
         </div>

        <div className="chat_profile">
        <div className='usersquare'><FaCircleUser/></div>
        <div className='cht_usr_nme'>{otherName} <GoDot/></div>
        </div>
        <div className='desc'>This conversation is just between you and  
    <b>@{otherName}</b>
. Take a look at their profile to learn more about them.</div>

    <button className='view_profile'>View Profile</button>

    <Separator className="my-4"  />
    
    
    </div> */}

<div className="channel_desc">
        <h1># {otherName}</h1>
        <p><span className='chann_cb'>
        This conversation is just between you and  <b>@{otherName}. Take a look at their profile to learn more about them.</b>
          </span>
         </p>
    <button className=' border rounded px-3 py-[0.3rem] text-sm text-semibold my-4'>View Profile</button>

        {/* <AddMember/> */}

    </div>

    
    </>
  )
}

export default Conversation
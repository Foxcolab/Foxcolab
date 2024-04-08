import React, { useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { Member } from '@prisma/client'
import { FaSquareThreads } from 'react-icons/fa6'
import { SiFiles } from 'react-icons/si'
import { MdGroups2, MdOutlineDataSaverOn } from 'react-icons/md'
import { BsFillSendFill } from 'react-icons/bs'
import { GoMention } from 'react-icons/go'
import { AiFillPushpin } from 'react-icons/ai'
import axios from 'axios'
import { useRouter } from 'next/navigation'
interface Props {
    setOpen: any
    currentMember:Member
    serverId:string
  }


function Navigation({setOpen, currentMember, serverId}:Props) {
  // const allCheck = navigations===undefined ? true : navigations?.length===0 ? true : false;
  // console.log(allCheck)
  const allNavs = ['Threads', 'Pinned Messages', 'Mentions & Reactions', 'Groups', 'Save for Later', 'Drafts & Sent', 'Files'];

  let navigations:string[] = [];
  if(currentMember.navigations===undefined || currentMember.navigations?.length==0){
    navigations = allNavs;
  }else {
    navigations = currentMember.navigations;
  }

  const [navs, setNavs] = useState(navigations);
  const router = useRouter();
  const NavigationHander =async()=>{
    try {
      let values = []
      const inputs = document.querySelectorAll('input:checked');
      for(let i=0; i<inputs.length; i++){
        values.push(inputs[i]?.value);
      }
      console.log(values);
      const res = await axios.put(`/api/server/update/navigation?serverId=${serverId}`, {navigations:values})
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
    
   <ItemHeader setOpen={setOpen} title='Navigations' />
   <div>
    <div className='nav_title'>
    Show these tabs in the navigation bar:

    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Threads"} defaultChecked={navs?.includes("Threads")} onChange={NavigationHander} /> 
      <label htmlFor=""><FaSquareThreads/> Threads</label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Pinned Messages"}  defaultChecked={navs.includes("Pinned Messages")} onChange={NavigationHander} /> 
      <label htmlFor=""><AiFillPushpin /> Pinned Messages </label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Mentions & Reactions"}  defaultChecked={navs.includes("Mentions & Reactions")} onChange={NavigationHander} /> 
      <label htmlFor=""><GoMention /> Mentions & Reactions</label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Groups"}  defaultChecked={navs.includes("Groups")} onChange={NavigationHander} /> 
      <label htmlFor=""><MdGroups2/> Groups</label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Save for Later"}  defaultChecked={navs.includes("Save for Later")} onChange={NavigationHander} /> 
      <label htmlFor=""><MdOutlineDataSaverOn/> Save for Later</label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Drafts & Sent"}  defaultChecked={navs.includes("Drafts & Sent")} onChange={NavigationHander} /> 
      <label htmlFor=""><BsFillSendFill/> Drafts & Sent</label>
    </div>
    <div className='navigation_checkbox'>
      <input type='checkbox' value={"Files"}  defaultChecked={navs.includes("Files")} onChange={NavigationHander} /> 
      <label htmlFor=""><SiFiles/> Files</label>
    </div>
   </div>
    
    </>
  )
}

export default Navigation
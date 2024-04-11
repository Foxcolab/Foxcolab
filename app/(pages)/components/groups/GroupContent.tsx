"use client";
import React, { useEffect, useState } from 'react'
import { Group, Member } from '@prisma/client';
import GroupSection from './GroupSection';
import MemberSection from './MemberSection';

interface Props{
    members:Member[],
    serverId:string,
    groups:Group[]
    hasPermission:boolean
}


function GroupContent({members, serverId, groups, hasPermission}:Props) {
    const [section, setSection] = useState(1);


    const onClick = (value:Number)=>{
        setSection(value);
        if(value===1){
            document.getElementById('group')?.classList.add('grp_active');
             document.getElementById('member')?.classList.remove('grp_active');
        }else {
            document.getElementById('member')?.classList.add('grp_active');
            document.getElementById('group')?.classList.remove('grp_active');
        }
        
    }
    // onClick(1);  //default value


  return (
    <>
          <div className='member_grp'>
        <button id='group' className='grp_active' value={"group"} onClick={()=>onClick(1)}>All Groups</button>
        <button id='member' value={"member"} onClick={()=>onClick(2)}>Members</button>
      </div>


        {
            section===1 ? <GroupSection members={members} serverId={serverId} groups={groups} hasPermission={hasPermission} /> : <MemberSection members={members} />
        }
    
    
    </>
  )
}

export default GroupContent
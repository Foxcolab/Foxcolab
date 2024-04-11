
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import SingleGroup from './SingleGroup';
import CreateGroup from './CreateGroup';
import { Group, Member } from '@prisma/client';

interface Props{
    members:Member[],
    serverId:string,
    groups:Group[]
    hasPermission:boolean
}
function GroupSection({members, serverId, groups, hasPermission}:Props) {
  return (
    <>
    
    <div className="canvas_container">
      <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for groups..' />
      </div>
      <hr style={{borderTop:"1px solid #6d6e6d"}} />
      <div className='cnvs_sc mt-3'>
        <div><b>All Groups</b></div>
        {
          hasPermission && <CreateGroup  members={members} serverId={serverId} />
        }
        
      </div>

      <div className="">
        {
         groups &&  groups.map((group)=>(
            <SingleGroup group={group} allMembers={members} serverId={serverId} key={group.id}/>
          ))
        }
      </div>




      </div>
    
    
    </>
  )
}

export default GroupSection
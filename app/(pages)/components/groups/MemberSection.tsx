import { Member } from '@prisma/client'
import React from 'react'
import { IoSearch } from 'react-icons/io5'
import LetterAvatar from '../UserAvatar/LetterAvatar'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { format } from 'date-fns'
import Avatar from 'react-avatar';
import { TbMessageCircle } from 'react-icons/tb'
import { useRouter } from 'next/navigation'

const DATE_FORMAT = "d MMM yyyy";


function MemberSection({members}:{members:Member[]}) {
  const router = useRouter();
  const SendMessage =(memberId:string, serverId:string)=>{
    router.push(`inbox/${memberId}`);
  }
  return (
    <>
    
    
    <div className="canvas_container">
      <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for peoples..' />
      </div>
      <hr style={{borderTop:"1px solid #6d6e6d"}} />
  
<div className='people_container'>
      {
      members.map((member,index)=>(

          <div className='people_card' key={index}>
            <div className='people_card_dp'>
            {member.user.profilePic===null  ? 
                   <div className="flex justify-between items-center">                  
                <div className="d-flex gap-1"> 
                {/* <LetterAvatar name={member?.user?.name} size={100} radius={5} />  */}
                <Avatar name={member?.user?.name} size='120' />
                </div>
                </div>
                 : 
                <div className="d-flex gap-1">
                <UserAvatar src={member?.user?.profilePic}  /> 
                </div>}


            </div>
            <div className='pc_footer'>
              <div className='pc_footer_name'>@{member?.user?.name}</div>
              <div className='joined_at'>Joined: {format(new Date(member.createdAt), DATE_FORMAT)}</div>
              <button className='pc_send_btn' onClick={()=>SendMessage(member.id, member.serverId)}><TbMessageCircle/> Message</button>
           
            </div>

          </div>
      ))
      }

</div>
   


      </div>
    
    </>
  )
}

export default MemberSection
import React from 'react'
import { Channel } from '@prisma/client';
import AddMember from '../Create/AddMember';
interface ChannelProps {
    channel: Channel;
}

function ChannelDescription({channel}:ChannelProps) {
    // console.log(channel.cre);

    const getDate =(yourDate:any)=> {
        yourDate = new Date(yourDate);
        const formattedDate = yourDate.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
        }).replace(/ /g, ' ');
        return formattedDate;
      }
    
  return (
    <>
    
    <div className="channel_desc">
        <h1># {channel.name}</h1>
        <p><span className='chann_cb'>@{channel.createdUser.name}</span> created this channel on {getDate(channel.createdAt)}.
        {/* {channel.description===''|| undefined||null ? <>` */}
        This is very begining of <b> #{channel.name} </b>
        <button className='add_Ds'>Add Description</button> 
         {/* `</>: ''}  */}
         </p>
        <AddMember/>

    </div>
    
    
    </>
  )
}

export default ChannelDescription
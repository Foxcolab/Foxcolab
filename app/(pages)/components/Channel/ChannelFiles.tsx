import { Message } from '@prisma/client'
import React from 'react'
import MsgFile from '../Chat/MsgFile';


interface ChannelProps {
    messages: Message[]
}

function ChannelFiles({messages}:ChannelProps) {

    const Urls = []
    let count=0;
    for(let i=0; i<messages.length; i++){
        for(let j=0; j<messages[i].fileUrl.length; j++){
            Urls.push(messages[i].fileUrl[j]);
            count++;
            if(count===5){
                break;
            }
        }
        if(count===5){
            break;
        }
    }

    console.log(Urls)



  return (
    <>
    
    {
        Urls.map((url, i)=>
        <div key={i} className='mt-4'>
            <MsgFile fileUrl={url} length={2} key={i} type='channelFile' />
        </div>
        
        )
    }
    <div className='see_more_file'>
    <button className=''>Show more</button>
    </div>
    
    </>
  )
}

export default ChannelFiles
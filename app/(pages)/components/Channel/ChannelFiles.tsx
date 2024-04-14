"use client";
import { Message, UploadedFile } from '@prisma/client'
import React from 'react'
import MsgFile from '../Chat/MsgFile';
import { useParams, useRouter } from 'next/navigation';


interface ChannelProps {
    messages: Message[]
}

function ChannelFiles({messages}:ChannelProps) {
    // console.log("Channel Files:", messages)
    let Urls:UploadedFile[] = []
    let Urls2:UploadedFile[] = []

    let count=0;
    for(let i=0; i<messages.length; i++){
        for(let j=0; j<messages[i].uploadedFiles.length; j++){
            if(count<=5){
                Urls.push(messages[i].uploadedFiles[j]);
            }
            Urls2.push(messages[i].uploadedFiles[j]);
            count++;
            if(count===6){
                break;
            }
        }
        if(count===6){
            break;
        }
    }


    const router = useRouter();
    const params = useParams();

    const onHrefHandler =()=>{
        router.push(`/servers/${params?.id}/files`);
    }



  return (
    <>
    
    {/* {
        Urls.map((url, i)=>
        <div key={i} className='mt-4'>
            <MsgFile fileUrl={url} length={2} key={i} type='channelFile' />
        </div>
        
        )
    } */}
<div className="about_channel_container">
    {
        Urls && 
        <MsgFile files={Urls} length={2} type="channelFile" />
    }



    {
        Urls2.length>5 &&  <div className='see_more_file'>
        <button className='' onClick={onHrefHandler}>Show more</button>
        </div>
    }
    </div>
    </>
  )
}

export default ChannelFiles
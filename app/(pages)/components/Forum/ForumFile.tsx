import { Video } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    fileUrl:string
    listStyle:string
    type:"image" | "video"

}
function ForumFile({fileUrl, listStyle, type}:Props) {
    
    
    
  return (
    <>
    
    {
           type==="image" ?
                <div className="forum_single_file">
                    <Image src={fileUrl} alt='content' width={100} height={100} />
                </div>
            : 
            
            type==="video"  ?
                <div className='forum_single_file'>
                    <video src={fileUrl}    />
                </div>
    
            :
            
            ''

    }
    
    
    
    </>
  )
}

export default ForumFile
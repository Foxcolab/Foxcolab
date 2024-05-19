import React from 'react'
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { cn } from '@/lib/utils';





export const SingleSection = ({content}) => {
    const path = usePathname();
    const router = useRouter();
  
  const onClick = () => {
    router.push(`${content.url}`)
  }

  return (
    <>
    
    <button href={`${content.url}`} className={cn('flex items-center gap-1' , path===content.url? ' activeBg':'')} onClick={onClick}>
    <span className='text-lg'>{content.icon} </span>  <span className='overflow_hidden'>{content.title} </span>  

    </button>
    
    
    </>
  )
}

export default SingleSection
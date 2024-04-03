import React from 'react'
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from 'next/link';





export const SingleSection = ({content}) => {
    const path = usePathname();
    const router = useRouter();
  
  const onClick = () => {
    router.push(`${content.url}`)
  }

  return (
    <>
    
    <button href={`${content.url}`} className={path===content.url? ' activeBg':''} onClick={onClick}>
    {content.icon} {content.title}

    </button>
    
    
    </>
  )
}

export default SingleSection
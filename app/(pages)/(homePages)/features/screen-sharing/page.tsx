import ScreenSharing from '@/app/(pages)/components/HomePages/Feature/ScreenSharing'
import { Metadata } from 'next'
import React from 'react'




export const metadata: Metadata = {
  title: 'Foxcolab Screen Sharing | Share your screen to your team members',
  description: 'Share your screen with your team members with foxcolab Screen Sharing.',
}
function ScreenSharingProducts() {
  
  return (
    <>
    <ScreenSharing />
   
   
   </>
  )
}

export default ScreenSharingProducts;
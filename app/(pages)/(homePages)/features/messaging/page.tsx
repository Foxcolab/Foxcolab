
import Messaging from '@/app/(pages)/components/HomePages/Feature/Messaging';
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Messaging | Communicate with your team members',
  description: 'Communicate with your team members with text message, voice message, video message, share files .',
}


function MessageFeatures() {
  

  return (
    <>
     <Messaging />
    </>
  )
}

export default MessageFeatures
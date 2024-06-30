import VideoMessage from '@/app/(pages)/components/HomePages/Feature/VideoMessage';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Video Message | Share video messages',
  description: 'Communicate using video message with Foxcolab Video Message.',
}


function VideoMessageFeatures() {
  
  return (
    <>
    
    <VideoMessage />
    
    
    </>
  )
}

export default VideoMessageFeatures;
import VoiceMessage from '@/app/(pages)/components/HomePages/Feature/VoiceMessage'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Video Message | Share video messages',
  description: 'Communicate using video message with Foxcolab Video Message.',
}



function VoiceMessageFeatures() {
  return (
    <>
    
    <VoiceMessage />
    
    </>
  )
}

export default VoiceMessageFeatures
import Channel from '@/app/(pages)/components/HomePages/Components/Channel';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Channels | communicate with team members',
  description: 'Foxcolab - where community meets',
}


function ChannelFeature() {
  return (
    <>
    
    <Channel />
    
    
    </>
  )
}

export default ChannelFeature;
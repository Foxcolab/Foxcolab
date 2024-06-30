"use client";
import Channel from '@/app/(pages)/components/HomePages/Components/Channel';
import HeaderFooter from '@/app/(pages)/components/HomePages/Components/HeaderFooter';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Channels | communicate with team members',
  description: 'Foxcolab - where community meets',
}

function ChannelProduct() {
  return (
    <>
    
    <Channel />
    
    
    </>
  )
}

export default ChannelProduct;
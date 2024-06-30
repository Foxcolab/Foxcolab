import WhatsNew from '@/app/(pages)/components/HomePages/Resource/WhatNew'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: "What's new | Foxcolab",
  description: "What's new | Foxcolab",
}

function WhatsNewPage() {
  return (
    <div><WhatsNew/></div>
  )
}

export default WhatsNewPage
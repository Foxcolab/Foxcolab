import Notion from '@/app/(pages)/components/HomePages/Compare/Notion'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Notion Alternative - Foxcolab',
    description: 'Notion vs Foxcolab.',
}

function page() {
  return (
    <div><Notion/></div>
  )
}

export default page
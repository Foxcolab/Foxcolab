import Monday from '@/app/(pages)/components/HomePages/Compare/Monday'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Monday.com Alternative - Foxcolab',
    description: 'Monday vs Foxcolab. Alternative of Monday.com',
}
function page() {
  return (
    <div><Monday /></div>
  )
}

export default page
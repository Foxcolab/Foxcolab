import Blog from '@/app/(pages)/components/HomePages/Resource/Blog'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: 'Blogs | Foxcolab',
    description: 'Blogs | Foxcolab.',
  }
  
function page() {
  return (
    <div><Blog /></div>
  )
}

export default page
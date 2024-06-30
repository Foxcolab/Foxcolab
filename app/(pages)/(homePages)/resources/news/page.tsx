import News from '@/app/(pages)/components/HomePages/Resource/News'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'News | Foxcolab',
  description: 'Know what world is telling about us.',
}

function NewsPage() {
  return (
    <div><News/></div>
  )
}

export default NewsPage;

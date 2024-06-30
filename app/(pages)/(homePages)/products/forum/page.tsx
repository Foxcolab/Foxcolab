import Forum from '@/app/(pages)/components/HomePages/Components/Forum'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Forums | Start discussion with any topic',
  description: 'Start discussion with a topic with Foxcolab Forums.',
}

function ForumFeature() {
  return (
    <div>

    <Forum />

    </div>
  )
}

export default ForumFeature
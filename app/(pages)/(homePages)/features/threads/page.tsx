import Thread from '@/app/(pages)/components/HomePages/Components/Thread'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Threads - Foxcolab',
  description: 'Start discussion around a single message.',
}

function ThreadsFeatures() {
  return (
    <>
    <Thread />
    </>
  )
}

export default ThreadsFeatures
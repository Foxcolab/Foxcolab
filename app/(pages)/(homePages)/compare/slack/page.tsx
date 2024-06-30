import Slack from '@/app/(pages)/components/HomePages/Compare/Slack'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Slack Alternative - Foxcolab',
    description: 'Slack vs Foxcolab.',
}

function page() {
  return (
    <div><Slack /></div>
  )
}

export default page
import Discord from '@/app/(pages)/components/HomePages/Compare/Discord'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Discord Alternative - Foxcolab',
    description: 'Discord vs Foxcolab.',
}

function page() {
  return (
    <div>
        <Discord />
    </div>
  )
}

export default page
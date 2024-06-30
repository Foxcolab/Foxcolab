import Evernote from '@/app/(pages)/components/HomePages/Compare/Evernote'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Evernote Alternative - Foxcolab',
    description: 'Evernote vs Foxcolab.',
}

function page() {
  return (
    <div><Evernote/></div>
  )
}

export default page
import Techable from '@/app/(pages)/components/HomePages/Compare/Techable'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Techable Alternative - Foxcolab',
    description: 'Techable vs Foxcolab. Alternative of Techable',
}

function page() {
  return (
    <div><Techable/></div>
  )
}

export default page
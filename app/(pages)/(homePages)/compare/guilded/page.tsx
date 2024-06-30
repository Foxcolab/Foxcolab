import Guilded from '@/app/(pages)/components/HomePages/Compare/Guilded'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Guilded Alternative - Foxcolab',
    description: 'Guilded vs Foxcolab. Alternative of Guilded.',
}
function page() {
  return (
    <div><Guilded/></div>
  )
}

export default page
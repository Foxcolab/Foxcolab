import Developer from '@/app/(pages)/components/HomePages/Resource/Developer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Developers | Foxcolab',
  description: 'Meet our developers.',
}

function Developers() {
  return (
    <div><Developer/></div>
  )
}

export default Developers
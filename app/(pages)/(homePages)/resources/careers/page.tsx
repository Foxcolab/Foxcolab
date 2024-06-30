import Career from '@/app/(pages)/components/HomePages/Resource/Career'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Career | Foxcolab',
  description: 'Be a member of world best community platform.',
}


function Careers() {
  return (
    <div>

      <Career />

    </div>
  )
}

export default Careers
import IT from '@/app/(pages)/components/HomePages/Solutions/IT'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'IT | Foxoclab',
  description: 'IT | Foxcolab',
}


function ITSolutions() {
  return (
    <div><IT /></div>
  )
}

export default ITSolutions
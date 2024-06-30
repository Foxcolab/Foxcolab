import Technology from '@/app/(pages)/components/HomePages/Solutions/Technology';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata= {
  title: 'Technology | Foxoclab',
  description: 'Technology | Foxcolab',
}

function TechnologySolutions() {
  return (
    <div><Technology /></div>
  )
}

export default TechnologySolutions;
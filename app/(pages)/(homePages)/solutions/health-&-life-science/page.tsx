import HealthLifeScience from '@/app/(pages)/components/HomePages/Solutions/HealthLifeScience'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Health & Life Science | Foxoclab',
  description: 'Health & Life Science | Foxcolab',
}

function HealthScienceSolutions() {
  return (
    <div><HealthLifeScience/></div>
  )
}

export default HealthScienceSolutions
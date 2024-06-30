import Marketing from '@/app/(pages)/components/HomePages/Solutions/Marketing'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata= {
  title: 'Marketing | Foxoclab',
  description: 'Marketing | Foxcolab',
}

function MarketingSolutions() {
  return (
    <div><Marketing /></div>
  )
}

export default MarketingSolutions
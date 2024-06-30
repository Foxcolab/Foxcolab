import Sales from '@/app/(pages)/components/HomePages/Solutions/Sales'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Sales | Foxoclab',
  description: 'Sales | Foxcolab',
}

function SalesSolutions() {
  return (
    <div><Sales /></div>
  )
}

export default SalesSolutions
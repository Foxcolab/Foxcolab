import Retail from '@/app/(pages)/components/HomePages/Solutions/Retail'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata= {
  title: 'Retails | Foxoclab',
  description: 'Retails | Foxcolab',
}

function RetailsSolutions() {
  return (
    <div><Retail /></div>
  )
}

export default RetailsSolutions
import FinancialService from '@/app/(pages)/components/HomePages/Solutions/FinancialService'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Financial Service | Foxoclab',
  description: 'Financial Service | Foxcolab',
}

function FinancialServiceSolutions() {
  return (
    <div><FinancialService /></div>
  )
}

export default FinancialServiceSolutions
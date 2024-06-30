import Reporting from '@/app/(pages)/components/HomePages/Product/Reporting'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Reporing & Analysis | Statistical representation of usaged',
  description: 'Statistical representation of data',
}
function ReportingProducts() {
  return (
    <div><Reporting /></div>
  )
}

export default ReportingProducts
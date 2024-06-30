import HelpCentre from '@/app/(pages)/components/HomePages/Resource/HelpCentre';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Help Center | Foxcolab',
  description: 'Know how to use Foxcolab',
}
function HelpCentrePage() {
  return (
    <div><HelpCentre/></div>
  )
}

export default HelpCentrePage;
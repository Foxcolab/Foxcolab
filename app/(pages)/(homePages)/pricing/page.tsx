import React from 'react'
import Pricing from '../../components/HomePages/Components/Pricing'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Pricing Plans - Foxcolab',
  description: 'Pricing Plans - Foxcolab',
}


function PricingPage() {
  return (
    <>
    
    <Pricing />
    
    </>
  )
}

export default PricingPage
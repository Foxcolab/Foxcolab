import React from 'react'
import { Metadata } from 'next';
import Security from '@/app/(pages)/components/HomePages/Feature/Security';


export const metadata: Metadata = {
  title: 'Foxcolab Bot | Work smarter with Foxcolab Bot',
  description: 'Save time and work smarter with Foxcolab Bot.',
}


function SecurityProducts() {
  return (
    <>
    
    <Security />
    
    </>
  )
}

export default SecurityProducts;
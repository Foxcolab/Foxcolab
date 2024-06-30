import PrivateServer from '@/app/(pages)/components/HomePages/Product/PrivateServer'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: 'Foxcolab Private Server | For Sensitive and secure communication with your organisation',
  description: 'For Sensitive and secure communication with your organisation',
}
function PrivateServerProduct() {
  return (
    <>
    
    <PrivateServer/>
    
    </>
  )
}

export default PrivateServerProduct
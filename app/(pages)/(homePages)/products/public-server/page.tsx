import PublicServer from '@/app/(pages)/components/HomePages/Product/PublicServer'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Private Server | For Sensitive and secure communication with your organisation',
  description: 'For Sensitive and secure communication with your organisation',
}

function PublicServerProduct() {
  return (
    <div><PublicServer/></div>
  )
}

export default PublicServerProduct
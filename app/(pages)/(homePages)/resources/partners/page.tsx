import Partners from '@/app/(pages)/components/HomePages/Resource/Partners';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Partners | Foxcolab',
  description: 'Meet our partners.',
}

function PartnersPage() {
  return (
    <div><Partners /></div>
  )
}

export default PartnersPage;
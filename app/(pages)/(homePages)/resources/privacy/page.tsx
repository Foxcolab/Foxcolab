import Privacy from '@/app/(pages)/components/HomePages/Resource/Privacy'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy | Foxcolab',
  description: 'Privacy | Foxcolab.',
}


function PrivacyPage() {

  return (
    <div><Privacy /></div>
  )
}

export default PrivacyPage
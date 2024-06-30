import Engineering from '@/app/(pages)/components/HomePages/Solutions/Engineering'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Engineering | Foxoclab',
  description: 'Engineering | Foxcolab',
}

function EngineeringSolutions() {
  return (
    <div><Engineering /></div>
  )
}

export default EngineeringSolutions
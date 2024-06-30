import React from 'react'
import Poll from '@/app/(pages)/components/HomePages/Components/Poll'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Foxcolab Poll | A new advancement of Poll',
  description: 'A new advancement way to create surveys with foxcolab Poll',
}
function PollFeature() {
  return (
    <div><Poll/></div>
  )
}

export default PollFeature
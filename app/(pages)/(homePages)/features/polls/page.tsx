import Poll from '@/app/(pages)/components/HomePages/Components/Poll'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Poll | A new advancement of Poll',
  description: 'A new advancement way to create surveys with foxcolab Poll',
}
function PollProducts() {
  return (
    <>
    
    <Poll />
    
    </>
  )
}

export default PollProducts
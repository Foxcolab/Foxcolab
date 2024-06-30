import Media from '@/app/(pages)/components/HomePages/Solutions/Media'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Media | Foxoclab',
  description: 'Media | Foxcolab',
}

function MediaSolutions() {
  return (
    <div><Media /></div>
  )
}

export default MediaSolutions
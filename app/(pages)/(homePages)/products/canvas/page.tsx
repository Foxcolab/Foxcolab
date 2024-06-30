import Canvas from '@/app/(pages)/components/HomePages/Components/Canvas'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Canvas - Foxcolab| Manage note with comments',
  description: 'Create notes with block base text editor and comments on that.',
}


function CanvasProduct() {
  return (
    <>
    
    <Canvas />

    </>
  )
}

export default CanvasProduct
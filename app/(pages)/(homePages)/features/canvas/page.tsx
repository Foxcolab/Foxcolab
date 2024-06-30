
import Canvas from '@/app/(pages)/components/HomePages/Components/Canvas';
import { Metadata } from 'next';

import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Canvas | Manage note with comments',
  description: 'Create notes with block base text editor and comments on that.',
}


function CanvasFeature() {
  

  return (
    <>
    
    <Canvas />
    
    
    </>
  )
}

export default CanvasFeature
import FileSharing from '@/app/(pages)/components/HomePages/Feature/FileSharing'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Files | Share and organized file',
  description: 'Share and organized file with foxcolab files.',
}


function FilesFeature() {
  return (
    <div>

      <FileSharing /> 
    </div>
  )
}

export default FilesFeature
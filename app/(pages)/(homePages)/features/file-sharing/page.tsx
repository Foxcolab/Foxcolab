import FileSharing from '@/app/(pages)/components/HomePages/Feature/FileSharing';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab File Sharing | Share various types of file with your team member',
  description: 'Share images, videoes, pdf, documents etc with your team member easily.',
}
function FileSharingFeatures() {
  
  return (
    <>
    
    <FileSharing />
    
    </>
  )
}

export default FileSharingFeatures
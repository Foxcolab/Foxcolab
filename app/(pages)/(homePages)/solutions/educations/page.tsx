import Education from '@/app/(pages)/components/HomePages/Solutions/Education'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Education | Foxoclab',
  description: 'Education | Foxcolab',
}
function EducationsSolutions() {
  return (
    <div><Education /></div>
  )
}

export default EducationsSolutions
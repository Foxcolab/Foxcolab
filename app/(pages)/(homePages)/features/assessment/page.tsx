import Assessment from '@/app/(pages)/components/HomePages/Components/Assessment'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Assessment | Conduct assessment using foxcolab',
  description: 'Conduct tests, employee assessment with foxcolab.',
}


function AssessmentFeature() {
  return (
    <>
    
    <Assessment />
    </>
  )
}

export default AssessmentFeature
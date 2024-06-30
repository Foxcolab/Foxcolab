import ProjectManager from '@/app/(pages)/components/HomePages/Solutions/ProjectManager'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata= {
  title: 'Project Management | Foxoclab',
  description: 'Project Management | Foxcolab',
}

function ProjectManagementSolutions() {
  return (
    <div><ProjectManager /></div>
  )
}

export default ProjectManagementSolutions
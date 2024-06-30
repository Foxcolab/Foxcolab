import AboutUs from '@/app/(pages)/components/HomePages/Resource/AboutUs'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'About Us | Foxcolab',
  description: 'Know about us.',
}

function About() {
  return (
    <>
    <AboutUs />
    
    </>
  )
}

export default About
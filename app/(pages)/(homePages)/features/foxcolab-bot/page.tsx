
import FoxcolabBot from '@/app/(pages)/components/HomePages/Feature/FoxcolabBot';
import { Metadata } from 'next';

import React, { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Bot | Work smarter with Foxcolab Bot',
  description: 'Save time and work smarter with Foxcolab Bot.',
}

function FoxcolabBotFeatures() {

 
  return (
    <>
    <FoxcolabBot />
    
    </>
  )
}

export default FoxcolabBotFeatures
import Docs from '@/app/(pages)/components/HomePages/Product/Docs'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Docs | Share documents with Foxcolab Docs',
  description: 'Manage and organized docs with Foxcolab Docs.',
}

function DocsProducts() {
  return (
    <div>

      <Docs />
    </div>
  )
}

export default DocsProducts
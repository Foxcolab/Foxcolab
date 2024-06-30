
import Search from '@/app/(pages)/components/HomePages/Feature/Search';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Search | Search something all over the server',
  description: 'Search to get easy access with Foxcolab search.',
}

function SearchProducts() {
  


  return (
    <>
    <Search />
    </>
  )
}

export default SearchProducts
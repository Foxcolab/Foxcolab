
import PermissionRoles from '@/app/(pages)/components/HomePages/Feature/PermissionRoles';
import { Metadata } from 'next'
import React, { useEffect } from 'react'




export const metadata: Metadata = {
  title: 'Foxcolab Permission and Roles | Manage accessibilty on resources',
  description: 'Make restriction on resources with Permission & Roles.',
}

function PermissionProducts() {



  return (
    <>
    
    <PermissionRoles />
    
    
    </>
  )
}

export default PermissionProducts
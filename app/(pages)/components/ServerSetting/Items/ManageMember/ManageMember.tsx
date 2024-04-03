import React from 'react'
import ItemHeader from '../../Components/ItemHeader'


interface Props {
    setOpen: any
  }
function ManageMember({setOpen}:Props) {
  return (
    <>
    
    <ItemHeader setOpen={setOpen} title='Manage Members' />
    
    </>
  )
}

export default ManageMember
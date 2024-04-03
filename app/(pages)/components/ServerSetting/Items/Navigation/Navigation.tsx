import React from 'react'
import ItemHeader from '../../Components/ItemHeader'
interface Props {
    setOpen: any
  }
function Navigation({setOpen}:Props) {
  return (
    <>
    
   <ItemHeader setOpen={setOpen} title='Navigations' />
    
    </>
  )
}

export default Navigation
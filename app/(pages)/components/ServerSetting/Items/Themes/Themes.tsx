import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
    setOpen: any
  }
function Themes({setOpen}:Props) {
  return (
    <>
    
   <ItemHeader setOpen={setOpen} title='Themes' />
    
    </>
  )
}

export default Themes
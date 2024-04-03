import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
  setOpen: any
}
function Analytics({setOpen}: Props) {
  return (
    <>
    
    <ItemHeader setOpen={setOpen} title="Server Analystics" />
    
    
    </>
  )
}

export default Analytics
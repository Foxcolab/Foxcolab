import React from 'react'
import ItemHeader from '../../Components/ItemHeader'
interface Props {
    setOpen: any
    
  }
function Notification({setOpen}:Props) {
  return (
   <>
   <ItemHeader setOpen={setOpen} title='Notifications' />
   
   </>
  )
}

export default Notification
import React from 'react'

interface Props {
  icon:any,
  name:String
}


function SectionHeader({icon, name}:Props) {

  
  return (
    <>
    <div className='secHeader'>
      {icon} {name}
    </div>

    </>
  )
}

export default SectionHeader
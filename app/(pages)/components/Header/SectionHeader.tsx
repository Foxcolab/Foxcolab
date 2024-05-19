import React from 'react'

interface Props {
  icon:any,
  name:String
}


function SectionHeader({icon, name}:Props) {

  
  return (
    <>
    <div className='chat_section items-center'>
      <div className='channel_title flex items-center text-lg gap-2 font-semibold'><span>{icon}</span> {name}</div>
    </div>

    </>
  )
}

export default SectionHeader
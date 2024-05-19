import Image from 'next/image'
import React from 'react'
import ChannelUiPic from "../Assests/Laptop_Screen.png"


function SecondaryHero() {
  return (
    <>
    
    <div className='secondary_hero'>
        <div className='channel_ui_container'>
        <Image src={ChannelUiPic} height={100} className='secondary_hero_image' width={100} alt='' unoptimized />
        </div>
    </div>

    
    
    </>
  )
}

export default SecondaryHero
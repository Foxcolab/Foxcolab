import Image from 'next/image'
import React from 'react'

function AuthRight() {
  return (
    <>
    
    <div className="auth_image">
      
          <div className='auth_image_container'>
            <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Multi+Purpose_Page.png'} alt='laptop_image' width={100} height={100} unoptimized  />
            </div>
          <div className=' auth_right_text_box'>
          <div className="text-[1.5rem] font-bold flex justify-center text-white primary_auth_text">
            Everything your team needs, all in one place
          </div>
          <div className='flex justify-center items-center font-semibold text-gray-200 secondary_auth_text'>Empower seamless teamwork with our comprehensive collaboration suite.</div>
          </div>
        </div>
    </>
  )
}

export default AuthRight
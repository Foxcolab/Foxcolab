import { signIn } from 'next-auth/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

function OtherSignin() {
  return (
    <>

    <div className="other_signin">
          <button onClick={()=>{signIn("google")}}><FcGoogle/> Continue with Google</button>
        <button onClick={()=>signIn("github")}><FaGithub/> Continue with Github</button>
          </div>
    
    
    
    </>
  )
}

export default OtherSignin
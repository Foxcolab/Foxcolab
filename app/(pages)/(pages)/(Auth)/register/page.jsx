"use client";
import React, { useState } from 'react'
import {BsApple} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {signIn} from "next-auth/react";

function Register() {
  const [username, setUsername] = useState("bikramshit");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const SubmitHandler = async()=>{    
    try {
      setLoading(true);
      const res =await axios.post('/api/register', { username, email, password});
      console.log(res);
      if(res.status===200){
        router.push('/home')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      
    }    
  }
  
  const googleHandler =()=>{

    window.open(`/api/v1/auth/google`, "_self")

  }
  const appleHandler =()=> {
    window.open(`/api/v1/auth/apple`, "_self")

  }
  return (
    <>
       {
    loading ? <h1>Loading...</h1> :     <div className="main_container">
    <div className="login_card">
      <div className="login_heading">
        Sign Up
      </div>
      <div className='light_text'>We suggest using the <b>email address you use at work</b>.</div>
     <div className="input_sec">
      
      <div className="login_section">
        <label htmlFor="Username">Username</label>
        <input type="text" onChange={(e=>setUsername(e.target.value))} />
      </div>
      <div className="login_section">
        <label htmlFor="Username">Email</label>
        <input type="email" onChange={(e=>setEmail(e.target.value))}/>
      </div>
      <div className="login_section">
        <label htmlFor="Username">Password</label>
        <input type="password" onChange={(e=>setPassword(e.target.value))} />
      </div>
      <div className="login_section">
        <button onClick={SubmitHandler}>Continue</button>
      </div>
      <hr class="hr-text" data-content="OR" />
      <div className="other_signin">
        <button onClick={()=>signIn("google")}><FcGoogle/> Continue with Google</button>
        <button onClick={appleHandler}><BsApple/> Continue with Apple</button>
      </div>
      <div className="log_footer">
        <div>Already a user?</div>
        <Link href={'/login'}>Login to create server </Link>
      </div>
    </div>
    </div>
  </div>
   }
    
    </>
  )
}

export default Register
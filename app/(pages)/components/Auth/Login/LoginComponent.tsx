"use client";
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import OtherSignin from './OtherSignin';
import Loader from '../../Loaders/Loader';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter();
  const {data:session, status} = useSession();

    if(status==="authenticated"){
        router.push("/home");
      }


  const SubmitHandler = async()=>{    
    try {
      setLoading(true);
      console.log("Asdf");
      const res =await axios.post('/api/login', { email, password});
      console.log(res);
      if(res.status===200){
        router.push('/home')
        setLoading(false)

      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      
    }    
  }

  return (
    <>
    
     <div className="main_container">
        <div className="login_card">
          <div className="login_heading">
            Sign in
          </div>
          <div className='light_text'>We suggest using the <b>email address you use at work</b>.</div>
         <div className="input_sec">
          <div className="login_section">
            <label htmlFor="Username">Username</label>
            <input type="text" onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="login_section">
            <label htmlFor="Username">Password</label>
            <input type="password" onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="login_section">
            {
                loading ? <Loader /> :<button onClick={SubmitHandler}>Continue</button>
            }
            
          </div>
          <hr className="hr-text" data-content="OR" />
          <OtherSignin />
          <div className="log_footer">
            <div>Not a user?</div>
            <Link href={'/register'}>Register to create a server </Link>
          </div>
        </div>
        </div>
      </div> 
    
    
    
    </>
  )
}

export default LoginComponent
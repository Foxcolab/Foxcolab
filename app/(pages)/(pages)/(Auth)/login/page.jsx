"use client"
import {NextSeo} from "next-seo"
import React, { useState } from 'react'
import {FcGoogle} from "react-icons/fc";
import {BsApple} from "react-icons/bs";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import RoundLoader from '../../../components/Loaders/RoundLoader/RoundLoader';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
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
     <NextSeo
      title="Login - Foxcolab"
      description="Login in Foxcolab using Email or Google Account or Apple Account."
    />
    {
        loading ? <RoundLoader/> :     <div className="main_container">
        <div className="login_card">
          <div>Foxcolab</div>
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
            <button onClick={SubmitHandler}>Continue</button>
          </div>
          <hr class="hr-text" data-content="OR" />
          <div className="other_signin">
            <button><FcGoogle/> Continue with Google</button>
            <button><BsApple/> Continue with Apple</button>
          </div>
          <div className="log_footer">
            <div>Not a user?</div>
            <Link href={'/register'}>Register to create a server </Link>
          </div>
        </div>
        </div>
      </div> 
    }
    </>
  )
}

export default Login
"use client";
import React, { useState } from 'react'
import {BsApple} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {signIn, useSession} from "next-auth/react";
import Loader from "../../../components/Loaders/Loader"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FaGithub } from 'react-icons/fa';
import OtherSignin from '../Login/OtherSignin';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {data:session, status} = useSession();
  console.log(session, status);
  const { toast } = useToast()
  const router = useRouter();
  if(status==="authenticated"){
    router.push("/home");
  }
  const SubmitHandler = async()=>{    
    try {
      setLoading(true);
      const res =await axios.post('/api/register', { name:username, email, password});
      console.log(res);
      if(res.status===200){
        router.push(`confirmMail/token/${res?.data?.userId}`);
        setLoading(false)
      }
    } catch (error:any) {
      setLoading(false)
      console.log(error.response.data.error);
      toast({
        title:error.response.data.error,
       
      })

      
    }    
  }

  const GithubHandler =()=> {
    signIn("github", {callbackUrl:'localhost:3000/home'})

  }

  return (
    <>
    
    <div className="main_container">
    <div className="login_card">
      <div className="login_heading">
        Sign Up
      </div>
      <div className='light_text'>We suggest using the <b>email address you use at work</b>.</div>
     <div className="input_sec">
      
      <div className="login_section">
        <label htmlFor="Username">Display Name</label>
        <input type="text" className='mt-1' onChange={(e=>setUsername(e.target.value))} />
      </div>
      <div className="login_section">
        <label htmlFor="Username">Email</label>
        <input type="email" className='mt-1' onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="login_section">
        <label htmlFor="Username">Password</label>
        <input type="password" className='mt-1' onChange={(e=>setPassword(e.target.value))} />
      </div>
      <div className="login_section">
        {
          loading ? <Loader/> :    <button onClick={SubmitHandler}>Continue</button>
        }
     
      </div>
      <hr className="hr-text" data-content="OR" />
      <OtherSignin />
      <div className="log_footer">
        <div>Already a user?</div>
        <Link href={'/login'}>Login to create server </Link>
      </div>
    </div>
    </div>
  </div>
    
    
    </>
  )
}

export default RegisterComponent
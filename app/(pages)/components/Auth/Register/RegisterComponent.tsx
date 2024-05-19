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
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import AuthRight from '../Login/AuthRight';
import { TfiEmail } from 'react-icons/tfi';
import { RiLockPasswordFill } from 'react-icons/ri';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const {data:session, status} = useSession();
  console.log(session, status);
  const { toast } = useToast()
  const router = useRouter();
  if(status==="authenticated"){
    router.push("/home");
  }
  const CheckEmail = (email:string)=>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const isValid = emailPattern.test(email); 
    return isValid;
  }
  const SubmitHandler = async()=>{    
    try {
      if(CheckEmail(email)===false){
        toast({
          title:"Please enter a valid email",        
        })
        return;
      }
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

  

  return (
    <>
    
    <div className="main_container">
        
        <div className="auth_card">
          <div className="login_card">
          <div className="login_heading">
            Create Account
          </div>
          <div className='light_text'>We suggest using the <b>email address you use at work</b>.</div>
         <div className="input_sec">
          <div className="login_section">
            <label htmlFor="Username">Full Name <sup className='text-red-500'>*</sup> </label>
            <div className='auth_input_box'>
              <span><TfiEmail/></span>
              <input type="text" onChange={e=>setUsername(e.target.value)} placeholder='Enter your full name' />
            </div>
            
          </div>
          <div className="login_section">
            <label htmlFor="Username">Email Address <sup className='text-red-500'>*</sup> </label>
            <div className='auth_input_box'>
              <span><TfiEmail/></span>
              <input type="text" onChange={e=>setEmail(e.target.value)} placeholder='Enter your email' />
            </div>
            
          </div>
          <div className="login_section">
            <label htmlFor="Username">Password <sup className='text-red-500'>*</sup></label>
            <div className="auth_input_box">
              <span><RiLockPasswordFill/></span>
              {
                visible ? 
              <input type="text" placeholder='Enter password' onChange={e=>setPassword(e.target.value)} value={password} /> :
              <input type="password" placeholder='Enter password' onChange={e=>setPassword(e.target.value)} value={password} />

            }
              <button onClick={()=>setVisible(!visible)}>{visible ? <AiOutlineEye/>: <AiOutlineEyeInvisible/>   }  </button>
            </div>
          </div>
          
          <div className="login_section">
            
             <button className='auth_submit' onClick={SubmitHandler} disabled={loading}> {loading ? <span className='flex items-center justify-center'><ReloadIcon className='mr-2 h-4 w-4 animate-spin '/> Signing</span> : <span>Sign in</span>}  </button>
            
            
          </div>
          <hr className="hr-text" data-content="OR" />
          <OtherSignin />
          <div className="log_footer">
            <div>Already have an account?  <Link href={'/login'} className='text-[#E04D6C] hover:underline font-semibold'>Signin</Link>  </div>
            <div>Sign in to communicate with your teams. </div>
          </div>
        </div>
        </div>

        </div>
        <AuthRight/>
      </div> 
    
    
    </>
  )
}

export default RegisterComponent
"use client";
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import OtherSignin from '../Login/OtherSignin';
import Loader from '../../Loaders/Loader';
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image';
import AuthRight from '../Login/AuthRight';
import {TfiEmail} from "react-icons/tfi"
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ReloadIcon } from '@radix-ui/react-icons';
function ForgetComponents() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible,setVisible] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
  const {data:session, status} = useSession();

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
          title:"Please enter a valid email address",        
        })
        return;
      }
      setLoading(true);
      const res =await axios.post('/api/forget-password', { email});
      console.log(res);
      if(res.status===200){
        router.push(`./forget-password/verify/${res?.data?.userId}`);
        setLoading(false)

      }
    } catch (error:any) {
      console.log(error);
      setLoading(false);
      console.log(error.response.data.error)
      toast({
        title:`${error.response.data.error}`,
        
      })
    }    
  }
  return (
    <>
    
    <div className="main_container">
        
        <div className="auth_card">
          <div className="login_card">
          <div className="login_heading">
            Forget Password
          </div>
          <div className='light_text'>Enter your email id which you are registered.</div>
         <div className="input_sec">
          <div className="login_section">
            <label htmlFor="Username">Email Address <sup className='text-red-500'>*</sup> </label>
            <div className='auth_input_box'>
              <span><TfiEmail/></span>
              <input type="email" onChange={e=>setEmail(e.target.value)} placeholder='Enter your email' />
            </div>
            
          </div>
          
          <div className="login_section">
            
             <button className='auth_submit' onClick={SubmitHandler} disabled={loading}> {loading ? <span className='flex items-center justify-center'><ReloadIcon className='mr-2 h-4 w-4 animate-spin '/> Wait</span> : <span>Continue</span>}  </button>
            
            
          </div>
          <hr className="hr-text" data-content="OR" />
          <OtherSignin />
          <div className="log_footer">
            <div>Don't have any account?  <Link href={'/register'} className='text-[#E04D6C] hover:underline font-semibold'>Signup</Link>  </div>
            <div>Signup now to create a new workspace. </div>
          </div>
        </div>
        </div>

        </div>
        <AuthRight/>
      </div> 
    
    
    </>
  )
}

export default ForgetComponents
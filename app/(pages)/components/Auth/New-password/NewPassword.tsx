"use client";
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible,setVisible] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast()
  const {data:session, status} = useSession();

    if(status==="authenticated"){
        router.push("/home");
      }

  const SubmitHandler = async()=>{    
    try {
      if(password!==confirmPassword){
        toast({
          title:"Password does not match! Please enter correctly.",        
        })
        return;
      }
      setLoading(true);
      const res =await axios.post('/api/new-password', {userId:params?.userId, password});
      console.log(res);
      if(res.status===200){
        router.push(`/home`);
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
            Enter new password
          </div>
          <div className='light_text'>Enter your new strong password.</div>
         <div className="input_sec">
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
            <label htmlFor="Username">Confirm Password <sup className='text-red-500'>*</sup></label>
            <div className="auth_input_box">
              <span><RiLockPasswordFill/></span>
              {
                visible2 ? 
              <input type="text" placeholder='Enter confirm password' onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} /> :
              <input type="password" placeholder='Enter confirm password' onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} />

            }
              <button onClick={()=>setVisible2(!visible2)}>{visible2 ? <AiOutlineEye/>: <AiOutlineEyeInvisible/>   }  </button>
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

export default NewPassword
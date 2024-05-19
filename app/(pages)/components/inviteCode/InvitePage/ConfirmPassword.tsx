"use client";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const {toast} = useToast();
    const HandlerSubmit=async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/check-password`, {password, email:decodeURIComponent(params?.emailId)});
            console.log(res);
            if(res.status===200){
                router.push(`/invite/${params?.name}/${params?.inviteCode}/${decodeURIComponent(params?.emailId)}/verify`);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast({
                title:`${error?.response?.data?.error}`
              })
      
        }
    }
  return (
    <>
    <div className='normal_txt'>
        Enter your foxcolab password
          <div className="three_link">
            {/* <div className='input_div'>
                <label htmlFor="">Full Name</label>
                <input type="text" placeholder='Your Name' onChange={e=>setName(e.target.value)} />
            </div> */}
            <div className='input_div'>
                <label htmlFor="">Password</label>
                <input placeholder='Enter your password' type='password' onChange={e=>setPassword(e.target.value)} />
            </div>
            {/* <div className='input_div'>
                <label htmlFor="">Password</label>
                <input placeholder='password' type='password' onChange={e=>setPassword(e.target.value)} />
            </div> */}
            
          {
            loading ? <Button disabled className='cont_mail'>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <button className='cont_mail text-white' onClick={HandlerSubmit}>Continue</button>
          }  
            
            </div>
          </div>
    
    
    </>
  )
}

export default ConfirmPassword
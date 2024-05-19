"use client";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    serverName:string
    emailId:string
    inviteCode:string
}

function NewUser({serverName, emailId, inviteCode}:Props) {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const {toast} = useToast();
    const HandlerSubmit=async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/new-user`, {password, email:decodeURIComponent(emailId), name});
            console.log(res);
            if(res.status===200){
                router.push(`/invite/${serverName}/${inviteCode}/${decodeURIComponent(emailId)}/verify`);
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
            <div className='input_div'>
                <label htmlFor="name">Full Name</label>
                <input type="text" placeholder='Your Name' onChange={e=>setName(e.target.value)} />
            </div>
            <div className='input_div'>
                <label htmlFor="password">Password</label>
                <input placeholder='Enter your password' type='password' onChange={e=>setPassword(e.target.value)} />
            </div>
            
            
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

export default NewUser
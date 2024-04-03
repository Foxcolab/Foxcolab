"use client";
import React, { useState } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useRouter } from 'next/navigation';
function ContinueEmail() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const HandlerSubmit =async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/sendOtp`, {name, email, password});
            
            if(res.status==200){
                await router.push(`./${email}/verify`);
                // browserhs
                setLoading(false);

            }
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
    
    <div className='normal_txt'>
          We suggest using <b>the email address that you use for work</b>.
          <div className="three_link">
            <div className='input_div'>
                <label htmlFor="">Full Name</label>
                <input type="text" placeholder='Your Name' onChange={e=>setName(e.target.value)} />
            </div>
            <div className='input_div'>
                <label htmlFor="">Email</label>
                <input placeholder='name@work-email.com' type='email' onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className='input_div'>
                <label htmlFor="">Password</label>
                <input placeholder='password' type='password' onChange={e=>setPassword(e.target.value)} />
            </div>
            
          {
            loading ? <Button disabled className='cont_mail'>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <button className='cont_mail' onClick={HandlerSubmit}>Continue with Email</button>
          }  
            
            </div>
          </div>
    
    </>
  )
}

export default ContinueEmail
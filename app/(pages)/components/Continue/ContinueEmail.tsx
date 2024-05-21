"use client";
import React, { useState } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
function ContinueEmail() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const router = useRouter();
    const SendOtpHandler =async()=>{
      try {
        const res = await axios.post(`/api/sendOtp/Resend`, {email});
        if(res.status===200){
          router.push(`./${email}/verify`);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const HandlerSubmit =async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/find-user`, {email});
            console.log(res);
            if(res.status===200){
                // await router.push(`./${email}/verify`);
                console.log(res.data.isFound, res.data.isSpecial);
                if(res.data.isFound===true && res.data.isSpecial===true){
                  console.log("Email/Verify");
                  const res = await axios.post(`/api/sendOtp/Resend`, {email});
                  console.log("Otp Send");
                  router.push(`./${email}/verify`);
                   return;
                }
                if(res.data.isFound===true && res.data.isSpecial===false){
                  console.log("Email/emailId/Verify");
                  // const res = await axios.post(`/api/sendOtp/Resend`, {email});
                  router.push(`./email/${email}/verify`);
                  return;
                }else {
                  console.log("Email/emailId/New");
                  router.push(`./email/${email}/new`); 
                  return;
                }
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
            {/* <div className='input_div'>
                <label htmlFor="">Full Name</label>
                <input type="text" placeholder='Your Name' onChange={e=>setName(e.target.value)} />
            </div> */}
            <div className='input_div'>
                <label htmlFor="">Email</label>
                <input placeholder='name@work-email.com' type='email' onChange={e=>setEmail(e.target.value)} />
            </div>
            {/* <div className='input_div'>
                <label htmlFor="">Password</label>
                <input placeholder='password' type='password' onChange={e=>setPassword(e.target.value)} />
            </div> */}
            
          {
            loading ? <Button disabled className='cont_mail'>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <button className='cont_mail text-white' onClick={HandlerSubmit}>Continue with Email</button>
          }  
            
            </div>
          </div>
    
    </>
  )
}

export default ContinueEmail
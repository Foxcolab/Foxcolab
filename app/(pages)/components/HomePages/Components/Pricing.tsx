"use client";
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react'
import { GoDotFill } from 'react-icons/go';
import FAQ from '../Feature/FAQ/FAQ';
import Link from 'next/link';
import HeaderFooter from './HeaderFooter';
import NavBar from '../../LandingPage/Components/Navbar/NavBar';
import Footer from '../../LandingPage/Components/Footer/Footer';

function Pricing() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

  return (
    <>
    
    
    <div className="context">
    <NavBar />

        <div className=' text-center flex justify-center items-center h-full '>
          <div>
          <div className='text-[5rem] leading-[5rem] font-bold  pt-[8rem] pb-6'>
          We are in <span className='text-[#E04D6C]'>Beta</span>, <br />
          So it's <span className='text-[#E04D6C]'>free</span> for now
          </div>
          <div className='text-[1.2rem] my-4 text-center flex items-center justify-center w-full font-semibold text-gray-500'>
          We’re excited to offer Foxcolab for free during our beta phase! Take advantage <br /> of all our features at no cost while we fine-tune the platform based on your feedback.
        </div>

          <div className=' border rounded-lg shadow-xl mb-20 pb-6 mt-16 bg-gray-50 text-center z-[-10]'>
            <div className="text-[2rem] font-semibold mt-8 text-[#E04D6C]">Here's how we see our future pricing</div>
            <div className='text-[1.2rem] ext-gray-500 mt-4 mb-8' >As we transition out of beta, we will introduce subscription-based pricing to ensure <br /> continued development and support. Here’s a sneak peek at what to expect</div>
            <div className="grid_three gap-6 rounded mb-8 mx-8">
              <div className='p-4 border text-left rounded-lg shadow-lg bg-white'>
                <div className='text-[1.5rem] font-semibold text-center mb-4 text-[#E04D6C]'>Free Tier</div>
                <div className='font-semibold text-[1.1rem]'>Cost: $0/Month</div>
                <div className='my-2 font-semibold text-[1.1rem]'>Features</div>
                <div className='text-gray-600'>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Basic Text and Voice</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Limited file sharing</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Access to public channels</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Community support</div>
                </div>
              </div>
              <div className='p-4 border text-left rounded-lg shadow-lg bg-white'>
                <div className='text-[1.5rem] font-semibold text-center mb-4 text-[#E04D6C]'>Pro Tier</div>
                <div className='font-semibold text-[1.1rem]'>Cost: $10/Month per user</div>
                <div className='my-2 font-semibold text-[1.1rem]'>Features</div>
                <div className='text-gray-600'>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Everything in Free, plus:</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Unlimited messaging and file sharing</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Video messaging and screen sharing</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Customizable forms and polls</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Access to private channels</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Priority support</div>
                </div>
              </div>
              <div className='p-4 border text-left rounded-lg shadow-lg  bg-white'>
                <div className='text-[1.5rem] font-semibold text-center mb-4 text-[#E04D6C]'>Business Tier</div>
                <div className='font-semibold text-[1.1rem]'>Cost: $25/Month per user</div>
                <div className='my-2 font-semibold text-[1.1rem]'>Features</div>
                <div className='text-gray-600'>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Everything in Pro, plus:</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Advanced project management tools</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Automation and third-party integrations</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Enhanced security features</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> Dedicated account manager</div>
                  <div className='flex items-center gap-2 pt-1'><GoDotFill/> 24/7 premium support</div>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-8 mb-12">
              <div className='text-[3rem] mx-[8rem] font-semibold'>The <span className='text-[#E04D6C]'>world</span> need better seamless <br /> <span className='text-[#E04D6C]'>team collaboration</span> platform</div>
              <div className='text-center my-4'>
              <Link href={'/register'} className='bg-[#E04D6C] px-4 py-[0.6rem] text-white text-[1.2rem] font-semibold rounded'>Let's make it together!</Link>
              </div>
          </div>


        <hr />
        <div className='mb-20'>
          <div className='text-[2rem] font-semibold text-left my-4' >FAQs</div>

          
          <div>
            <FAQ
            title=' What features are available in the beta version?'
            answer={`<div> During the beta phase, you have access to all of Foxcolab’s features, including text and voice messaging, file sharing, and project management tools.</div>`}
            />
             <FAQ
            title="When will the subscription plans be available?"
            answer={`<div> We plan to launch our subscription plans after the beta phase. Stay tuned for updates!</div>`}
            />
             <FAQ
            title="How will existing users transition to the subscription plans?"
            answer={`<div> We’ll provide detailed instructions and support to help existing users transition smoothly to the subscription plans.</div>`}
            />
             <FAQ
            title="Will there be discounts for annual subscriptions?"
            answer={`<div> Yes, we plan to offer discounts for annual subscriptions. Details will be announced closer to the launch of our subscription plans.

            </div>`}
            />
             <FAQ
            title="Can I switch plans at any time?"
            answer={`<div> Yes, you’ll be able to upgrade or downgrade your plan at any time based on your needs.</div>`}
            />
             <FAQ
            title="How do I get support during the beta phase?"
            answer={`<div> During the beta phase, you can access community support through our public channels. Priority and premium support will be available with our future subscription plans.</div>`}
            />
          </div>
        </div>



          </div>
        </div>
        

<Footer />

</div>


<div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
   
    
    
    
    
    
    </>
  )
}

export default Pricing
"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Search() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
<HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='my-8'>
                <div className='uppercase font-semibold text-[0.9rem]'>Permission & Roles </div>
                <div className='text-[2.8rem] font-bold leading-[2.5rem]'>Discover a new way of working</div>
                <div className='text-[1.2rem] mt-3'>Bring the right people and information together in <br /> channels. Share ideas, make decisions and move work <br /> forward with a common purpose and place.</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>How to share files?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Organise your work</div>
                <div className='mx-[6rem] text-[1.1rem]'>Channels bring order and clarity to work – you can create them for every project, topic or team. When there’s a channel for everything, you can focus on the conversations and work that matters most to you.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Create alignment</div>
                <div className='mx-[6rem] text-[1.1rem]'>Channels provide you and your team with a shared view into the work being done. With access to the same information, everyone in the channel can work in sync, and new members have full context when they join. And whenever you want to talk, simply use Foxcolab huddles to start a live voice conversation.
            </div>
            </div>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-cyan-200 rounded'></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Be more productive</div>
                <div className='mx-[6rem] text-[1.1rem]'>As you work in channels, your conversations and files become a searchable archive that gets more useful with time. Find answers, get context and make better decisions without having to chase down people or information.</div>
            </div>
        </div>

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title='How do I connect with an external company?'
            answer={`<div>
                <div>You can invite someone outside your company to share a channel in Foxcolab. Or, skip the channels for now and send an invitation to start exchanging direct messages – just like you would with other DMs!</div>
                <div>
                It really only takes a few clicks to start working closely with vendors, customers and more.
                </div>
              </div>`}
            
            />
           


        </div>
            
        </div>
       <ChoseBetter />

      </div>
    </HeaderFooter>


    </>
  )
}

export default Search;
"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Spreadsheet() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Spreadsheets </div>
                <div className='text-[2.8rem] font-bold leading-[2.5rem]'>Efficient Project Management with Spreadsheets</div>
                <div className='text-[1.2rem] mt-3'>Organize Projects and Collaborate Effectively with Dynamic Spreadsheet Capabilities</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Spreadsheets?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Multiple Spreadsheets</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab allows users to create and manage multiple spreadsheets within dedicated spreadsheet channels.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Collaborative Editing</div>
                <div className='mx-[6rem] text-[1.1rem]'>Multiple team members can simultaneously edit and update spreadsheets in real-time, fostering collaborative project management.
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
                <div className='font-semibold text-[1.8rem]'>File Attachments</div>
                <div className='mx-[6rem] text-[1.1rem]'> Users can attach files to spreadsheets, such as documents, images, or presentations, for comprehensive project documentation.</div>
            </div>
        </div>
      
       

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="How do I create a new spreadsheet in Foxcolab?"
            answer={`<div>To create a new spreadsheet in Foxcolab, navigate to the spreadsheet channel within your server. Click on the option to create a new spreadsheet, provide a name, and optionally set up initial columns and formatting.
              </div>`}
            />
           
           <FAQ
            title="How does collaborative editing work in Foxcolab spreadsheets?"
            answer={`<div>Collaborative editing allows multiple users to work on the same spreadsheet simultaneously. Changes made by one user are instantly visible to others, and Foxcolab maintains real-time synchronization to prevent conflicts.
              </div>`}
            />
           
           <FAQ
            title="How secure are spreadsheets in Foxcolab
            "
            answer={`<div>Spreadsheets in Foxcolab are secure with access controls and permissions managed by administrators. Users can set specific permissions for viewing, editing, and commenting on spreadsheets to protect sensitive data.

              </div>`}
            />
           
           <FAQ
            title=""
            answer={`<div>
              </div>`}
            />
           
           <FAQ
            title=""
            answer={`<div>
              </div>`}
            />
           
           <FAQ
            title=""
            answer={`<div>
              </div>`}
            />
           
           <FAQ
            title=""
            answer={`<div>
              </div>`}
            />
           
           <FAQ
            title=""
            answer={`<div>
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

export default Spreadsheet
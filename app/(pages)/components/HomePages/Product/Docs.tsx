"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Docs() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Docs </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Dynamic Document Creation</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Create and Manage Documents with Ease Using a Block-Based Editor</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Docs?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Block-Based Editor</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab's Docs feature utilizes a block-based text editor similar to Notion, allowing users to create documents with flexible layouts and rich content.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Multiple Docs per Canvas</div>
                <div className='mx-[6rem] text-[1.1rem]'>Each canvas in Foxcolab can contain multiple documents (docs), providing organized spaces for different types of content and discussions.
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
                <div className='font-semibold text-[1.8rem]'>Rich Formatting Options</div>
                <div className='mx-[6rem] text-[1.1rem]'>Users can format text, insert images, create tables, add checkboxes, and use other formatting tools to customize the appearance of their documents.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Collaborative Editing</div>
                <div className='mx-[6rem] text-[1.1rem]'>Multiple team members can collaborate in real-time on the same document, making it ideal for collaborative note-taking, brainstorming, and project planning.
            </div>
            </div>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-cyan-200 rounded'></div>
            </div>
        </div>

     
        

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="How do I create a new document in Foxcolab?"
            answer={`<div>To create a new document in Foxcolab, navigate to the desired canvas where you want to create the document. Click on the option to add a new document, give it a title, and start editing using the block-based text editor.
              </div>`}
            />
           
           <FAQ
            title=" Can I format text and add multimedia content to documents in Foxcolab?            "
            answer={`<div>Yes, Foxcolab's Docs feature allows you to format text (bold, italic, headings) and add multimedia content such as images, videos, tables, and checkboxes to enhance document readability and functionality.
              </div>`}
            />
           
           <FAQ
            title=" How does collaborative editing work in Foxcolab documents?"
            answer={`<div>Collaborative editing in Foxcolab documents enables multiple users to edit the same document simultaneously. Changes are synchronized in real-time, and users can see who made specific edits with timestamps.


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

export default Docs
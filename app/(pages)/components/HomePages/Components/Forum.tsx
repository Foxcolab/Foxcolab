"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Forum() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Forum Channel </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Engage in Open Discussions with Forum Channels</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Host Multiple Forums for In-depth Conversations and Collaborative File Sharing</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Forum Chanel?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Multiple Forums per Forum Channel</div>
                <div className='mx-[6rem] text-[1.1rem]'>Each forum channel can host multiple forums, allowing for organized and structured discussions on various topics within a single Forum Channel.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Public and Private Forums</div>
                <div className='mx-[6rem] text-[1.1rem]'>
                Forums can be set as public or private. Public forums are accessible to all server members, while private forums are only accessible to specific members invited to the forum.
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
                <div className='font-semibold text-[1.8rem]'>Open Discussions</div>
                <div className='mx-[6rem] text-[1.1rem]'>Forums provide a platform for open discussions where members can post comments, share ideas, and engage in meaningful conversations on specific topics.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>File Attachments</div>
                <div className='mx-[6rem] text-[1.1rem]'>
                Members can attach files to their comments in forums, facilitating the sharing of relevant documents, images, and other resources to support the discussion.
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
                <div className='font-semibold text-[1.8rem]'>Rich Text Editing</div>
                <div className='mx-[6rem] text-[1.1rem]'>Forums support rich text editing, enabling members to format their posts with various styles, insert links, and include multimedia content.</div>
            </div>
        </div>
       




        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="How do I create a forum channel in Foxcolab?"
            answer={`<div>To create a forum channel in Foxcolab, navigate to the section and select the option to add a new forum channel, give it a name, and configure the channel type public or private. Once created, you can start adding individual forums within the channel.
              </div>`}
            />
            <FAQ
            title=" Can I set a forum channel to be private?"
            answer={`<div>es, when creating or editing a forum channel, you can choose to set it as private. Private forums are only accessible to specific members you invite, ensuring that sensitive discussions remain confidential.
              </div>`}
            />
            <FAQ
            title="How do I participate in a forum discussion?"
            answer={`<div>To participate in a forum discussion, open the desired forum within the forum channel. You can read existing posts, leave comments, reply to threads, and attach files to support your points.
              </div>`}
            />
            <FAQ
            title="Can I attach files to my forum posts?"
            answer={`<div>Yes, you can attach files to your forum posts and comments. This feature allows you to share relevant documents, images, and other resources with other forum members.
              </div>`}
            />
            <FAQ
            title="What are the benefits of using forum channels in Foxcolab for team collaboration?"
            answer={`<div>Forum channels in Foxcolab provide a structured platform for open discussions, knowledge sharing, and collaborative decision-making. They promote transparency, encourage participation from all team members, and facilitate document sharing and feedback gathering.
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

export default Forum
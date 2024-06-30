"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function PublicServer() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Public Server</div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Connect and Collaborate on Public Servers</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Discover and Join Public Servers for Open Team Collaboration and Networking</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Public Server?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Discoverable Servers</div>
                <div className='mx-[6rem] text-[1.1rem]'>Public servers in Foxcolab are easily discoverable by all users. This feature allows individuals to find and join servers that match their interests or professional needs.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Open Collaboration</div>
                <div className='mx-[6rem] text-[1.1rem]'>
                Public servers facilitate open collaboration, enabling users from different teams or organizations to work together, share ideas, and participate in discussions without restrictions.
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
                <div className='font-semibold text-[1.8rem]'>Multiple Channels</div>
                <div className='mx-[6rem] text-[1.1rem]'>Each public server can host multiple text channels, test channels, forum channels,  and canvases. This structure allows for organized communication and collaboration across various topics and activities</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Moderation and Management</div>
                <div className='mx-[6rem] text-[1.1rem]'>Public servers are moderated and managed by administrators and moderators who ensure that discussions remain productive, respectful, and aligned with the server's goals and rules.
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
                <div className='font-semibold text-[1.8rem]'>Access to Resources</div>
                <div className='mx-[6rem] text-[1.1rem]'>Public servers often provide access to valuable resources, such as documents, templates, and tools, shared by the community members to support collaborative efforts and learning.</div>
            </div>
        </div>
       

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="How do I find and join a public server in Foxcolab?"
            answer={`<div>To find and join a public server in Foxcolab, use the search feature in the server discovery section. Browse through the list of available public servers, select one that interests you, and click "Join" to become a member.
              </div>`}
            />

            <FAQ
            title="What is the difference between a public server and a private server in Foxcolab?"
            answer={`<div>Public servers are discoverable by all users and anyone can join without an invitation. Private servers, on the other hand, cannot be found through search and require an invitation from an existing member to join.
              </div>`}
            />

            <FAQ
            title="Can I create my own public server in Foxcolab?"
            answer={`<div>Yes, users can create their own public servers in Foxcolab. Navigate to the server creation section, choose the public server option, and follow the prompts to set up your server with multiple channels and customization options.


              </div>`}
            />
            <FAQ
            title="Are there any rules or guidelines for participating in public servers?"
            answer={`<div>Yes, each public server in Foxcolab typically has its own set of rules and guidelines established by the server administrators. These rules are designed to ensure respectful, productive, and goal-aligned discussions and interactions among members.
              </div>`}
            />
            <FAQ
            title="How are public servers moderated in Foxcolab?            "
            answer={`<div>Public servers are moderated by administrators and designated moderators who oversee discussions, enforce rules, and manage member behavior to maintain a respectful and productive environment.
              </div>`}
            />
            <FAQ
            title="What should I do if I encounter inappropriate behavior on a public server?"
            answer={`<div>
            If you encounter inappropriate behavior on a public server, report it to the server administrators or moderators. They are responsible for addressing issues, enforcing rules, and ensuring a safe and respectful environment for all members.
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

export default PublicServer;
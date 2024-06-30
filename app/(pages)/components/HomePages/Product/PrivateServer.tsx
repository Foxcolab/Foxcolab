"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function PrivateServer() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Private Server </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Secure and Exclusive Private Servers</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Create and Manage Private Servers for Confidential Team Collaboration and Invited Membership Only</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Private Server?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow'></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Invitation-Only Access</div>
                <div className='mx-[6rem] text-[1.1rem] text-center'>Private servers in Foxcolab require an invitation from an existing member for others to join. This ensures that only authorized users can access the server.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem] '>Enhanced Privacy</div>
                <div className='mx-[6rem] text-[1.1rem] text-center'>Private servers offer enhanced privacy, making them ideal for sensitive projects, confidential discussions, and restricted access content.
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
                <div className='font-semibold text-[1.8rem]'>Customizable Channels</div>
                <div className='mx-[6rem] text-[1.1rem] text-center'>Each private server can host multiple text channels, test channels, forum channels, and canvases. These channels can be customized to fit the specific needs of the team or project.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Role-Based Permissions</div>
                <div className='mx-[6rem] text-[1.1rem]'>Administrators can assign roles  with specific permissions within private servers, ensuring that users have access to features and data relevant to their roles.
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
                <div className='font-semibold text-[1.8rem]'>Secure Communication</div>
                <div className='mx-[6rem] text-[1.1rem]'>Communication within private servers is secured with end-to-end encryption, protecting all messages, files, and data shared within the server.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Exclusive Resources</div>
                <div className='mx-[6rem] text-[1.1rem]'>Private servers can host exclusive resources such as documents, templates, and tools that are only accessible to members, supporting specialized projects and workflows.
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
            title="How do I create a private server in Foxcolab?"
            answer={`<div>To create a private server in Foxcolab, navigate to the server creation section and select the private server option. Follow the prompts to set up your server, customize channels, and invite members.
              </div>`}
            />
           <FAQ
            title="How can I invite members to join my private server?"
            answer={`<div>o invite members to your private server, go to the invite member section of your server settings. Enter the email addresses or usernames of the individuals you want to invite and send them an invitation. They must accept the invitation to join the server.
              </div>`}
            />
           <FAQ
            title="Can users find my private server through search?"
            answer={`<div>No, private servers are not discoverable through search. Only users who receive an invitation from an existing member can join a private server, ensuring exclusive access.
              </div>`}
            />
           
           <FAQ
            title="How secure is communication within a private server?"
            answer={`<div>Communication within a private server is highly secure, with end-to-end encryption protecting all messages, files, and data shared within the server. This ensures that your discussions and information remain confidential.
              </div>`}
            />
           
           <FAQ
            title="Can I assign different roles to members within a private server?"
            answer={`<div>Yes, administrators can assign different roles, such as admin, manager, and user, within a private server. Each role comes with specific permissions that control access to features and data relevant to their responsibilities.
              </div>`}
            />
           
           <FAQ
            title="What happens if a member leaves or is removed from a private server?"
            answer={`<div>If a member leaves or is removed from a private server, they will no longer have access to the server, its channels, or any of the content shared within it. Their previous contributions will remain unless deleted by an admin.
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

export default PrivateServer
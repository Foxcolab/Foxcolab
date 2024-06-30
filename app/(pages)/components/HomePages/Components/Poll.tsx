
"use client";
import React, { useEffect } from 'react'
import ChoseBetter from './ChoseBetter'
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from './HeaderFooter'
import { useTheme } from 'next-themes'
import Image from 'next/image';

const Items = [
    {
        url:"",
        title:"Interactive Poll Creation",
        description:"Foxcolab allows users to create interactive polls effortlessly. Administrators can design polls with customizable questions and response options, making it easy to gather feedback, opinions, or preferences from participants."
    },
    {
        url:"",
        title:"Real-time Percentage Display",
        description:"After participants vote in a poll on Foxcolab, the platform displays real-time percentages for each response option. This feature provides instant visibility into voting trends and results, enhancing transparency and engagement."
    },
    {
        url:"",
        title:"Detailed Voting Analytics",
        description:"Foxcolab provides detailed analytics for poll results. Administrators can view comprehensive reports that include voting trends, response distribution, and participant demographics if applicable. These analytics help in-depth analysis and informed decision-making based on survey outcomes."
    },
    {
        url:"",
        title:"Anonymous Participation",
        description:"Foxcolab allows participants to vote anonymously in polls. This feature ensures that respondents' identities are kept confidential, encouraging honest feedback and participation without concerns about privacy."
    },
    {
        url:"",
        title:"Transparent Voting Process",
        description:"Despite anonymity, Foxcolab provides transparency in the voting process by displaying aggregated results without revealing individual responses. This transparency allows administrators to analyze trends and patterns while respecting participant anonymity."
    },
  

]

function Poll() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

  return (
     <>
    <HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='hp_container'>
                <div className='uppercase font-semibold text-[0.9rem]'>Polls </div>
                <div className='hp_title'> Interactive Polls for Engaging Surveys</div>
                <div className='hp_subtitle'>Gather Feedback Easily with Real-time Results and Detailed Analytics
                </div>
                <div className='hp_link'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
            <div className='hp_hero_img '>
                    <Image src={"https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/33801.jpg"} height={100} width={100} alt='' unoptimized className='shadow-md' />
                </div>
        </div>
        </div>

        <div className="what_section_title">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Poll?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        

         {
            Items.map((item, i)=>(
                i%2==0 ? <div className='grid_two py-4' key={i}>
                <div className='grid_two_img_container'>
                    <div className=' section_image_container  bg-yellow-200 rounded'></div>
                </div>
                <div className='grid_two_text_container'>
                    <div className='section_image_title font-semibold '>{item.title}</div>
                    <div className='text-[1rem] md:text-[1.1rem] text-gray-600'>{item.description}</div>
                </div>
            </div> : <div className='grid_two2 ' key={i}>
            <div className='grid_two_text_container2 '>
                <div className='font-semibold text-[1.8rem]'>{item.title}</div>
                <div className='text-[1rem] md:text-[1.1rem] text-gray-600'>{item.description}</div>
            </div>
            <div className='grid_two_img_container'>
                <div className='section_image_container bg-cyan-200 rounded'></div>
            </div>
        </div>

            ))
        }

        

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-8 md:mx-24 border-t'>
            
            <FAQ
            title="How does voting anonymously work in Foxcolab polls?"
            answer={`<div>Anonymous voting in Foxcolab allows participants to submit their responses confidentially. Their identities are not revealed to administrators or other participants, ensuring privacy and encouraging unbiased feedback.
              </div>`}
            
            />
             <FAQ
            title="Can I choose to vote anonymously  instead of normally in Foxcolab polls?"
            answer={`<div>Yes, Foxcolab provides the option for participants to vote anonymity  if normally is not required. Normal voting allows administrators to see individual responses along with participant identities, facilitating personalized follow-ups or analyses.
              </div>`}
            
            />
             <FAQ
            title="What are the benefits of anonymous voting in Foxcolab polls?"
            answer={`<div>
            Anonymous voting promotes honest and unbiased feedback from participants. It eliminates concerns about social pressures or biases, resulting in more authentic survey results that reflect genuine opinions or preferences.
              </div>`}
            
            />
             <FAQ
            title="How do administrators view and analyze voting results for anonymous polls in Foxcolab?"
            answer={`<div>Administrators can view aggregated results of anonymous polls in Foxcolab without accessing individual responses. This ensures data confidentiality while allowing administrators to derive insights and make informed decisions based on collective feedback.
              </div>`}
            
            />
             <FAQ
            title="Is normal voting secure in Foxcolab polls?"
            answer={`<div>Yes, Foxcolab ensures the security of normal voting in polls. Participant identities and responses are handled securely, and data transmission is encrypted to protect confidentiality and comply with data protection regulations.
              </div>`}
            
            />
             <FAQ
            title="Can participants change their vote in Foxcolab polls after submitting it?"
            answer={`<div>Foxcolab allows participants to change their vote in both anonymous and normal polls until the poll is closed or the administrator restricts voting modifications. This flexibility ensures accuracy and reflects evolving participant opinions.
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

export default Poll
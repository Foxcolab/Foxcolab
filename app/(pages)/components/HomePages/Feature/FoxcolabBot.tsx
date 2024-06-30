import React from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import Link from 'next/link'
import FAQ from './FAQ/FAQ'
import ChoseBetter from '../Components/ChoseBetter'
import Image from 'next/image'

const Items = [
    {
        url:"",
        title:"Automated Updates",
        description:"FoxcolabBot delivers automated updates to keep team members informed about important announcements, events, or changes within the organization. This ensures timely dissemination of information without manual intervention."
    },
    {
        url:"",
        title:"Keyword-Based Responses",
        description:"Users can configure FoxcolabBot to respond automatically to specific keywords or phrases. For example, setting up responses for inquiries about holiday lists, policies, FAQs, or other commonly requested information streamlines communication and reduces response time."
    },
    {
        url:"",
        title:"Customizable Responses",
        description:"Administrators can customize FoxcolabBot's responses to tailor information delivery according to organizational needs. This flexibility allows for precise and accurate communication of policies, procedures, announcements, and other relevant information."
    },
    {
        url:"",
        title:"Integration with Team Channels",
        description:" FoxcolabBot integrates seamlessly with team communication channels, such as text channels or group chats. This integration ensures that updates and responses are easily accessible to all team members within their preferred communication environment."
    },
    
]


function FoxcolabBot() {
  return (
    <>
    <HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='hp_container'>
                <div className='uppercase font-semibold text-[0.9rem]'>Foxcolab Bot </div>
                <div className='hp_title'>Automated Updates and Responses</div>
                <div className='hp_subtitle'>Streamlining Communication with Customizable Messaging and Information Delivery</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a FoxcolabBot?</div>
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
            title='How does FoxcolabBot improve communication within teams?            '
            answer={`<div> FoxcolabBot enhances communication by delivering automated updates and responses. It keeps team members informed about important announcements, events, or changes in real-time, ensuring everyone stays updated without manual notifications.
            </div>`}
            
            />
            <FAQ
            title='Can FoxcolabBot respond to specific inquiries or requests?'
            answer={`<div>Yes, FoxcolabBot can be configured to respond automatically to specific keywords or phrases. For example, it can provide information on holiday schedules, company policies, FAQs, or any other predefined topics. This streamlines information delivery and reduces the need for manual responses from team members or administrators. </div>`}
            
            />
            <FAQ
            title="How customizable are FoxcolabBot's responses?"
            answer={`<div> Administrators have full control over FoxcolabBot's responses. They can customize the content and tone to align with organizational messaging and preferences. This customization ensures that responses are accurate, consistent, and tailored to meet the specific needs of the team or organization.</div>`}
            
            />
          
           

           


        </div>
            
        </div>
       <ChoseBetter />

      </div>
    </HeaderFooter>
    
    </>
  )
}

export default FoxcolabBot
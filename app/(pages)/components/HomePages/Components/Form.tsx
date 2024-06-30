
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
        title:"Versatile Question Types",
        description:"Foxcolab offers a variety of question types to create versatile forms. These include short answer, long answer, multiple-choice, single-choice, dropdown select, and file upload questions. Administrators can mix and match these question types to gather specific types of information efficiently"
    },
    {
        url:"",
        title:"Customizable Form Design",
        description:" Administrators can customize the design of forms in Foxcolab to align with branding and organizational preferences. This includes adjusting colors, adding logos, and choosing layouts that enhance the form's visual appeal and user experience."
    },
    {
        url:"",
        title:"Interactive Response Pages",
        description:"Foxcolab provides interactive response pages that users see after submitting a form. These pages can display customized messages, summaries of responses, or additional instructions based on the user's input. This feature enhances engagement and provides immediate feedback to respondents."
    },
    {
        url:"",
        title:"File Uploads with Specifications",
        description:"Forms in Foxcolab support file uploads with specified requirements such as file type and size limits. Administrators can set parameters for acceptable file formats (e.g., PDF, JPG) and maximum file sizes, ensuring that respondents submit relevant and manageable documents."
    },
    {
        url:"",
        title:"Respondent Details Page",
        description:"Foxcolab includes a respondent details page where administrators can view and manage information about form respondents. This page displays metadata such as submission timestamps, IP addresses, and respondent identifiers, facilitating data management and analysis."
    },
]



function Form() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Forms </div>
                <div className='hp_title'>Streamlined Form Creation and Response Management</div>
                <div className='hp_subtitle'>Effortlessly Collect and Manage Data with Customizable Form Options</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Form?</div>
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
            title="What types of questions can I include in forms created with Foxcolab?"
            answer={`<div>Foxcolab supports various question types to cater to different data collection needs. You can include short answer, long answer, multiple-choice, single-choice, dropdown select, and file upload questions. This versatility allows you to gather diverse types of information efficiently and comprehensively.
              </div>`}
            
            />
           
           <FAQ
            title="How customizable are the forms in Foxcolab?"
            answer={`<div>Forms in Foxcolab are highly customizable. Administrators can personalize the design by adjusting colors, adding logos, and choosing layouts that align with organizational branding. This customization enhances the visual appeal and user experience of the forms, making them more engaging and reflective of your brand identity.
              </div>`}
            
            />
            <FAQ
            title="Can Foxcolab handle file uploads in forms?"
            answer={`<div>
            Yes, Foxcolab allows respondents to upload files as part of form submissions. Administrators can specify file type requirements (e.g., PDF, JPG), set count of files and set maximum file sizes to ensure that submissions are relevant and manageable. This feature is ideal for collecting documents, images, or other files from respondents securely.
              </div>`}
            
            />
            <FAQ
            title="What are interactive response pages in Foxcolab forms?"
            answer={`<div>Interactive response pages in Foxcolab are displayed to respondents after they submit a form. These pages can include customized messages, summaries of their responses, or additional instructions based on their inputs. This interactive feedback enhances user engagement and provides immediate confirmation of submission.
              </div>`}
            
            />
            <FAQ
            title="How does Foxcolab ensure the security of form submissions and respondent data?"
            answer={`<div>Foxcolab prioritizes data security through encryption protocols and secure storage practices. Form submissions and respondent data are protected against unauthorized access or breaches, ensuring confidentiality and compliance with data protection regulations. This security framework safeguards sensitive information provided by respondents.
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

export default Form
"use client";
import React, { useEffect, useState } from 'react'
import ChoseBetter from './ChoseBetter'
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from './HeaderFooter'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils';
import Image from 'next/image';

const EducationItem = [
    {
        icon:"https://s3.amazonaws.com/a.storyblok.com/f/120497/x/11c2006766/quizzes.svg",
        name:"Quizzes",
        description:"Engage your remote students or connected classrooms in a way that’s efficient and fun"
    },
    {
        icon:"https://s3.amazonaws.com/a.storyblok.com/f/120497/x/65d23e42c7/exams-high-stakes.svg",
        name:"Exam",
        description:"Test skills and knowledge in a professional and no-distraction environment"
    },
    {
        icon:"https://s3.amazonaws.com/a.storyblok.com/f/120497/x/ba7967a6bd/homework.svg",
        name:"Homework",
        description:"Give friendly and interactive after school assignments "
    },
    {
        icon:"https://s3.amazonaws.com/a.storyblok.com/f/120497/x/f8aa8d75a8/competition.svg",
        name:"competition",
        description:"Empower learners, challenge them and encourage discussions to experience amazing results"
    },
    {
        icon:"https://s3.amazonaws.com/a.storyblok.com/f/120497/x/05b287fc44/formative-assessment.svg",
        name:"Formative Assessment",
        description:"Positive motivation, encouraging feedback, and equal opportunities with a new educational approach"
    },
]

const BusinessItem = [
    {
        icon:"https://a.storyblok.com/f/120497/x/0bf199cf43/recruitment.svg",
        name:"Recruitment",
        description:"Identify real talents without the hassle of time-consuming CV screening"
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/42e5d6d315/employees.svg",
        name:"Employee Assessments",
        description:"Online workforce assessments encourage your employees to grow and cultivate a positive team spirit "
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/b3b59afb1f/trainings.svg",
        name:"Training",
        description:"Evaluate skills and knowledge in a professional and distraction-free environment"
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/3e0eee64c7/sales-tr.svg",
        name:"Sales Training",
        description:"Boost sales by giving your team the skills they need to interact with customers  "
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/9e3793c3da/customer-service.svg",
        name:"Customer Service",
        description:"Use customized tests to ensure that employees are meeting customer service standards"
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/c2999775fb/safety.svg",
        name:"Safety Procedures",
        description:"Build a better work environment while boosting morale and performance "
    },
    {
        icon:"https://a.storyblok.com/f/120497/x/3b18257d8f/certification.svg",
        name:"Certification",
        description:"Streamline your certification processes with efficient and easy-to-use online assessment tools"
    },
]


const Items = [
    {
        url:"",
        title:"Dynamic Test Creation",
        description:"Foxcolab allows administrators to create dynamic tests with ease. Using a rich text editor, administrators can craft questions that include formatted text, images, and mathematical equations. This flexibility enables comprehensive assessment and evaluation of users' knowledge and skills."
    },
    {
        url:"",
        title:"Interactive Results",
        description:"Users receive interactive results immediately after completing a test. Foxcolab provides detailed feedback, including scores, correct answers, and explanations for incorrect responses. This real-time feedback enhances learning outcomes and encourages continuous improvement."
    },
    {
        url:"",
        title:"Customizable Test Settings",
        description:"Administrators can customize test settings to meet specific requirements. This includes setting time limits, defining passing scores, enabling randomization of questions, and configuring access permissions. Customizable settings ensure that tests are tailored to align with learning objectives and organizational needs."
    },
    {
        url:"",
        title:"Secure Testing Environment",
        description:"Foxcolab maintains a secure testing environment with encryption protocols and access controls. This ensures that test content and user data are protected against unauthorized access or breaches, maintaining confidentiality and integrity throughout the testing process."
    },
    {
        url:"",
        title:"Analytics and Reporting",
        description:"Foxcolab provides analytics and reporting tools to track test performance and user progress. Administrators can view detailed metrics, such as completion rates, average scores, and question-level analytics. These insights enable informed decision-making, curriculum refinement, and identification of areas for improvement."
    },
    {
        url:"",
        title:"User-Friendly Interface",
        description:"Foxcolab features an intuitive interface designed for ease of use. Users can navigate through tests, respond to questions, and review results effortlessly. Clear instructions and accessible features ensure a positive user experience, promoting engagement and effective learning outcomes."
    },
]

function Assessment() {
    const {setTheme} = useTheme();
    const [activee, setActive] = useState("Business");
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    <HeaderFooter>
      <div>
      <div className='hp_hero'>
            <div className='hp_container'>
                <div className='uppercase font-semibold text-[0.9rem]'>Assessment </div>
                <div className='hp_title'>Interactive Testing and Assessment</div>
                <div className='hp_subtitle'>Engage, Evaluate, and Learn with Dynamic Tests and Rich Text Question Creation.</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is a Test?</div>
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

    <div className='my-20'>
            <div className='text-[1.2rem] font-semibold text-center'>Skills and knowledge testing made easy</div>
            <div className='text-[2rem] font-semibold text-center'>One assessment platform for all your needs</div>
            <div className='text-center mt-4'>
                    <span className=' bg-[#53ab4f] px-1 py-4 rounded-md'>
                        <button className={cn('px-4 py-[0.35rem] rounded-md  text-[1.2rem] text-white', activee==="Business" && "bg-white font-semibold text-black")} onClick={()=>setActive("Business")}>Business</button>
                        <button className={cn('px-4 py-[0.35rem] rounded-md  text-[1.2rem] text-white', activee==="Education" && "bg-white font-semibold text-black")} onClick={()=>setActive("Education")}>Education</button>
                    </span>
            </div>
            <div className='mx-4 md:mx-20 my-8'>
                <div className="grid_three gap-8 ">
                    {
                        activee==="Business" ? BusinessItem.map((item, i)=>(
                            <div key={i} className='border rounded-md hover:shadow-md cursor-pointer p-8 flex items-center justify-center flex-col md:inline'>
                                <div className='w-[4rem] h-[4rem]'><Image src={item.icon} alt='' unoptimized height={100} width={100}  /></div>
                                <div className='text-[1.3rem] font-semibold my-4'>{item.name}</div>
                                <div className='text-[1.0rem] text-gray-600'>{item.description}</div>
                            </div>
                        )) : EducationItem.map((item, i)=>(
                            <div key={i} className='border rounded-md hover:shadow-md cursor-pointer p-8 flex items-center justify-center flex-col md:inline'>
                                <div className='w-[4rem] h-[4rem]'><Image src={item.icon} alt='' unoptimized height={100} width={100}  /></div>
                                <div className='text-[1.3rem] font-semibold my-4'>{item.name}</div>
                                <div className='text-[1.0rem] text-gray-600'>{item.description}</div>
                            </div>
                        )) 
                    }
                </div>
            </div>
    </div> 
        

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-8 md:mx-24 border-t'>
            
            <FAQ
            title='How do administrators create tests in Foxcolab?'
            answer={`<div>
            Administrators can create tests using Foxcolab's intuitive interface and rich text editor. They can compose questions with formatted text, insert images, and include mathematical equations using built-in tools. This flexibility allows for the creation of comprehensive assessments tailored to specific learning objectives.
              </div>`}
            
            />
            <FAQ
            title='Can tests in Foxcolab include interactive elements or multimedia?'
            answer={`<div>
            Yes, Foxcolab supports interactive elements and multimedia within tests. Administrators can embed images, videos, and audio files to enhance question clarity or provide context. Interactive elements such as drag-and-drop questions or clickable hotspots can also be included to engage users and assess practical knowledge.
              </div>`}
            
            />
            <FAQ
            title='How are results delivered to users after completing a test?'
            answer={`<div>
            Users receive immediate feedback upon completing a test in Foxcolab. They are provided with detailed results including their score, correct answers, and explanations for incorrect responses. This real-time feedback helps users understand their performance, identify areas for improvement, and encourages active learning.
              </div>`}
            
            />
            <FAQ
            title='What customization options are available for tests in Foxcolab?            '
            answer={`<div>
            Foxcolab offers extensive customization options for tests to align with organizational requirements. Administrators can set time limits for tests, define passing scores, randomize question order, and configure access permissions. These settings ensure that tests are tailored to meet specific assessment needs and educational goals.
              </div>`}
            
            />
            <FAQ
            title='Can administrators track and analyze test performance using Foxcolab?'
            answer={`<div>
            Yes, Foxcolab provides comprehensive analytics and reporting tools for administrators. They can access detailed metrics such as test completion rates, average scores, question-level analytics, and user progress over time. These insights enable administrators to evaluate learning outcomes, identify trends, and make data-driven decisions to optimize educational strategies.
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

export default Assessment
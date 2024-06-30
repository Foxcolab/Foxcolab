"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'



function Reporting() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>Reporting & Analysis </div>
                <div className='text-[2.8rem] font-bold leading-[3rem] mr-6'>Comprehensive Reporting and Analytics</div>
                <div className='text-[1.2rem] mt-3 mr-6'>Visualize Data Insights Across Your Server for Informed Decision-Making</div>
                <div className='mt-4'>
                <Link href={'/register'} className='px-4 py-[0.7rem] uppercase rounded bg-green-500 text-white font-semibold text-[1.0rem]'>Try Now in Foxcolab</Link>
                </div>
            </div>
            <div>
                <div className='h-full rounded shadow-md w-full bg-red-500'></div>
            </div>
        </div>

        <div className="bg-[#fbf7f1] p-4">
            <div className='text-[1.8rem] font-bold text-center leading-10'>What is Reporting & Analysis?</div>
            <div className='flex justify-center '>
            <div className='h-[30rem] w-[820px] bg-green-500 rounded shadow  '></div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='flex justify-center mt-8'>
                <div className='h-[22rem] w-[28rem] bg-yellow-200 rounded'></div>
            </div>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Data Visualization</div>
                <div className='mx-[6rem] text-[1.1rem]'>Foxcolab provides visual representations of data through charts, graphs, and tables to present insights clearly and intuitively.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>Usage Statistics</div>
                <div className='mx-[6rem] text-[1.1rem]'>Users can track server usage metrics such as message volume, file uploads, active users, and engagement levels over time.
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
                <div className='font-semibold text-[1.8rem]'>Document Sharing Analysis</div>
                <div className='mx-[6rem] text-[1.1rem]'>Analyze patterns and trends in document sharing, including types of documents shared, frequency of sharing, and popular topics.</div>
            </div>
        </div>
        <div className='grid_two py-4'>
            <div className='p-4 flex items-center flex-col w-full justify-center'>
                <div className='font-semibold text-[1.8rem]'>User Activity Monitoring</div>
                <div className='mx-[6rem] text-[1.1rem]'>Monitor user activity within the server, including login times, channel participation, and interaction frequency.
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
                <div className='font-semibold text-[1.8rem]'>Real-time Updates</div>
                <div className='mx-[6rem] text-[1.1rem]'>Access real-time updates of analytics data to stay current with server activities and make timely decisions.</div>
            </div>
        </div>
       

      

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-24 border-t'>
            
            <FAQ
            title="What types of data can I analyze using Foxcolab's Reporting and Analytics feature?"
            answer={`<div>Foxcolab's Reporting and Analytics feature allows you to analyze various types of data, including server usage metrics (message volume, file uploads), user activity (login times, participation), document sharing patterns, and more.
              </div>`}
            />
           
           <FAQ
            title="How can I access the Reporting and Analytics feature in Foxcolab?"
            answer={`<div>You can access the Reporting and Analytics feature in Foxcolab through the administrative dashboard or analytics section, where you can view and generate reports based on server data.
              </div>`}
            />
           
           <FAQ
            title="Can I customize the reports generated in Foxcolab's Reporting and Analytics feature?"
            answer={`<div>Yes, Foxcolab allows you to customize reports by selecting specific metrics, time periods, and data visualizations (charts, graphs) to focus on key performance indicators (KPIs) and organizational goals.
              </div>`}
            />
           
           <FAQ
            title=" Is the analytics data in Foxcolab updated in real-time?"
            answer={`<div>Yes, Foxcolab provides real-time updates of analytics data, ensuring that you have access to the latest insights into server activities, user interactions, and content dynamics as they occur.
              </div>`}
            />
           
           <FAQ
            title="How can Foxcolab's Reporting and Analytics feature help with decision-making?"
            answer={`<div>Foxcolab's Reporting and Analytics feature provides valuable insights and trends that help administrators and stakeholders make informed decisions regarding server management, user engagement strategies, and content optimization.
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

export default Reporting
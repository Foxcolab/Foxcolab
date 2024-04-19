import React from 'react'
import Link from 'next/link'
function Footer() {
  return (
    <>
    
    <div className=" mt-8 border-t border-[#ebebeb] ">
        <div className="flex justify-around mt-4">
        <div className='text-[1.2rem] font-semibold'>Foxcolab</div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>PRODUCTS</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={'/'}>Public Server</Link>
                <Link href={'/'}>Private Server</Link>
                <Link href={'/'}>Canvas</Link>
                <Link href={'/'}>Skill & Knowlegde Assessment</Link>
                <Link href={'/'}>Forum</Link>
                <Link href={'/'}>Reporting</Link>
                <Link href={'/'}>Forms</Link>
                <Link href={'/'}>Files</Link>
                <Link href={'/'}>Automation</Link>
                <Link href={'/'}>Docs</Link>
                <Link href={'/'}>Spreadsheet</Link>
                <Link href={'/'}>Polls</Link>
                <Link href={'/'}>Text Channel</Link>
            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>FEATURES</div>
            <div className='flex flex-col footer_sec_items'>
            <Link href={'/'}>Channels</Link>
            <Link href={'/'}>Canvas</Link>
            <Link href={'/'}>Messaging</Link>
            <Link href={'/'}>Search</Link>
            <Link href={'/'}>File Sharing</Link>
            <Link href={'/'}>Security</Link>
            <Link href={'/'}>Foxcolab Bot</Link>
            <Link href={'/'}>Assessment</Link>
            <Link href={'/'}>Community Forms</Link>
            <Link href={'/'}>Reporting & Analysis</Link>
            <Link href={'/'}>Threads</Link>
            <Link href={'/'}>Polls</Link>
            <Link href={'/'}>Permissions & Roles</Link>
            <Link href={'/'}>Voice Message</Link>
            <Link href={'/'}>Video Message</Link>
            <Link href={'/'}>Screen Sharing</Link>
            <Link href={'/'}>Personalisation</Link>
            <Link href={'/'}>Polls</Link>

            </div>

            <div>

            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>SOLUTIONS</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={''}>Engineering</Link>
                <Link href={''}>IT</Link>
                <Link href={''}>Customer Service</Link>
                <Link href={''}>Financial Service</Link>
                <Link href={''}>Retails</Link>
                <Link href={''}>Educations</Link>
                <Link href={''}>Sales</Link>
                <Link href={''}>Project Management</Link>
                <Link href={''}>Marketing</Link>
                <Link href={''}>Health & Life Science</Link>
                <Link href={''}>Technology</Link>
                <Link href={''}>Media</Link>
            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>COMPARE</div>
            <div className='flex flex-col footer_sec_items'>
            <Link href={''}>Slack</Link>
            <Link href={''}>Discord</Link>
            <Link href={''}>Evernote</Link>
            <Link href={''}>Notion</Link>
            <Link href={''}>Monday</Link>
            <Link href={''}>Google Forms</Link>
            <Link href={''}>Guilded</Link>
            <Link href={''}>Teachable</Link>
            <Link href={''}>Other Platforms</Link>

            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>RESOURCES</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={''}>Help Centre</Link>
                <Link href={''}>What's New</Link>
                <Link href={''}>Blog</Link>
                <Link href={''}>Developers</Link>
                <Link href={''}>Partners</Link>
                <Link href={''}>About Us</Link>
                <Link href={''}>Pricing</Link>
                <Link href={''}>Careers</Link>
                <Link href={''}>Contact Us</Link>
                <Link href={''}>News</Link>
                <Link href={''}>Terms & Conditions</Link>
                <Link href={''}>Privacy</Link>
            </div>
        </div>
       
    </div>
    <div className='footer_t_c'>
        <div className='flex justify-around items-center'>
        <div className='flex gap-4 '>
            <Link href={''}>Privacy</Link>
            <Link href={''}>Terms</Link>
            <Link href={''}>Privacy</Link>
            <Link href={''}>Privacy</Link>
        </div>
        <div className='flex items-end flex-col'>
        <div>©2024 Footer Technology. All rights reserved.</div>
        <div>Various trademarks held by their respective owners.</div>
        </div>
        </div>
    </div>
    </div>
    
    
    </>
  )
}

export default Footer
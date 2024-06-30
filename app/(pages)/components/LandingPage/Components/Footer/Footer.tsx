import React from 'react'
import Link from 'next/link'
function Footer() {
  return (
    <>
    
    <div className=" mt-8   flex item-center flex-col justify-center">
        <div className="footer_container">
            <div className="">
                <div className='text-[1.3rem] font-bold'>Foxcolab</div>
                <div className='mt-4 text-[#696969]'>Streamline team communication <br /> and productivity with Foxcolab</div>
            </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>PRODUCTS</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={'/products/public-server'}>Public Server</Link>
                <Link href={'/products/private-server'}>Private Server</Link>
                <Link href={'/products/canvas'}>Canvas</Link>
                <Link href={'/products/test'}>Skill & Knowlegde Assessment</Link>
                <Link href={'/products/forum'}>Forum</Link>
                <Link href={'/products/'}>Reporting</Link>
                <Link href={'/products/form'}>Forms</Link>
                <Link href={'/products/files'}>Files</Link>
                <Link href={'/products/automation'}>Automation</Link>
                <Link href={'/products/docs'}>Docs</Link>
                <Link href={'/products/spreadsheet'}>Spreadsheet</Link>
                <Link href={'/products/polls'}>Polls</Link>
                <Link href={'/products/channel'}>Text Channel</Link>
            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>FEATURES</div>
            <div className='flex flex-col footer_sec_items'>
            {/* <Link href={'/features/channels'}>Channels</Link> */}
            {/* <Link href={'/features/canvas'}>Canvas</Link> */}
            <Link href={'/features/messaging'}>Messaging</Link>
            {/* <Link href={'/features/search'}>Search</Link> */}
            <Link href={'/features/file-sharing'}>File Sharing</Link>
            <Link href={'/features/security'}>Security</Link>
            <Link href={'/features/foxcolab-bot'}>Foxcolab Bot</Link>
            <Link href={'/features/assessment'}>Assessment</Link>
            <Link href={'/features/forms'}>Community Forms</Link>
            <Link href={'/features/'}>Reporting & Analysis</Link>
            <Link href={'/features/threads'}>Threads</Link>
            {/* <Link href={'/features/polls'}>Polls</Link> */}
            <Link href={'/features/permission-&-roles'}>Permissions & Roles</Link>
            <Link href={'/features/voice-message'}>Voice Message</Link>
            <Link href={'/features/video-message'}>Video Message</Link>
            <Link href={'/features/screen-sharing'}>Screen Sharing</Link>
            <Link href={'/features/personalisation'}>Personalisation</Link>
           

            </div>

            <div>

            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>SOLUTIONS</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={'/solutions/engineering'}>Engineering</Link>
                <Link href={'/solutions/IT'}>IT</Link>
                <Link href={'/solutions/customer-service'}>Customer Service</Link>
                <Link href={'/solutions/financial-service'}>Financial Service</Link>
                <Link href={'/solutions/retails'}>Retails</Link>
                <Link href={'/solutions/educations'}>Educations</Link>
                <Link href={'/solutions/sales'}>Sales</Link>
                <Link href={'/solutions/project-management'}>Project Management</Link>
                <Link href={'/solutions/marketing'}>Marketing</Link>
                <Link href={'/solutions/health-&-life-science'}>Health & Life Science</Link>
                <Link href={'/solutions/technology'}>Technology</Link>
                <Link href={'/solutions/media'}>Media</Link>
            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>COMPARE</div>
            <div className='flex flex-col footer_sec_items'>
            <Link href={'/compare/slack'}>Slack</Link>
            <Link href={'/compare/discord'}>Discord</Link>
            <Link href={'/compare/evernote'}>Evernote</Link>
            <Link href={'/compare/notion'}>Notion</Link>
            <Link href={'/compare/monday'}>Monday</Link>
            <Link href={'/compare/google-forms'}>Google Forms</Link>
            <Link href={'/compare/guilded'}>Guilded</Link>
            <Link href={'/compare/teachable'}>Teachable</Link>

            </div>
        </div>
        <div className='footer_sec'>
            <div className='footer_sec_title'>RESOURCES</div>
            <div className='flex flex-col footer_sec_items'>
                <Link href={'/resources/help-centre'}>Help Centre</Link>
                <Link href={`/resources/what's-new`}>What's New</Link>
                <Link href={'/resources/blog'}>Blog</Link>
                <Link href={'/resources/developers'}>Developers</Link>
                <Link href={'/resources/partners'}>Partners</Link>
                <Link href={'/resources/about-us'}>About Us</Link>
                <Link href={'/pricing'}>Pricing</Link>
                <Link href={'/resources/careers'}>Careers</Link>
                <Link href={'/resources/contact-us'}>Contact Us</Link>
                <Link href={'/resources/news'}>News</Link>
                <Link href={'/resources/terms-&-conditions'}>Terms & Conditions</Link>
                <Link href={'/resources/privacy'}>Privacy</Link>
            </div>
        </div>
       
    </div>
    <div className='footer_t_c mt-8'>
        
        <div className='footer_tc_item'>
        <div>©2024 Footer Technology. All rights reserved.</div>
        <div>Various trademarks held by their respective owners.</div>
        </div>
      
    </div>
    </div>
    
    
    </>
  )
}

export default Footer
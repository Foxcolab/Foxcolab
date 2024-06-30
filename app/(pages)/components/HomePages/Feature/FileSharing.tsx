"use client";
import React, { useEffect } from 'react'
import ChoseBetter from '../Components/ChoseBetter';
import FAQ from '../Feature/FAQ/FAQ'
import Link from 'next/link'
import HeaderFooter from '../Components/HeaderFooter';
import { useTheme } from 'next-themes'
import Image from 'next/image';


const Items = [
    {
        url:"",
        title:"Secure File Transfer",
        description:"Foxcolab prioritizes data security with robust encryption protocols for all file transfers. Whether uploading, downloading, or storing files, encrypted connections ensure that sensitive data remains protected against unauthorized access or interception."
    },
    {
        url:"",
        title:"Versatile File Types",
        description:"Foxcolab supports a wide range of file types to accommodate diverse collaboration needs. Users can share documents, spreadsheets, presentations, images, videos, and more, facilitating comprehensive communication and project management within teams."
    },
    {
        url:"",
        title:"Permission Controls",
        description:"Administrators have granular control over file access permissions in Foxcolab. They can configure settings to define who can view, edit, download, or share files based on individual roles, teams, or specific project requirements. This feature enhances security and ensures that sensitive information is accessed only by authorized personnel."
    },
    {
        url:"",
        title:"Version Control",
        description:"Foxcolab includes automatic version control functionality to manage file revisions efficiently. Each time a file is edited or updated, the platform maintains a history of changes, allowing users to track and access previous versions as needed. This capability prevents confusion over document updates and ensures teams always work with the most recent file versions."
    },
    {
        url:"",
        title:"Integration Capabilities",
        description:"Foxcolab seamlessly integrates with leading third-party storage solutions and productivity tools. This integration enables users to synchronize files across different platforms, enhancing workflow efficiency and collaboration. Whether integrating with cloud storage providers or project management tools, Foxcolab simplifies file management and enhances productivity by centralizing data access and management."
    },
    {
        url:"",
        title:"Notification and Alerts",
        description:"Users stay informed and up-to-date with Foxcolab's notification and alert system. They receive real-time notifications regarding file uploads, downloads, comments, and edits, ensuring that team members are aware of relevant updates and changes. This feature promotes transparency, facilitates timely collaboration, and minimizes delays in project workflows."
    },
    {
        url:"",
        title:"Collaborative Features",
        description:"Foxcolab enhances collaboration through interactive features such as commenting, annotation, and real-time co-editing. Users can leave comments directly on files, annotate documents for feedback or clarification, and collaborate simultaneously on files through real-time co-editing capabilities. These features promote teamwork, facilitate efficient communication, and streamline the collaborative process within teams."
    },
    {
        url:"",
        title:"Audit Trails",
        description:"Foxcolab provides comprehensive audit trails that offer visibility into file activities and user interactions. Administrators can track file access, modifications, and sharing activities across the platform, ensuring compliance with organizational policies and regulatory requirements. Audit trails also enable administrators to monitor data security, identify potential risks, and maintain accountability among users, enhancing overall data governance and integrity."
    },
]


function FileSharing() {
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
                <div className='uppercase font-semibold text-[0.9rem]'>File Sharing </div>
                <div className='hp_title'>Seamless File Sharing</div>
                <div className='hp_subtitle'>Foxcolab enables effortless file sharing among team members, supporting documents, images, videos, and more for streamlined collaboration and productivity.</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10 mb-4'>How to share files?</div>
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
            title='How secure is file sharing in Foxcolab?'
            answer={`<div>
            File sharing in Foxcolab prioritizes security through multiple layers of protection. All file transfers are encrypted using industry-standard protocols, ensuring that data remains secure during upload, download, and storage. Encryption safeguards sensitive information against unauthorized access and interception, providing peace of mind for users concerned about data security.
              </div>`}
            
            />
             <FAQ
            title='What types of files can be shared on Foxcolab?'
            answer={`<div>
            Foxcolab supports a wide variety of file types to accommodate diverse collaboration needs. Users can share documents (such as Word documents, PDFs, and spreadsheets), presentations (like PowerPoint slides), images (including JPEGs and PNGs), videos, audio files, and more. This versatility enables teams to collaborate effectively with different types of content without restrictions on file formats
              </div>`}
            
            />
             <FAQ
            title='How can administrators manage file access and permissions?'
            answer={`<div>
            Administrators in Foxcolab have extensive control over file access and permissions. They can define access levels based on user roles, project requirements, or specific folders. This includes setting permissions for viewing, editing, downloading, and sharing files. Granular control over permissions ensures that sensitive data is accessible only to authorized personnel, maintaining confidentiality and compliance with organizational policies.
              </div>`}
            
            />
             <FAQ
            title='Does Foxcolab offer version control for shared files?'
            answer={`<div>
            Yes, Foxcolab includes robust version control capabilities to manage file revisions effectively. Whenever a file is edited or updated, the platform automatically maintains a version history. Users can access previous versions of files, compare changes, and revert to earlier versions if necessary. Version control minimizes confusion, promotes collaboration, and ensures that teams work with the most up-to-date information.
              </div>`}
            
            />
             <FAQ
            title='Can files from external storage or other platforms be integrated with Foxcolab?'
            answer={`<div>
            Absolutely! Foxcolab supports seamless integration with various third-party storage solutions and productivity tools. This integration allows users to synchronize files across different platforms, ensuring that data is centralized and accessible from within Foxcolab. Whether integrating with cloud storage providers like Google Drive or OneDrive, or project management tools such as Asana or Trello, Foxcolab enhances workflow efficiency and collaboration by facilitating easy access to shared files.
              </div>`}
            
            />
             <FAQ
            title='How do notifications and alerts work for file activities in Foxcolab?'
            answer={`<div>
            Foxcolab keeps users informed with real-time notifications and alerts regarding file activities. Users receive notifications when files are uploaded, downloaded, commented on, or edited. These notifications ensure that team members are promptly notified of relevant updates and changes, promoting transparency, facilitating timely collaboration, and reducing delays in project workflows.
              </div>`}
            
            />
             <FAQ
            title='What collaborative features are available for shared files in Foxcolab?'
            answer={`<div>
            Foxcolab enhances collaboration through interactive features designed to facilitate teamwork and feedback exchange. Users can leave comments directly on files, annotate documents for clarity or feedback, and collaborate in real time with co-editing capabilities. These collaborative tools promote effective communication, streamline the review process, and empower teams to work together efficiently on shared documents and projects.
              </div>`}
            
            />
             <FAQ
            title='How does Foxcolab ensure compliance and accountability with file sharing activities?'
            answer={`<div>
            Foxcolab maintains comprehensive audit trails that provide visibility into file activities and user interactions. Administrators can track file access, modifications, and sharing activities across the platform. Audit trails enable organizations to monitor data security, ensure compliance with regulatory requirements, and maintain accountability among users. This transparency enhances data governance, integrity, and trustworthiness within Foxcolab's file sharing environment.
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

export default FileSharing
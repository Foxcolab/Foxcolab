import React from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { AiFillMessage } from 'react-icons/ai';
import { FaPollH, FaRobot, FaStickyNote, FaWpforms } from 'react-icons/fa';
import { SiFiles } from 'react-icons/si';
import { PiExamFill } from 'react-icons/pi';
import { MdForum, MdVideoLibrary } from 'react-icons/md';
import { BsFileEarmarkSpreadsheetFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { LucideMessagesSquare } from 'lucide-react';



const items = [
    {
      icon:<AiFillMessage/>,
      name:"Channel",
      description:"Organize team discussions and share files in designated spaces."
    },
    {
      icon:<FaStickyNote/> ,
      name:"Canvas",
      description:"Create and collaborate on dynamic project boards and documents"
    },
    {
      icon: <FaPollH/>,
      name:"Polls",
      description:"Gather quick feedback and opinions from team members efficiently."
    },
    {
      icon:<FaWpforms/> ,
      name:"Forms",
      description:"Create customizable forms to collect structured data and responses."
    },
    {
      icon:<SiFiles/> ,
      name:"Files",
      description:"Share and collaborate on documents, images, and files seamlessly."
    },
    {
      icon: <PiExamFill/>,
      name:"Assessment",
      description:"Conduct quizzes or surveys to evaluate knowledge or opinions."
    },
    {
      icon: <MdForum/>,
      name:"Forum",
      description:"Host open discussions and exchange ideas within dedicated forums"
    },
    {
      icon: <BsFileEarmarkSpreadsheetFill/>,
      name:"Spreadsheet",
      description:"Manage and analyze data with collaborative, Excel-like spreadsheets."
    },
    {
        icon:<FaRobot/> ,
        name:"Bot",
        description:"Automate tasks and provide updates with Foxcolab's integrated bot."
      },
      {
        icon:<RiMessage2Fill/> ,
        name:"Direct Message",
        description:"Send private messages for one-on-one communication within teams."
      },
      {
        icon: <LucideMessagesSquare size={32} />,
        name:"Threads",
        description:"Reply and discuss specific messages in organized conversation threads."
      },
      {
        icon:<MdVideoLibrary/> ,
        name:"Voice & Video Message",
        description:"Record and send voice and video messages for clearer communication."
      },
  ]

function CompareFeatures() {
  return (
    <>
    
    <div className='my-10'>
        <div className='text-center font-semibold text-[2rem] mb-8'>Most important features</div>
        <div>
          <div className='grid_four mx-[10rem] shadow-md  border overflow-hidden'>
            {
              items.map((item, i)=>(
                <div className='h-[12.5rem]  border p-6 text-left' key={i}>
                <div className='text-[2.5rem]  '>{item.icon}</div>
                <div className='font-semibold text-[1.1rem] my-1'>{item.name}</div>
                <div className='text-gray-700 text-[0.95rem]'>{item.description}</div>
              </div>
              ))
            }
           
            
          </div>
        </div>
        </div>

    
    </>
  )
}

export default CompareFeatures
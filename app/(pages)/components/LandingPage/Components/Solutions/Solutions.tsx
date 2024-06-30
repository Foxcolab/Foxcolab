import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { AiOutlineDollar } from 'react-icons/ai';
import { FaChartPie, FaPaperPlane } from 'react-icons/fa';
import { FaComputer, FaUserDoctor } from 'react-icons/fa6';
import { MdEngineering } from 'react-icons/md';
import { RiDoubleQuotesL, RiDoubleQuotesR, RiGraduationCapFill } from 'react-icons/ri'

const items = [
    {
        icon:<RiGraduationCapFill/>,
        name:"Education"
    },
    {
        icon:<AiOutlineDollar/>,
        name:"Finance"
    },
    {
        icon:<FaComputer/>,
        name:"Technology"
    },
    {
        icon:<MdEngineering/>,
        name:"Engineering"
    },
    {
        icon:<FaUserDoctor/>,
        name:"Health"
    },
    {
        icon:<FaChartPie/>,
        name:"Marketing"
    }
]


function Solutions() {
    const [state, setState] = useState("Education");
  return (
    <>
    
    <div className="pt-24 pb-8">
    <div className='landling_feature_title' ><span className='double_quote'><sup><RiDoubleQuotesL/> </sup></span> Every team, side-by-side <span className='double_quote'><sup><RiDoubleQuotesR/></sup> </span></div>

    <div className='flex items-center justify-center flex-wrap gap-4 mt-4'>
        {
            items.map((item, index)=>(
                <div key={index} className={cn('solution_item', state===item.name ? "solution_item_bg_none" : "")}>
                    <button className="flex items-center justify-center w-full h-full flex-col gap-2" onClick={()=>setState(item.name)}>
                    <span>{item.icon}</span>
                    <div className="solution_item_name">{item.name}</div>
                    </button>
                </div>
            ))
        }
    </div>
    
    <div className='text-center w-full flex items-center justify-center py-8 '>
                <div className='text-[1.2rem] font-semibold w-[85s0px] text-gray-600 '>
                    {
                        state==="Education" ? "Enhance learning with interactive discussions, resource sharing, and collaborative projects for students and educators" :
                        state==="Finance" ? "Streamline financial operations with secure communication, data sharing, and project management tools." :
                        state==="Technology" ? "Boost innovation and efficiency in tech teams with real-time collaboration and project tracking." : 
                        state==="Engineering" ? "Coordinate engineering projects with collaborative design, documentation, and task management features." : 
                        state==="Health" ? "Ensure secure, compliant communication and data sharing among healthcare professionals and patients."  :
                        
                        state==="Marketing" ? "Collaborate on campaigns, share creative assets, and track project progress in real-time" :
                         ""
                    }
                </div>
            </div>

                    <div className="flex items-center justify-center">
    {
                state==="Education" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                <div className='useful_feat_image'>
                <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Education_Frontpage+(1).png'} height={100} width={100} alt='' unoptimized />
                </div>
                </div> :
                state==="Finance" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                    <div className='useful_feat_image'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Finance+Section_Poll.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Technology" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                    <div className='useful_feat_image'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Engineering" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                    <div className='useful_feat_image'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Engineering+Section_Test+(2).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Health" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                    <div className='useful_feat_image'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Health+Section_Channel.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Marketing" ? 
                <div className='useful_feat_list' id="home_feature_ui">
                    <div className='useful_feat_image'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Sales+Section_Note.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
               
               ''



            }


</div>




    </div>
    
    
    </>
  )
}

export default Solutions
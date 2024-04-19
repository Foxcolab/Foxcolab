import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { AiOutlineDollar } from 'react-icons/ai';
import { FaChartPie, FaPaperPlane } from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6';
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
        icon:<FaPaperPlane/>,
        name:"Product"
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
    <div className='text-[2.8rem] text-center font-semibold flex items-center gap-1 justify-center'><span className=''><sup><RiDoubleQuotesL/> </sup></span> Every team, side-by-side <span className=''><sup><RiDoubleQuotesR/></sup> </span></div>

    <div className='flex items-center justify-center gap-4 mt-4'>
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
    
    {
                state==="Education" ? 
                <div className='secondary_hero' id="home_feature_ui">
                <div className='channel_ui_container'>
                <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype.png'} height={100} width={100} alt='' unoptimized />
                </div>
                </div> :
                state==="Finance" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Technology" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Engineering" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Product" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                state==="Marketing" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
               
               ''



            }







    </div>
    
    
    </>
  )
}

export default Solutions
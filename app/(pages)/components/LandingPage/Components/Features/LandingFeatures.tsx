import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { BiSolidSpreadsheet } from 'react-icons/bi';
import { BsFileSpreadsheetFill } from 'react-icons/bs';
import { FaHashtag, FaRobot, FaWpforms } from 'react-icons/fa';
import { FaNoteSticky, FaSquarePollVertical } from 'react-icons/fa6';
import { MdForum } from 'react-icons/md';
import { PiExamFill } from 'react-icons/pi';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'
import { SiFiles } from 'react-icons/si';


const ChannelUiPic = 'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype.png'

function LandingFeatures() {
    const [Feature, setFeature] = useState("Channel");
  return (
    <>
    
    <div className='pt-24 pb-8'>
        <div className='text-[2.2rem] text-center font-semibold flex items-center gap-1 justify-center'><span className=''><sup><RiDoubleQuotesL/> </sup></span> One Team Collabration Platform for all your needs <span className=''><sup><RiDoubleQuotesR/></sup> </span></div>


        <div className='mt-8'>
            <div className='flex gap-16 justify-center featured_buttons'>
                <button onClick={()=>setFeature("Channel")} className={cn('chan_ho_feature2', Feature==="Channel" ? "chan_ho_feature" : "")}><span><FaHashtag/></span> Channel</button>
                <button onClick={()=>setFeature("Forum")} className={cn('formu_ho_feature2', Feature==="Forum" ? "formu_ho_feature" : "")}><span><MdForum/></span> Forum</button>
                
                <button onClick={()=>setFeature("Canvas")}  className={cn('can_ho_feature2', Feature==="Canvas" ? "can_ho_feature" : "")}><span><FaNoteSticky/></span> Canvas</button>
                <button onClick={()=>setFeature("Bot")}  className={cn('bot_ho_feature2', Feature==="Bot" ? "bot_ho_feature" : "")}><span ><FaRobot/></span> Bot</button>
                <button onClick={()=>setFeature("Forms")}  className={cn('form_ho_feature2', Feature==="Forms" ? "form_ho_feature" : "")}><span><FaWpforms/></span> Forms</button>
               
                <button onClick={()=>setFeature("Polls")}  className={cn('poll_ho_feature2', Feature==="Polls" ? "poll_ho_feature" : "")}><span><FaSquarePollVertical/></span> Polls</button>
                <button onClick={()=>setFeature("File")}  className={cn('file_ho_feature2', Feature==="File" ? "file_ho_feature" : "")}><span><SiFiles/></span> Files</button>
                <button onClick={()=>setFeature("Assessment")} className={cn('asse_ho_feature2', Feature==="Assessment" ? "asse_ho_feature" : "")}><span><PiExamFill/></span> Test</button>
                <button onClick={()=>setFeature("SpreadSheets")}  className={cn('sheet_ho_feature2', Feature==="SpreadSheets" ? "sheet_ho_feature" : "")}><span className=''><BiSolidSpreadsheet/></span> Table</button>
            </div>

            {
                Feature==="Channel" ? 
                <div className='secondary_hero' id="home_feature_ui">
                <div className='channel_ui_container'>
                <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Finance_Frontpage.png'} height={100} width={100} alt='' unoptimized />
                </div>
                </div> :
                Feature==="Forum" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                Feature==="Canvas" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(4).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Bot" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(5).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Polls" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(2).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Assessment" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2+(1).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="SpreadSheets" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={ChannelUiPic} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Forms" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={ChannelUiPic} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="File" ? 
                <div className='secondary_hero' id="home_feature_ui">
                    <div className='channel_ui_container'>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(6).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
               ''



            }


        </div>












    </div>
    
    
    </>
  )
}

export default LandingFeatures
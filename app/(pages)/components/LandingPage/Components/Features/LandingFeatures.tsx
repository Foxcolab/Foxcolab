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
    
    <div className='pt-24 pb-8 '>
        <div className=' landling_feature_title  '><span className='double_quote'><sup><RiDoubleQuotesL/> </sup></span> One Team Collabration Platform for all your needs <span className='double_quote'><sup><RiDoubleQuotesR/></sup> </span></div>


        <div className='mt-8 px-8'>
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

            <div className='text-center w-full flex items-center justify-center py-8'>
                <div className='text-[1.2rem] font-semibold w-[85s0px] text-gray-600 '>
                    {
                        Feature==="Channel" ? "Dedicated spaces for team communication and collaboration on specific topics or projects." :
                        Feature==="Forum" ? "Open discussion areas for engaging conversations and sharing ideas on various topics." :
                        Feature==="Canvas" ? "Flexible workspaces for brainstorming, planning, and organizing projects visually." : Feature==="Bot" ? "Automated assistant providing updates, answering queries, and streamlining repetitive tasks." : 
                        Feature==="Polls" ? "Quickly gather opinions and make decisions with interactive voting and real-time results." : 
                        Feature==="Assessment" ? "Administer and take interactive assessments with instant results and detailed feedback." : Feature==="Spreadsheets" ? "Organize and manage data in spreadsheet-like tables for streamlined project management." : Feature==="Forms" ? "Create and distribute surveys or questionnaires to collect information and feedback efficiently." : "Securely share, store, and manage documents and media within your team."
                    }
                </div>
            </div>

         <div className='flex items-center justify-center'>
         {
                Feature==="Channel" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                <div className='useful_feat_image '>
                <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Finance_Frontpage.png'} height={100} width={100} alt='' unoptimized />
                </div>
                </div> :
                Feature==="Forum" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div>:
                Feature==="Canvas" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(4).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Bot" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(5).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Polls" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(2).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Assessment" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/2+(1).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="SpreadSheets" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={ChannelUiPic} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="Forms" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Form_Frontpage.png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
                Feature==="File" ? 
                <div className='useful_feat_list ' id="home_feature_ui">
                    <div className='useful_feat_image '>
                    <Image src={'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Clean+Modern+Colorful+Blocks+Smart+Home+Dashboard+Desktop+Prototype+(6).png'} height={100} width={100} alt='' unoptimized />
                    </div>
                </div> :
               ''



            }
         </div>


        </div>












    </div>
    
    
    </>
  )
}

export default LandingFeatures
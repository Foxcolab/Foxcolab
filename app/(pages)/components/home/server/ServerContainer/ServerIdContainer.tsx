"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md';
import Invite from '../../../inviteCode/Invite';
import { TbChartArrows, TbOctagonPlus } from 'react-icons/tb';
import { FaInfoCircle } from 'react-icons/fa';
import { PiShieldPlusFill } from 'react-icons/pi';
import CreateGuide from '../Guide/CreateGuide';
import { Guide } from '@prisma/client';
import { format } from 'date-fns';
import { TiMediaRecord } from 'react-icons/ti';
import SingleGuide from '../Guide/SingleGuide';

interface Props {
  serverName:string
  inviteCode:string
  userName:string
  serverDescription:string
  totalMember:number
  guides:Guide[]
  memberId:string
  isAdmin:boolean
  serverLogo:string | null
  serverCover:string | null
}
function ServerIdContainer({serverName, inviteCode, userName, serverDescription, totalMember, guides, memberId, isAdmin, serverCover, serverLogo}:Props) {
const HomeBanner = 'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Green+Nature+Landscape+Notes+Desktop+Wallpaper+(1056+x+330+px).png';
const Logo = "https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png";

  const [inviteOpen,setInvite] = useState(false);
  const [guideOpen, setGuide] = useState(false);
  const [guideDetails, setGuideDetails] = useState(false);
  const [singleGuide, setSingleGuide] = useState<null | Guide>(null);

  return (
    <>
    
    <div className='saved_all_container p-4'>
      {/* Banner Logo  */}
      <div className='discv' style={{padding:"0"}}>
        <div className="search_container" style={{minHeight:"150px"}}>
          <Image  style={{borderRadius:"0.3rem"}} src={serverCover===null || serverCover===undefined ? HomeBanner : serverCover} height={100} width={100} alt='' unoptimized  />
          <div className='server_home_logo shadow'>
            <Image  style={{borderRadius:"0.3rem"}} src={serverLogo===null || serverCover===undefined ? Logo : serverLogo} height={100} width={100} alt='' unoptimized  />
          </div>
        </div>
      </div>
      {/* Title  */}
      <div className='py-2'>
        <div className='flex items-center justify-between px-4'> 
          <div className='text-[2rem] font-bold flex items-center gap-2'><div>{serverName} </div><span className="text-[#1d9bd1]"><MdVerified/></span> </div> 
          <div><button className='px-6 py-[0.35rem] rounded-sm bg-green-500 text-[0.95rem] font-semibold text-white hover:bg-green-600' onClick={()=>setInvite(true)}>Invite</button></div>
        </div>
      </div>
      <hr />
      <div className='py-4 flex  w-full'>
        <div className='w-[70%] '>
          <div className='border border-l-0 border-t-0 border-b-0 border-r-2 mr-2'>
            <div className='flex items-center  justify-between gap-2 pr-2'>
              <div className='text-[1.2rem] font-semibold flex items-center gap-2'> <span><TbChartArrows/> </span> Server Guides</div>
              {
                isAdmin && <div className='flex items-center gap-1 border rounded-sm bg-cyan-700 text-white px-4 py-[0.35rem] text-sm cursor-pointer font-semibold' onClick={()=>setGuide(true)}><span className="text-[1.1rem]"><TbOctagonPlus/></span> <span>New Guide</span></div>
              }
              
            </div>
            {/* GUIDES  */}
            <div className='pr-2'>
            {
              guides && guides.map((guide)=>(
                <>
                <div key={guide.id} onClick={()=>{setGuideDetails(true);setSingleGuide(guide)}}>
                  <div className="single_forums w-full shadow">
                    <div className='forums_description w-full'>
                      <div className='forums_title'>{guide.title}</div>
                      <div> 
                        {/* <span className="forum_createdBy">{guide?.createdMember?.user?.name}:</span> */}
                        <span style={{color:"var(--color3)"}} className='overflow_hidden'>{guide?.content[0]?.content[0]?.text}</span>
                      </div>
                      <div className='forum_Desc'>
                        <span className='flex items-center gap-1'><TiMediaRecord/> {format(new Date(guide.createdAt), 'dd MMM, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                </>
              ))
            }
            </div>



          </div>









        </div>
        <div className='w-[30%] server_hm_about shadow-md'>
          <div className='text-[1.1rem] font-semibold flex items-center gap-2 '> <span><FaInfoCircle /> </span> About</div>
          <div style={{color:"var(--color3)"}} className='text-[0.95rem]'>{serverDescription} provide feedback regarding the web version.
              feedback-extension - offer insights on the browser extension.
              ⁠feedback-ios - share your feedback and suggestions related t</div>
        </div>
      </div>
      <div>

      </div>





    </div>
    {
      inviteOpen && 
    <Invite open={inviteOpen} setOpen={setInvite} userName={userName} inviteCode={inviteCode} serverName={serverName} />
    }
    {
      guideOpen && 
      <CreateGuide open={guideOpen} setOpen={setGuide} />
    }
    {
      singleGuide && 
      <SingleGuide open={guideDetails} setOpen={setGuideDetails} guide={singleGuide} memberId={memberId} isAdmin={isAdmin} />
    }
    
    </>
  )
}

export default ServerIdContainer;
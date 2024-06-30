import { Server } from '@prisma/client';
import React from 'react'
import { BsSearch } from "react-icons/bs";
import {RiRadioButtonLine} from "react-icons/ri"
import Banner from "../../../pic1.jpg";
import Image from 'next/image';
import { MdOutlineVerified, MdVerified } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { GoDotFill } from 'react-icons/go';
interface Props {
    selectedState:string
    servers:Server[]
}

const HomeBanner = 'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Green+Nature+Landscape+Notes+Desktop+Wallpaper+(1056+x+330+px).png';
const CreativeArts = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Minimalist+Abstract+Desktop+Wallpaper+(1056+x+330+px).png";
const Language ='https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Cream+and+Brown+Aesthetic+Quotes+Desktop+Wallpaper++(1056+x+330+px).png'
const Culture = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/beige+aesthetic+abstract+shape+twitter+header+(1056+x+330+px).png";
const Education = 'https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/_White+and+Colorful+Abstract+Leaf+Desktop+Wallpaper+(1056+x+330+px).png';
const Tourism = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Green+and+Grey+Simple+Watercolor+Nature+Desktop+Wallpaper+(1056+x+330+px).png";
const Literature = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Green+and+Blue+Illustrated+Watercolor+Summer+Landscape+Desktop+Wallpaper+(1056+x+330+px).png";
const Technology = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Beige+Brown+Cute+Illustration+Desert+Desktop+Wallpaper+(1056+x+330+px).png";

const Job = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Blue+Green+Watercolor+Nature+Desktop+Wallpaper+(1056+x+330+px).png"

const Round = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/Modern+Hand+Drawn+Abstract+Painting+Desktop+Wallpaper+(1056+x+330+px)+(1).png";

const Colors = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/wepik-abstract-colorful-healthy-fresh-recipes-youtube-banner-20240416124450GVQE.png";

const RedBanner = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/wepik-green-and-orange-painted-wallpaper-20240416105350uovQ+(1).png"

const CyanBanner = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/wepik-hand-painted-blue-background-20240416095755rZwu+(1).png";

const Politics = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/wepik-minimalist-flat-landscape-desktop-wallpaper-20240416111524k5Xa.png"

const cover = "https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/pexels-codioful-7130560+(1).jpg"
const logo = "https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg";
function DiscoverContent({selectedState, servers}:Props) {

    const router = useRouter();
    
    const hrefHandler =(id:string)=>{
        router.push(`/servers/${id}`);
    }
  return (
    <>
    <div className="discv">
    <div className='search_container'>
        {
            selectedState==="Creative Arts & Media" ? 
            <Image src={Colors} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Books" ? 
            <Image src={CreativeArts} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Languages" ? 
            <Image src={Language} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Sports & Games" ? 
            <Image src={Language} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Politics & Society" ? 
            <Image src={Politics} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Culture & Spiritual" ? 
            <Image src={Round} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Entertainment" ? 
            <Image src={Culture} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Education" ? 
            <Image src={Education} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Science & Mathematics" ? 
            <Image src={CyanBanner} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Tourism" ? 
            <Image src={Tourism} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Literature" ? 
            <Image src={RedBanner} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Business & Management" ? 
            <Image src={Literature} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Technology" ? 
            <Image src={Technology} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Assessment" ? 
            <Image src={RedBanner} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Law" ? 
            <Image src={Technology} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="CBSE" ? 
            <Image src={Education} height={100} width={100} alt='' unoptimized  /> :

            selectedState==="Job Portal" ? 
            <Image src={Job} height={100} width={100} alt='' unoptimized  /> :
            selectedState==="Finance" ? 
            <Image src={CyanBanner} height={100} width={100} alt='' unoptimized  /> :
            <Image src={HomeBanner} height={100} width={100} alt='' unoptimized  />
        }
 
        <div className='disc_search_content'>
        <div className='cont'>
        <div className="main_heading">Find your community on Foxcolab</div>
        <div className='sub_heading'>From Science, AI, Education, to business there's place for you </div>
        <div className='search_inp'><input type="text" placeholder='Explore Coummunities' /><BsSearch/></div>
    
        </div>
        </div>
        </div>
     
    <div className='featured_heading my-4 mx-2'>{selectedState}</div>
    <div className="card_container">
     {
        selectedState==="Home" ? 
        <>
        
        {
            servers && servers.map((server)=>(
            <>
            <div className='featured_card shadow' key={server.id} onClick={()=>hrefHandler(server.id)}>
                <div className='featured_card_upper'>
                <div className='server_coverdv'>
                    <Image src={server?.coverPic?.publicUrl===null || server.coverPic?.publicUrl===undefined ? cover : server?.coverPic?.publicUrl} unoptimized height={100} width={100} alt='' />
                </div>
                <div className='server_up_logo'>
                <Image src={server?.displayPicture?.publicUrl===null || server?.displayPicture?.publicUrl===undefined ? logo : server?.displayPicture?.publicUrl } unoptimized height={100} width={100} alt='' />
                </div>
                </div>
                <div className='featured_n'>
                <div className="font-bold text-[1.2rem] dark:text-white text-black  flex items-center gap-1"><span className='text-[1.1rem] text-[#1d9bd1]'><MdVerified/> </span>{server.name}</div>
                < div className="description overflow_hidden">{server.description} </div>
                <div className='member pb-2'>
                <div className=''>
                <span className='text-green-600 text-[1.1rem]'> <GoDotFill/></span>  {server?._count?.Members} Member
                </div>
            </div>
            </div>
        </div>
            
             </>
            ))
        }

        
        </> : ""
     }
    
     {
        servers && servers.map((server)=>(
            <>
            {
                server.serverType===selectedState && 
                <div className='featured_card shadow' key={server.id} onClick={()=>hrefHandler(server.id)}>
                <div className='featured_card_upper'>
                <div className='server_coverdv'>
                    <Image src={server?.coverPic?.publicUrl===null || server.coverPic?.publicUrl===undefined ? cover : server?.coverPic?.publicUrl} unoptimized height={100} width={100} alt='' />
                </div>
                <div className='server_up_logo'>
                <Image src={server?.displayPicture?.publicUrl===null || server?.displayPicture?.publicUrl===undefined ? logo : server?.displayPicture?.publicUrl } unoptimized height={100} width={100} alt='' />
                </div>
                </div>
                <div className='featured_n'>
                <div className="font-bold text-[1.2rem] dark:text-white text-black  flex items-center gap-1"><span className='text-[1.1rem] text-[#1d9bd1]'><MdVerified/> </span>{server.name}</div>
                < div className="description overflow_hidden">{server.description} </div>
                <div className='member pb-2'>
                <div className=''>
                <span className='text-green-500 text-[1.1rem]'> <GoDotFill/></span>  {server?._count?.Members} Member
                </div>
            </div>
            </div>
        </div>
            }
            
            </>
        ))
     }


       
        
    </div>
    </div> 
    
    
    </>
  )
}

export default DiscoverContent
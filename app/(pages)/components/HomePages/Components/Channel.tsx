"use client";
import React, { useEffect } from 'react'
import HeaderFooter from './HeaderFooter'
import Link from 'next/link'
import FAQ from '../Feature/FAQ/FAQ'
import ChoseBetter from './ChoseBetter'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useTheme } from 'next-themes'
import { GoDotFill } from 'react-icons/go';
import Image from 'next/image';


const Items = [
    {   url:"",
        title:"Organise your work",
        description:"Channels bring order and clarity to work – you can create them for every project, topic or team. When there’s a channel for everything, you can focus on the conversations and work that matters most to you."
    },
    {
        url:"",
        title:"Create alignment",
        description:"Channels provide you and your team with a shared view into the work being done. With access to the same information, everyone in the channel can work in sync, and new members have full context when they join. And whenever you want to talk, simply use Foxcolab huddles to start a live voice conversation.        "
    },
    {
        url:"",
        title:"Be more productive",
        description:"As you work in channels, your conversations and files become a searchable archive that gets more useful with time. Find answers, get context and make better decisions without having to chase down people or information."
    },
    
]

function Channel() {
    const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
        // if(resolvedTheme==="")
      }, []);
  return (
    <>
    
    <HeaderFooter>

    <div className="">
        <div className='hp_hero'>
            <div className='hp_container'>
                <div className='uppercase font-semibold text-[0.9rem]'>Channels </div>
                <div className='hp_title'>Discover a new way of working</div>
                <div className='hp_subtitle'>Bring the right people and information together in <br /> channels. Share ideas, make decisions and move work <br /> forward with a common purpose and place.</div>
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
            <div className='text-[1.8rem] font-bold text-center leading-10 mb-4'>What is a channel?</div>
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
            <div className='text-center font-semibold text-[1.8rem] px-4'>Work together in dedicated spaces</div>
            <div className='text-center text-[1.1rem] px-4'>Channels are flexible spaces for all the people, tools and files that you need to get work done – no matter how you work.
            </div>

            <div className="grid_three mx-0 md:mx-8">
                <div className='py-8 px-8  md:px-16'>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2321 25.4561H4.0001C3.62879 25.4561 3.2727 25.3086 3.01015 25.046C2.7476 24.7835 2.6001 24.4274 2.6001 24.0561V4.0001C2.6022 3.62944 2.75037 3.27457 3.01247 3.01247C3.27457 2.75037 3.62944 2.6022 4.0001 2.6001H24.0561C24.4274 2.6001 24.7835 2.7476 25.046 3.01015C25.3086 3.2727 25.4561 3.62879 25.4561 4.0001V17.1761C25.4561 17.4413 25.5615 17.6957 25.749 17.8832C25.9365 18.0707 26.1909 18.1761 26.4561 18.1761C26.7213 18.1761 26.9757 18.0707 27.1632 17.8832C27.3507 17.6957 27.4561 17.4413 27.4561 17.1761V4.0001C27.454 3.09901 27.0951 2.23543 26.4579 1.59827C25.8208 0.961102 24.9572 0.60221 24.0561 0.600098H4.0001C3.09901 0.60221 2.23543 0.961102 1.59827 1.59827C0.961102 2.23543 0.60221 3.09901 0.600098 4.0001V24.0561C0.600098 24.5026 0.688041 24.9447 0.858907 25.3572C1.02977 25.7697 1.28022 26.1445 1.59593 26.4603C1.91165 26.776 2.28647 27.0264 2.69897 27.1973C3.11148 27.3681 3.5536 27.4561 4.0001 27.4561H14.2321C14.4973 27.4561 14.7517 27.3507 14.9392 27.1632C15.1267 26.9757 15.2321 26.7213 15.2321 26.4561C15.2321 26.1909 15.1267 25.9365 14.9392 25.749C14.7517 25.5615 14.4973 25.4561 14.2321 25.4561V25.4561Z" fill="#1D1C1D"></path><path d="M25.3603 24.92C24.9982 24.9158 24.6523 24.769 24.3977 24.5114C24.1431 24.2538 24.0003 23.9062 24.0003 23.544C24.0008 23.3173 24.0586 23.0944 24.1683 22.896H24.0003C23.5731 22.896 23.1555 23.0227 22.8003 23.26C22.4451 23.4974 22.1682 23.8347 22.0048 24.2294C21.8413 24.6241 21.7985 25.0584 21.8818 25.4774C21.9652 25.8964 22.1709 26.2813 22.473 26.5833C22.7751 26.8854 23.1599 27.0911 23.5789 27.1745C23.9979 27.2578 24.4322 27.2151 24.8269 27.0516C25.2216 26.8881 25.559 26.6112 25.7963 26.256C26.0337 25.9008 26.1603 25.4832 26.1603 25.056C26.1682 24.9361 26.1682 24.8159 26.1603 24.696C25.9238 24.8528 25.6439 24.9311 25.3603 24.92V24.92Z" fill="#1D1C1D"></path><path d="M31.3519 24.6802C30.7383 23.2347 29.7129 22.0018 28.4034 21.135C27.0939 20.2683 25.5583 19.8062 23.9879 19.8062C22.4176 19.8062 20.882 20.2683 19.5725 21.135C18.263 22.0018 17.2375 23.2347 16.6239 24.6802C16.5284 24.9135 16.5284 25.175 16.6239 25.4082C17.2375 26.8537 18.263 28.0867 19.5725 28.9534C20.882 29.8201 22.4176 30.2823 23.9879 30.2823C25.5583 30.2823 27.0939 29.8201 28.4034 28.9534C29.7129 28.0867 30.7383 26.8537 31.3519 25.4082C31.4396 25.1735 31.4396 24.915 31.3519 24.6802V24.6802ZM23.9999 28.2962C22.8988 28.2982 21.8185 27.996 20.8783 27.4228C19.9381 26.8497 19.1746 26.0279 18.6719 25.0482C19.1757 24.0692 19.9394 23.248 20.8793 22.6746C21.8192 22.1012 22.8989 21.7978 23.9999 21.7978C25.1009 21.7978 26.1806 22.1012 27.1205 22.6746C28.0604 23.248 28.8242 24.0692 29.3279 25.0482C28.8253 26.0279 28.0617 26.8497 27.1215 27.4228C26.1813 27.996 25.1011 28.2982 23.9999 28.2962V28.2962Z" fill="#1D1C1D"></path><path d="M18.4719 17.2722C18.7265 17.2722 18.9707 17.1711 19.1507 16.991C19.3307 16.811 19.4319 16.5668 19.4319 16.3122C19.4319 16.0576 19.3307 15.8134 19.1507 15.6334C18.9707 15.4534 18.7265 15.3522 18.4719 15.3522H16.7439L17.2399 11.9442H19.1999C19.3328 11.9564 19.4668 11.9407 19.5933 11.8982C19.7198 11.8557 19.836 11.7873 19.9346 11.6973C20.0331 11.6074 20.1119 11.4978 20.1657 11.3758C20.2196 11.2537 20.2474 11.1217 20.2474 10.9882C20.2474 10.8548 20.2196 10.7228 20.1657 10.6007C20.1119 10.4786 20.0331 10.3691 19.9346 10.2791C19.836 10.1892 19.7198 10.1208 19.5933 10.0782C19.4668 10.0357 19.3328 10.0201 19.1999 10.0322H17.5199L17.7519 8.47222C17.7787 8.3441 17.7791 8.21184 17.7529 8.08358C17.7268 7.95531 17.6746 7.83376 17.5998 7.72638C17.5249 7.61899 17.4289 7.52806 17.3176 7.45916C17.2062 7.39026 17.082 7.34485 16.9525 7.32573C16.823 7.30661 16.691 7.31417 16.5645 7.34795C16.438 7.38174 16.3198 7.44103 16.2171 7.52219C16.1144 7.60334 16.0294 7.70465 15.9673 7.81987C15.9051 7.9351 15.8672 8.06181 15.8559 8.19222L15.5839 10.0322H13.0639L13.2959 8.47222C13.3171 8.22848 13.2444 7.98583 13.0927 7.79385C12.9411 7.60188 12.7218 7.47506 12.4798 7.43932C12.2377 7.40358 11.9912 7.4616 11.7904 7.60153C11.5897 7.74147 11.45 7.95275 11.3999 8.19222L11.1279 10.0322H8.79989C8.667 10.0201 8.53303 10.0357 8.40653 10.0782C8.28003 10.1208 8.16379 10.1892 8.06522 10.2791C7.96664 10.3691 7.88791 10.4786 7.83404 10.6007C7.78017 10.7228 7.75235 10.8548 7.75235 10.9882C7.75235 11.1217 7.78017 11.2537 7.83404 11.3758C7.88791 11.4978 7.96664 11.6074 8.06522 11.6973C8.16379 11.7873 8.28003 11.8557 8.40653 11.8982C8.53303 11.9407 8.667 11.9564 8.79989 11.9442H10.8639L10.3679 15.3522H8.04789C7.79328 15.3522 7.5491 15.4534 7.36907 15.6334C7.18903 15.8134 7.08789 16.0576 7.08789 16.3122C7.08789 16.5668 7.18903 16.811 7.36907 16.991C7.5491 17.1711 7.79328 17.2722 8.04789 17.2722H10.0719L9.72789 19.5842C9.69108 19.8344 9.75445 20.089 9.90424 20.2927C10.054 20.4964 10.2781 20.6328 10.5279 20.6722H10.6719C10.8983 20.6716 11.1172 20.591 11.29 20.4446C11.4627 20.2982 11.5782 20.0955 11.6159 19.8722L11.9999 17.2722H14.5199L14.1759 19.5842C14.1391 19.8344 14.2025 20.089 14.3522 20.2927C14.502 20.4964 14.7261 20.6328 14.9759 20.6722H15.1199C15.3468 20.6732 15.5665 20.5932 15.7396 20.4465C15.9127 20.2998 16.0277 20.0962 16.0639 19.8722L16.4479 17.2802L18.4719 17.2722ZM12.2879 15.3522L12.7999 11.9442H15.3199L14.8239 15.3522H12.2879Z" fill="#1D1C1D"></path></svg>
                    </div>
                    <div className='text-left'>
                    <div className='font-semibold my-2'>Public channels</div>
                    <div  className='text-[0.95rem]'>These channels are open for anyone at your company to join or find in search. Increase transparency while allowing everyone to benefit from the context of your conversations.</div>
                    </div>
                </div>
                <div className='py-8 px-8  md:px-16'>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.1999 10.0322H17.5199L17.7519 8.47222C17.7787 8.3441 17.7791 8.21184 17.7529 8.08358C17.7268 7.95531 17.6746 7.83376 17.5998 7.72638C17.5249 7.61899 17.4289 7.52806 17.3176 7.45916C17.2062 7.39026 17.082 7.34485 16.9525 7.32573C16.823 7.30661 16.691 7.31417 16.5645 7.34795C16.438 7.38174 16.3198 7.44103 16.2171 7.52219C16.1144 7.60334 16.0294 7.70465 15.9673 7.81987C15.9051 7.9351 15.8672 8.06181 15.8559 8.19222L15.5839 10.0322H13.0639L13.2959 8.47222C13.3171 8.22848 13.2444 7.98583 13.0927 7.79385C12.9411 7.60188 12.7218 7.47506 12.4798 7.43932C12.2377 7.40358 11.9912 7.4616 11.7904 7.60153C11.5897 7.74147 11.45 7.95275 11.3999 8.19222L11.1279 10.0322H8.79989C8.667 10.0201 8.53303 10.0357 8.40653 10.0782C8.28003 10.1208 8.16379 10.1892 8.06522 10.2791C7.96664 10.3691 7.88791 10.4786 7.83404 10.6007C7.78017 10.7228 7.75235 10.8548 7.75235 10.9882C7.75235 11.1217 7.78017 11.2537 7.83404 11.3758C7.88791 11.4978 7.96664 11.6074 8.06522 11.6973C8.16379 11.7873 8.28003 11.8557 8.40653 11.8982C8.53303 11.9407 8.667 11.9564 8.79989 11.9442H10.8639L10.3679 15.3522H8.04789C7.79328 15.3522 7.5491 15.4534 7.36907 15.6334C7.18903 15.8134 7.08789 16.0576 7.08789 16.3122C7.08789 16.5668 7.18903 16.811 7.36907 16.991C7.5491 17.1711 7.79328 17.2722 8.04789 17.2722H10.0719L9.72789 19.5842C9.69108 19.8344 9.75445 20.089 9.90424 20.2927C10.054 20.4964 10.2781 20.6328 10.5279 20.6722H10.6719C10.8983 20.6716 11.1172 20.591 11.29 20.4446C11.4627 20.2982 11.5782 20.0955 11.6159 19.8722L11.9999 17.2722H14.5199L14.1759 19.5842C14.1391 19.8344 14.2025 20.089 14.3522 20.2927C14.502 20.4964 14.7261 20.6328 14.9759 20.6722H15.1199C15.3468 20.6732 15.5665 20.5932 15.7396 20.4465C15.9127 20.2998 16.0277 20.0962 16.0639 19.8722L16.4479 17.2802H18.4559C18.7105 17.2802 18.9547 17.1791 19.1347 16.999C19.3147 16.819 19.4159 16.5748 19.4159 16.3202C19.4159 16.0656 19.3147 15.8214 19.1347 15.6414C18.9547 15.4614 18.7105 15.3602 18.4559 15.3602H16.7439L17.2399 11.9522H19.1999C19.3328 11.9644 19.4668 11.9487 19.5933 11.9062C19.7198 11.8637 19.836 11.7953 19.9346 11.7053C20.0331 11.6154 20.1119 11.5058 20.1657 11.3838C20.2196 11.2617 20.2474 11.1297 20.2474 10.9962C20.2474 10.8628 20.2196 10.7308 20.1657 10.6087C20.1119 10.4866 20.0331 10.3771 19.9346 10.2871C19.836 10.1972 19.7198 10.1288 19.5933 10.0862C19.4668 10.0437 19.3328 10.0281 19.1999 10.0402V10.0322ZM14.8079 15.3522H12.2879L12.7999 11.9442H15.3199L14.8079 15.3522Z" fill="#1D1C1D"></path><path d="M18.4001 25.4561H4.0001C3.62879 25.4561 3.2727 25.3086 3.01015 25.046C2.7476 24.7835 2.6001 24.4274 2.6001 24.0561V4.0001C2.6022 3.62944 2.75037 3.27457 3.01247 3.01247C3.27457 2.75037 3.62944 2.6022 4.0001 2.6001H24.0561C24.4274 2.6001 24.7835 2.7476 25.046 3.01015C25.3086 3.2727 25.4561 3.62879 25.4561 4.0001V14.9041C25.4561 15.1693 25.5615 15.4237 25.749 15.6112C25.9365 15.7987 26.1909 15.9041 26.4561 15.9041C26.7213 15.9041 26.9757 15.7987 27.1632 15.6112C27.3507 15.4237 27.4561 15.1693 27.4561 14.9041V4.0001C27.454 3.09901 27.0951 2.23543 26.4579 1.59827C25.8208 0.961102 24.9572 0.60221 24.0561 0.600098H4.0001C3.09901 0.60221 2.23543 0.961102 1.59827 1.59827C0.961102 2.23543 0.60221 3.09901 0.600098 4.0001V24.0561C0.600098 24.5026 0.688041 24.9447 0.858907 25.3572C1.02977 25.7697 1.28022 26.1445 1.59593 26.4603C1.91165 26.776 2.28647 27.0264 2.69897 27.1973C3.11148 27.3681 3.5536 27.4561 4.0001 27.4561H18.4001C18.6653 27.4561 18.9197 27.3507 19.1072 27.1632C19.2947 26.9757 19.4001 26.7213 19.4001 26.4561C19.4001 26.1909 19.2947 25.9365 19.1072 25.749C18.9197 25.5615 18.6653 25.4561 18.4001 25.4561V25.4561Z" fill="#1D1C1D"></path><path d="M29.9759 22.112V21.352C29.9759 20.4185 29.6051 19.5231 28.945 18.863C28.2848 18.2029 27.3895 17.832 26.4559 17.832C25.5224 17.832 24.6271 18.2029 23.9669 18.863C23.3068 19.5231 22.9359 20.4185 22.9359 21.352V22.112C22.4557 22.3624 22.053 22.7391 21.771 23.2015C21.4891 23.6639 21.3386 24.1945 21.3359 24.736V28.536C21.3381 29.326 21.6534 30.083 22.2128 30.6409C22.7721 31.1987 23.5299 31.512 24.3199 31.512H28.5839C29.3726 31.5099 30.1283 31.1957 30.686 30.638C31.2436 30.0804 31.5578 29.3247 31.5599 28.536V24.736C31.5588 24.1961 31.4108 23.6667 31.1317 23.2044C30.8527 22.7422 30.4532 22.3646 29.9759 22.112ZM26.4559 19.832C26.8584 19.8341 27.2438 19.9949 27.5284 20.2795C27.813 20.5642 27.9738 20.9495 27.9759 21.352V21.76H24.9359V21.352C24.938 20.9495 25.0989 20.5642 25.3835 20.2795C25.6681 19.9949 26.0535 19.8341 26.4559 19.832V19.832ZM29.5999 28.536C29.5999 28.7949 29.4971 29.0431 29.3141 29.2262C29.131 29.4092 28.8828 29.512 28.6239 29.512H24.3279C24.0683 29.512 23.8193 29.4095 23.635 29.2267C23.4507 29.0438 23.346 28.7956 23.3439 28.536V24.736C23.346 24.4764 23.4507 24.2282 23.635 24.0454C23.8193 23.8626 24.0683 23.76 24.3279 23.76H28.5919C28.7228 23.7557 28.8531 23.7778 28.9753 23.8249C29.0974 23.8721 29.2088 23.9433 29.3029 24.0343C29.3969 24.1254 29.4717 24.2344 29.5227 24.355C29.5737 24.4755 29.6 24.6051 29.5999 24.736V28.536Z" fill="#1D1C1D"></path><path d="M26.504 25.552C26.2809 25.552 26.0628 25.6182 25.8773 25.7421C25.6918 25.8661 25.5472 26.0422 25.4618 26.2483C25.3765 26.4545 25.3541 26.6813 25.3977 26.9001C25.4412 27.1189 25.5486 27.3199 25.7064 27.4776C25.8641 27.6354 26.0651 27.7428 26.2839 27.7863C26.5027 27.8299 26.7295 27.8075 26.9356 27.7221C27.1418 27.6368 27.3179 27.4922 27.4419 27.3067C27.5658 27.1212 27.632 26.9031 27.632 26.68C27.632 26.3808 27.5131 26.0939 27.3016 25.8824C27.0901 25.6708 26.8031 25.552 26.504 25.552V25.552Z" fill="#1D1C1D"></path></svg>
                    </div>
                    <div className='text-left'>
                    <div className='font-semibold my-2'>Private channels</div>
                    <div  className='text-[0.95rem]'>For sensitive or confidential conversations, you can use private channels. Only those who are invited can view the channel or find its contents in search.</div>
                    </div>
                </div>
                <div className='py-8 px-8  md:px-16'>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5998 3.064H16.7438L17.5038 2.264C17.6736 2.07301 17.7638 1.82426 17.756 1.56884C17.7481 1.31341 17.6428 1.07069 17.4615 0.890503C17.2803 0.710316 17.037 0.606341 16.7816 0.599925C16.5261 0.593509 16.2779 0.685139 16.0878 0.856001L13.6878 3.256C13.5947 3.34889 13.5208 3.45924 13.4704 3.58073C13.42 3.70222 13.394 3.83247 13.394 3.964C13.394 4.09554 13.42 4.22578 13.4704 4.34727C13.5208 4.46876 13.5947 4.57911 13.6878 4.672L16.0878 7.072C16.181 7.16601 16.2919 7.24057 16.4142 7.29139C16.5364 7.3422 16.6675 7.36824 16.7998 7.368C16.9311 7.36898 17.0612 7.34325 17.1823 7.29236C17.3033 7.24148 17.4127 7.1665 17.5038 7.072C17.5967 6.97979 17.6704 6.87012 17.7207 6.74929C17.771 6.62847 17.7969 6.49888 17.7969 6.368C17.7969 6.23712 17.771 6.10754 17.7207 5.98671C17.6704 5.86589 17.5967 5.75621 17.5038 5.664L16.8718 5.032H25.5998C25.9705 5.0341 26.3254 5.18228 26.5875 5.44437C26.8496 5.70647 26.9977 6.06135 26.9998 6.432V25.6C26.9977 25.9707 26.8496 26.3255 26.5875 26.5876C26.3254 26.8497 25.9705 26.9979 25.5998 27H21.5998C21.3346 27 21.0803 27.1054 20.8927 27.2929C20.7052 27.4804 20.5998 27.7348 20.5998 28C20.5998 28.2652 20.7052 28.5196 20.8927 28.7071C21.0803 28.8946 21.3346 29 21.5998 29H25.5998C26.5009 28.9979 27.3645 28.639 28.0017 28.0018C28.6388 27.3647 28.9977 26.5011 28.9998 25.6V6.464C28.9977 5.56291 28.6388 4.69934 28.0017 4.06217C27.3645 3.42501 26.5009 3.06611 25.5998 3.064Z" fill="#1D1C1D"></path><path d="M15.888 24.896C15.698 24.7251 15.4497 24.6335 15.1943 24.6399C14.9388 24.6463 14.6955 24.7503 14.5143 24.9305C14.3331 25.1107 14.2277 25.3534 14.2199 25.6088C14.212 25.8642 14.3022 26.113 14.472 26.304L15.168 27H6.4C6.02934 26.9979 5.67447 26.8497 5.41237 26.5876C5.15027 26.3255 5.0021 25.9706 5 25.6V6.46397C5.0021 6.09331 5.15027 5.73843 5.41237 5.47634C5.67447 5.21424 6.02934 5.06607 6.4 5.06397H10.4C10.6652 5.06397 10.9196 4.95861 11.1071 4.77107C11.2946 4.58354 11.4 4.32918 11.4 4.06396C11.4 3.79875 11.2946 3.54439 11.1071 3.35686C10.9196 3.16932 10.6652 3.06396 10.4 3.06396H6.4C5.49891 3.06608 4.63534 3.42497 3.99817 4.06214C3.361 4.6993 3.00211 5.56288 3 6.46397V25.6C3.00211 26.5011 3.361 27.3646 3.99817 28.0018C4.63534 28.639 5.49891 28.9979 6.4 29H15.2L14.504 29.696C14.3658 29.8353 14.2717 30.0122 14.2334 30.2046C14.195 30.3971 14.2142 30.5965 14.2883 30.7782C14.3625 30.9598 14.4885 31.1157 14.6506 31.2262C14.8127 31.3368 15.0038 31.3972 15.2 31.4C15.3313 31.4009 15.4614 31.3752 15.5824 31.3243C15.7035 31.2734 15.8129 31.1985 15.904 31.104L18.304 28.704C18.3971 28.6111 18.471 28.5007 18.5214 28.3792C18.5718 28.2577 18.5978 28.1275 18.5978 27.996C18.5978 27.8644 18.5718 27.7342 18.5214 27.6127C18.471 27.4912 18.3971 27.3809 18.304 27.288L15.888 24.896Z" fill="#1D1C1D"></path><path d="M14.8561 9.35189C14.6066 9.31927 14.3541 9.38427 14.1514 9.53334C13.9487 9.6824 13.8113 9.904 13.7681 10.1519L13.5041 11.9999H11.1521C10.8975 11.9999 10.6533 12.101 10.4733 12.2811C10.2932 12.4611 10.1921 12.7053 10.1921 12.9599C10.1921 13.2145 10.2932 13.4587 10.4733 13.6387C10.6533 13.8187 10.8975 13.9199 11.1521 13.9199H13.2241L12.7201 17.3279H10.4001C10.2672 17.3157 10.1332 17.3314 10.0067 17.3739C9.88022 17.4164 9.76398 17.4848 9.66541 17.5748C9.56684 17.6647 9.4881 17.7743 9.43423 17.8964C9.38036 18.0185 9.35254 18.1504 9.35254 18.2839C9.35254 18.4173 9.38036 18.5493 9.43423 18.6714C9.4881 18.7935 9.56684 18.903 9.66541 18.993C9.76398 19.0829 9.88022 19.1514 10.0067 19.1939C10.1332 19.2364 10.2672 19.2521 10.4001 19.2399H12.4161L12.1041 21.5999C12.0694 21.8497 12.1336 22.1032 12.283 22.3064C12.4324 22.5096 12.6553 22.6465 12.9041 22.6879H13.0481C13.2745 22.6873 13.4934 22.6067 13.6662 22.4603C13.8389 22.3139 13.9543 22.1111 13.9921 21.8879L14.4001 19.2399H16.9281L16.5601 21.5999C16.5254 21.8497 16.5896 22.1032 16.739 22.3064C16.8884 22.5096 17.1113 22.6465 17.3601 22.6879H17.5041C17.7305 22.6873 17.9494 22.6067 18.1222 22.4603C18.2949 22.3139 18.4103 22.1111 18.4481 21.8879L18.8321 19.2879H20.8401C21.0785 19.2661 21.3002 19.1559 21.4616 18.979C21.6231 18.8021 21.7125 18.5713 21.7125 18.3319C21.7125 18.0924 21.6231 17.8616 21.4616 17.6848C21.3002 17.5079 21.0785 17.3977 20.8401 17.3759H19.1201L19.6161 13.9679H21.6001C21.8611 13.9679 22.1113 13.8642 22.2959 13.6797C22.4804 13.4951 22.5841 13.2449 22.5841 12.9839C22.5841 12.7229 22.4804 12.4726 22.2959 12.2881C22.1113 12.1036 21.8611 11.9999 21.6001 11.9999H19.9201L20.1521 10.4399C20.1868 10.1901 20.1226 9.93655 19.9732 9.73334C19.8237 9.53013 19.6009 9.39327 19.3521 9.35189C19.1032 9.31735 18.8507 9.38179 18.6487 9.53136C18.4468 9.68094 18.3116 9.90372 18.2721 10.1519L17.9601 11.9999H15.4401L15.6641 10.4399C15.7007 10.1885 15.6363 9.9329 15.4848 9.72897C15.3334 9.52504 15.1073 9.38945 14.8561 9.35189V9.35189ZM17.6801 13.9199L17.1841 17.3279H14.6561L15.2001 13.9199H17.6801Z" fill="#1D1C1D"></path></svg>
                    </div>
                    <div className='text-left'>
                    <div className='font-semibold my-2'>Foxcolab Connect</div>
                    <div className='text-[0.95rem]'>Bring people from external organisations into secure Foxcolab channels. Speed up communication and get work done with clients, vendors, agencies and more.</div>
                    </div>
                </div>
            </div>

        </div>

        <div className='my-8'>
            <div className='text-center font-semibold text-[2rem] mb-8'>Frequently asked questions</div>
            <div className='mx-8 md:mx-24 border-t'>
            
            <FAQ
            title='How do I connect with an external company?'
            answer={`<div>
                <div>You can invite someone outside your company to share a channel in Foxcolab. Or, skip the channels for now and send an invitation to start exchanging direct messages – just like you would with other DMs!</div>
                <div>
                It really only takes a few clicks to start working closely with vendors, customers and more.
                </div>
              </div>`}
            
            />
            <FAQ
            title='What are the best practice for channels?'
            answer={`
            Channels work best – and help you to work better – when your organisation follows a few basic guidelines around them:
            <ul className='ul_list'>
            <li>Consider turning group chats into channels to make conversations easier to find and reference</li>
            <li><GoDotFill/> Have a consistent naming convention across your organisation’s channels, so everyone can quickly identify which channel has what they need</li>
            <li><GoDotFill/> Ensure that every channel has a clear purpose for why it was created, and include that purpose in the channel description</li>
            <li><GoDotFill/> Update every channel topic to include a clear summary of what everyone is currently working on</li>
            <li><GoDotFill/> Set up new channels by adding relevant information into the channel’s canvas, uploading any important project files and posting a welcome message to kick things off</li>
            <li><GoDotFill/> Add handy reference links into the channel’s bookmarks bar for easy access, or pin key messages, too</li>
            <li><GoDotFill/> Add the right people to your channel (including everybody involved in the project or topic) so that they can all work together, all from one place</li>
            
            `}
            />
            <FAQ
            title='Is there a way to convert an existing channel to a shared channel'
            answer={`<div>
                <div>There is! With Foxcolab Connect, you can invite people outside your company to share any existing channel in your workspace, or create a new channel if you want to start fresh.
                </div>
                
              </div>`}
            
            />
            <FAQ
            title={`What's the different between group chats and Slack Channels?`}
            answer={`<div>
                <div>There is! With Foxcolab Connect, you can invite people outside your company to share any existing channel in your workspace, or create a new channel if you want to start fresh.
                </div>
                
              </div>`}
            
            />


        </div>
            
        </div>
        
       <ChoseBetter />


    </div>




    <div>

    </div>

    </HeaderFooter>
    
    
    </>
  )
}

export default Channel
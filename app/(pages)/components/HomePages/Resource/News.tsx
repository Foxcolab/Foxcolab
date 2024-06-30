"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import { BsCalendar2DateFill } from 'react-icons/bs';

function News() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
   <HeaderFooter>
      <div className='bg-[#fbf7f1] py-[5rem]'>
        <div className='font-bold text-[4rem] text-center'>Foxcolab News</div>
      </div>
      <div className='mx-[5rem] my-[2rem]'>
        

        <div className="grid_two gap-8">
          <div className='w-full bg-green-500  rounded-lg shadow-sm relative'>
            <div className='absolute bottom-0 left-0 p-4'>
              <div className='text-[1.8rem] font-semibold  text-white'>10 tell-tale signs you need to get a new start.</div>
              <div className='text-gray-200'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quae amet. Dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='h-[12.5rem] bg-red-500 rounded-lg'></div>
            <div className='h-[12.5rem]  grid_two gap-4'>
                <div className='h-full rounded-lg bg-yellow-100'></div>
                <div className='h-full rounded-lg bg-cyan-500'></div>
            </div>
          </div>
        </div>

        <div className='mt-8 mb-20'>
          <div className='w-full flex  gap-4'>
            <div className='w-[70%]'>
            <div className="font-semibold text-[1.8rem] pb-4">Today's best highlights</div>
            <div className="grid_two gap-4">
                <div className=' rounded-lg shadow overflow-hidden'>
                  <div className='h-[18rem] bg-red-500'></div>
                  <div className='p-2'>
                    <div className='text-[1.2rem] font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, esse!</div>
                    <div className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quibusdam est alias deleniti veniam ab labore quam unde modi quia error voluptatem maxime rerum, quo, sequi nostrum voluptas excepturi ullam.</div>
                    <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 my-2'><BsCalendar2DateFill/> 12 May, 2024</div>
                  </div>
                </div>
                <div className=' rounded-lg shadow overflow-hidden'>
                  <div className='h-[18rem] bg-green-500'></div>
                  <div className='p-2'>
                    <div className='text-[1.2rem] font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, esse!</div>
                    <div className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quibusdam est alias deleniti veniam ab labore quam unde modi quia error voluptatem maxime rerum, quo, sequi nostrum voluptas excepturi ullam.</div>
                    <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 my-2'><BsCalendar2DateFill/> 12 May, 2024</div>
                  </div>
                </div>
                <div className=' rounded-lg shadow overflow-hidden'>
                  <div className='h-[18rem] bg-yellow-500'></div>
                  <div className='p-2'>
                    <div className='text-[1.2rem] font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, esse!</div>
                    <div className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quibusdam est alias deleniti veniam ab labore quam unde modi quia error voluptatem maxime rerum, quo, sequi nostrum voluptas excepturi ullam.</div>
                    <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 my-2'><BsCalendar2DateFill/> 12 May, 2024</div>
                  </div>
                </div>
                <div className=' rounded-lg shadow overflow-hidden'>
                  <div className='h-[18rem] bg-cyan-500'></div>
                  <div className='p-2'>
                    <div className='text-[1.2rem] font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, esse!</div>
                    <div className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quibusdam est alias deleniti veniam ab labore quam unde modi quia error voluptatem maxime rerum, quo, sequi nostrum voluptas excepturi ullam.</div>
                    <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 my-2'><BsCalendar2DateFill/> 12 May, 2024</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[30%]'>
            <div className="font-semibold text-[1.2rem]">Recent Topics</div>
            <div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-green-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-red-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-yellow-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-cyan-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-green-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-red-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-yellow-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-cyan-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
            </div>
            <div className="font-semibold text-[1.2rem]">Popular Topics</div>
            <div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-green-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-red-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-yellow-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-cyan-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-green-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-red-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-yellow-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
              <div className='flex items-center gap-4 w-full my-4'>
                <div className='h-[3rem] w-[3rem] rounded-md bg-cyan-500 flex-none'></div>
                <div className='overflow_hidden'>
                  <div className='overflow_hidden'>Lorem, ipsum dolor asd  s sd Lorem, ipsum dolor. Lorem, ipsum dolor. .</div>
                  <div className='text-[0.9rem] font-semibold flex items-center gap-2 text-gray-600 '><BsCalendar2DateFill/> 12 May, 2024</div>

                </div>
              </div>
            </div>
                
            </div>

          </div>
          <div>

          </div>
        </div>



      </div>
    </HeaderFooter>
    
    </>
  )
}

export default News
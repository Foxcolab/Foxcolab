"use client";
import { Result, Test } from '@prisma/client';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaDatabase, FaPlay } from 'react-icons/fa';
import { IoChevronBackOutline, IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { TbEdit, TbPlayerStopFilled } from 'react-icons/tb';
import BasicSetting from '../../BasicSetting';
import QuestionManager from '../../QuestionManager';
import UpdateTest from '../../UpdateTest';
import ResultTable from '../../ResultTable/ResultTable';
import axios from 'axios';
import Loader from '../../../Loaders/Loader';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';

interface Props{
    test:Test
}
function TestContainer({test}:Props) {
    const [state, setState] = useState("Basic");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
    const onHref = ()=>{
        router.push(`/servers/${params?.id}/test-channel/${params?.testChannelId}`);
    }

    const activateTestHandler =async()=>{
      try {
        if(test.questions.length===0){
          toast({
            title: "You have not added any questions to this test",
          })
          return;
        }
        setLoading(true);
        const res = await axios.put(`/api/test/activate?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${test.id}`)
        router.refresh();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }

  return (
    <>
            <div className="testcontainer">
        <div className='d-flex gap-5 '>

        <div className='flex-none test_sidebar'>
          <button onClick={onHref} className='flex items-center bg-white py-2 px-3 font-bold text-gray-600 rounded-sm'> <IoChevronBackOutline/> Back</button>
            
            <div className="testsidebar">
             <button className={cn("sidebutton border text-sm", test.activated? "border-green-500 border border-dotted text-white  dark:text-green-500 bg-green-900": "border-violet-500 bg-violet-900 text-gray-200 border-dotted border")} onClick={activateTestHandler} >{test.activated===true ? "ACTIVATED" : "SET UP IN PROGRESS"}</button>
            
            <button className={cn("testSideBtn", state==="Basic" ?"active_link":"" )} onClick={()=>setState("Basic")} ><IoSettings/> Basic Setting </button>
            <button className={cn("testSideBtn", state==="Questions" ?"active_link":"" )} onClick={()=>setState("Questions")}><MdDashboardCustomize /> Question Manager</button>
            <button className={cn("testSideBtn", state==="Update" ?"active_link":"") } onClick={()=>setState("Update")}><TbEdit/> Update </button>
            <button className={cn("testSideBtn", state==="Result" ?"active_link":"")} onClick={()=>setState("Result")}><FaDatabase/> Results </button>
            
              {
                test.activated===false ? <button className='bg-green-500 hover:bg-green-600 text-white mx-2 mt-2 py-[0.4rem] px-2 rounded flex items-center' onClick={activateTestHandler}><FaPlay/> <div className='flex justify-center items-center w-full ml-[-0.5rem]'> {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                Please wait </>: <> Activate Test </>}  </div></button> :
                <button className='bg-emerald-950 hover:bg-emerald-900 text-white mx-2 mt-2 py-[0.4rem] px-2 rounded flex items-center border border-gray-500' onClick={activateTestHandler}><span className='text-lg'><TbPlayerStopFilled  /></span> <div className='flex justify-center items-center w-full ml-[-0.5rem]'> {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                Please wait </>: <> End Test </>}  </div></button>
              }
            
            
            
            </div>

        </div>
          
          
          
          {
            state=="Basic" ? <BasicSetting test={test} /> :
            state==="Questions" ? <QuestionManager questions={test?.questions} testId={test.id} /> :
            state==="Update" ?
            <UpdateTest test={test} />
            : <ResultTable results={test.Results} testName={test.name} testId={test.id} />
            
          }
            
        </div>
        
    </div>
    
    
    
    </>
  )
}

export default TestContainer
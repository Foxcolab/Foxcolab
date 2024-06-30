"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import Loader from '../../../Loaders/Loader';
import { TbInfoTriangleFilled } from 'react-icons/tb';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

const Instructions = [
    {
        title:"1. Sexually explicit or violent media must be marked as sensitive or with a content warning",
        subtitle:"This includes content that is particularly provocative even if it may not show specific body parts, as well as dead bodies, bloody injuries, and other gore. Particularly obscene content may be prohibited entirely. Profile pictures and header images may not contain sexually explicit or violent media."
    },
    {
        title:"2. No racism, sexism, homophobia, transphobia, ableism, xenophobia, or casteism.",
        subtitle:`Transphobic behavior such as intentional misgendering and deadnaming is strictly prohibited. Promotion of "conversion therapy" is strictly prohibited. Criticism of governments and religions is permissible unless being used as a proxy for discrimination.`
    },
    {
        title:"3. No incitement of violence or promotion of violent ideologies",
        subtitle:"Calling for people or groups to be assassinated, murdered, or attacked physically is strictly prohibited. Support for violent groups or events is prohibited."
    },
    {
        title:"4. No harassment, block evasion, dogpiling, or doxing of others",
        subtitle:"Repeat attempts to communicate with users who have blocked you or creation of accounts solely to harass or insult individuals is strictly prohibited. Coordinated activity to attack other users is prohibited. Posting of private personal information about others is prohibited."
    },
    {
        title:"5. Do not share information widely-known to be false and misleading",
        subtitle:"False and misleading information and links from low-quality sources may not be posted, especially if they are likely to mislead or confuse others or endanger their safety."
    },
    {
        title:"6. Content created by others must be attributed, and use of generative AI must be disclosed",
        subtitle:"Content created by others must clearly provide a reference to the author, creator, or source. For adult content, this should include performers. Accounts may not solely post AI-generated content."
    }
]

interface Props {
    serverName:string
}

function JoinServer({serverName}:Props) {

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onSubmitHandler =async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/server/join?serverId=${params?.id}`);
            
            setLoading(false);
            if(res.status===200){
                router.push(`/servers/${params?.id}`);
            }
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className=" create_note_container border" id='guide_cross' style={{maxWidth:"670px", height:"600px", padding:"0.5rem", border:"1px solid hsl(var(--border))"}}>
        <div>

        
        <div className="note_container  overflow-hidden rounded-lg">

        <div className='note_left_container ' style={{width:"100%"}}>
        <div className="create_note_header" style={{padding:"0"}}>
            
            <div className='text-[1.5rem] font-semibold text-center flex items-center justify-center gap-2 w-full my-4 '> 
            <span className='text-red-500'><TbInfoTriangleFilled/></span> Some ground rules <span className='text-red-500'><TbInfoTriangleFilled/></span>
            </div>
            
        </div>
        <Separator orientation='horizontal' />
        <div className='text-center text-[0.9rem] mt-2 mb-4' style={{color:"var(--color3)"}}>These are set and enforced by the Foxcolab moderators</div>

        <div className="canvas_Editor pb-4 pl-2" style={{height:"520px"}}>
             <div className='p-4'>
                 {
                     Instructions.map((item, index)=>(
                         <div key={index} className=' my-2 p-4 rounded border shadow' style={{background:"var(--background2)"}}>
                             <div className='font-semibold text-[1.1rem]' style={{color:"var(--color2)"}}>{item.title}</div>
                             <div className=' text-[0.95rem] ' style={{color:"var(--color3)"}}>{item.subtitle}</div>
                         </div>
                     ))
                 }

{
                loading ?
                <button className='px-4 py-[0.45rem] w-full mt-4 mb-2 font-semibold rounded bg-green-700 text-white  text-[1.1rem] focus:outline-none'  disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                Joining.. </button>
                : <>
                    <button className='px-4 py-[0.45rem] w-full mt-4 mb-2 font-semibold rounded bg-green-500 text-white hover:bg-green-600 text-[1.1rem] focus:outline-none' onClick={onSubmitHandler}>Join {serverName} </button>
                {/* <button className='px-4 py-[0.35rem] hover:bg-secondary rounded border text-[0.95rem]' onClick={()=>setOpen(false)}>Cancel</button> */}
                
                </>
            }
             </div>
        <div>

        </div>


       
        </div>

        


        </div>
    </div>
       
       
        
      
      
       
    </div>
      </DialogContent>
    
    



    </Dialog>  
    
    </>
  )
}

export default JoinServer
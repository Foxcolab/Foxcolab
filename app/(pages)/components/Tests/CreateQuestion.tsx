"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { FaPlusCircle } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import Loader from '../Loaders/Loader';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import TinyMce from '../Editor/TinyMce2';
import { Checkbox } from "@/components/ui/checkbox"
import { useParams, useRouter } from 'next/navigation';


interface Props {

}

function CreateQuestion({}:Props) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [marks, setMarks] = useState(1);
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [explanation, setExplanation] = useState('');
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const SubmitHandler =async()=>{
      try {
        console.log("This is called");
        setLoading(true);
        // console.log(serverId, testId, testChannelId, type);
        let answers= []
        if(type==="Single Choice"){
            let cb = document.querySelector('.radio');
            console.log("CBBB",cb);
            answers.push(cb?.value);
        } else{
          let cb = document.querySelectorAll('input[type="checkbox"]:checked');
            console.log(cb);
            let n = cb.length;
            console.log("CBBB",cb);
            for(let i=0; i<n; i++){
                 answers.push(cb[i].value);
            }
    }   
    
        console.log(name, type, marks, option1, answers);
        
        const res = await axios.post(`/api/test/question/new?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${params?.testId}`, {title:name, qType:type, marks, options:[option1, option2, option3, option4], answer:answers, explanation });
        setLoading(false);
        setOpen(false);
        // form.reset();
        router.refresh();
      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
    }

    const setTypeHanlder=(val:string)=>{
        setType(val);
        let checkbox = document.querySelectorAll('.checkbox');
        let radio = document.querySelectorAll('.radio');
         let n = Math.max(checkbox.length, radio.length);
        if(val==="Single Choice"){
            for(let i=0; i<n; i++){
              checkbox[i].style.display="none";
              radio[i].style.display="inline";
            }
          }
          else{
            for(let i=0; i<n; i++){
              checkbox[i].style.display="inline";
              radio[i].style.display="none";
            }
        
          } 
    }

  return (
    <>
    
    
    <Dialog open={open} onOpenChange={setOpen}> 
    <DialogTrigger asChild>
      <button className='cnvs_cnote' onClick={()=>setOpen(true)}><FaPlusCircle/> Create Question</button>
      </DialogTrigger>
      <DialogContent className="" style={{zIndex:'10000 !important', height:"98vh", maxWidth:"99vw"}}>
        <DialogHeader>
          <DialogTitle>Create a Question</DialogTitle>
          
        </DialogHeader>
        <div className='tt_ss overflow-scroll p-4'>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question title</label>
                <div className='create_ss_editor'>
                <TinyMce setTitle={setName} placeholder='Enter the question..' />
                </div>
               
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question Type</label>
                <Select onValueChange={e=>setTypeHanlder(e)}>
                    <SelectTrigger className="">
                       <SelectValue placeholder="Select--" />
                    </SelectTrigger>
                <SelectContent>
                     <SelectGroup>
                     
                  <SelectItem value='Single Choice' >Single Choice</SelectItem>
                  <SelectItem value='Multiple Choice'>Multiple Choice</SelectItem>
               
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Marks</label>
                <Input onChange={e=>setMarks(e.target.value)} defaultValue={1} placeholder='eg. 1 ' />
            </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Answer</label>
            <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option1} className='radio'  id="r1" />
        <input type="checkbox"  value={option1}  className='checkbox'  style={{display:'none'}}  />
        <div className="create_ss_editor">
        <TinyMce setTitle={setOption1} placeholder='Enter the option 1..' />
        </div>
        
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option2} className='radio' id="r2" />
        <input type="checkbox"  value={option2}  className='checkbox'  style={{display:'none'}}  />
        <div className="create_ss_editor">
        <TinyMce setTitle={setOption2} placeholder='Enter the option 2 ..' />
        </div>

      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option3} className='radio' id="r3" />
        <input type="checkbox"  value={option3}  className='checkbox'  style={{display:'none'}}  />
        <div className="create_ss_editor">
        <TinyMce setTitle={setOption3} placeholder='Enter the option 3' />
        </div>

      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option4} className='radio' id="r3" />
        <input type="checkbox"  value={option4}  className='checkbox'  style={{display:'none'}}  />
        <div className="create_ss_editor">
        <TinyMce setTitle={setOption4} placeholder='Enter the option 4'  />
        </div>

      </div>
      <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Explantion</label>
               <div className="create_ss_editor">
               <TinyMce setTitle={setExplanation} placeholder='Justify the answer' />
               </div>
            </div>
    </RadioGroup>
        </div>
        

        </div>
        <DialogFooter>
          {
            loading ? <Loader/> : 
          <Button type="submit" onClick={SubmitHandler}>Create</Button>

          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    
    </>
  )
}

export default CreateQuestion 
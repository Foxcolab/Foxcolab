"use client";
import React, { useEffect, useState } from 'react'
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
import TinyMce from '../Editor/TinyMce';
import { Checkbox } from "@/components/ui/checkbox"
import { useParams, useRouter } from 'next/navigation';
import { BiSolidEdit } from 'react-icons/bi';
import { Question } from '@prisma/client';


interface Props {
  question:Question
}

function UpdateQuestion({question}:Props) {
    const [name, setName] = useState(question.title)
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(question.qType);
    const [marks, setMarks] = useState(1);
    const [option1, setOption1] = useState(question.options[0]);
    const [option2, setOption2] = useState(question.options[1]);
    const [option3, setOption3] = useState(question.options[2]);
    const [option4, setOption4] = useState(question.options[3]);
    const [explanation, setExplanation] = useState(question.explanation);
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    
    const SubmitHandler =async()=>{
      try {
        console.log("This is called");
        setLoading(true);
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
        
        const res = await axios.put(`/api/test/question/new?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${params?.testId}&questionId=${question?.id}`, {title:name, qType:type, marks, options:[option1, option2, option3, option4], answer:answers, explanation });
        router.refresh();
        setLoading(false);
        setOpen(false);
        // form.reset();
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

    const CheckboxCheck=(option)=>{
        console.log(option);

        
        for(let i=0; i<question.answer.length; i++){
            if(question.answer[i]===option){
                return true;
            }
        }
        return false;
    }

  return (
    <>
    
    
    <Dialog open={open} onOpenChange={setOpen}> 
    <DialogTrigger asChild>
      
      

      </DialogTrigger>
      <DialogContent className="" style={{zIndex:'10000 !important', height:"98vh", maxWidth:"99vw"}}>
        <DialogHeader>
          <DialogTitle>Update a Question</DialogTitle>
          
        </DialogHeader>
        <div className='tt_ss overflow-scroll p-4'>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question title</label>
                <TinyMce setTitle={setName} defaultValue={name} />
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question Type</label>
                <Select onValueChange={e=>setTypeHanlder(e)} defaultValue={type}>
                    <SelectTrigger className="" >
                       <SelectValue placeholder="Select--" />
                    </SelectTrigger>
                <SelectContent>
                     <SelectGroup>
                     
                  <SelectItem value='Single Choice'>Single Choice</SelectItem>
                  <SelectItem value='Multiple Choice'>Multiple Choice</SelectItem>
               
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Marks</label>
                <Input onChange={e=>setMarks(e.target.value)} defaultValue={marks} placeholder='eg. 1 ' />
            </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Answer</label>
            <RadioGroup defaultValue="comfortable" defaultChecked>
      <div className="flex items-center space-x-2">
        <RadioGroupItem   value={option1} className='radio' aria-selected id="r1" style={type==="Single Choice" ? {display:"block"}: {display:"none"}}  />
        <input type="checkbox"  value={option1}  className='checkbox'  defaultChecked={CheckboxCheck(option1)} style={type==="Single Choice" ? {display:"none"}: {display:"block"}}  />
        <TinyMce setTitle={setOption1} defaultValue={option1} />
        
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option2}  className='radio' id="r2"  style={type==="Single Choice" ? {display:"block"}: {display:"none"}}  />
        <input type="checkbox"  value={option2}  className='checkbox' defaultChecked={CheckboxCheck(option2)}  style={type==="Single Choice" ? {display:"none"}: {display:"block"}}  />
        <TinyMce setTitle={setOption2} defaultValue={option2} />

      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option3} className='radio' id="r3" style={type==="Single Choice" ? {display:"block"}: {display:"none"}}  />
        <input type="checkbox"  value={option3}  defaultChecked={CheckboxCheck(option3)}   className='checkbox' style={type==="Single Choice" ? {display:"none"}: {display:"block"}}   />
        <TinyMce setTitle={setOption3} defaultValue={option3}  />

      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={option4} className='radio' id="r3" style={type==="Single Choice" ? {display:"block"}: {display:"none"}}  />
        <input type="checkbox"  value={option4}  className='checkbox'  defaultChecked={CheckboxCheck(option4)}  style={type==="Single Choice" ? {display:"none"}: {display:"block"}}   />
        <TinyMce setTitle={setOption4} defaultValue={option4} />

      </div>
      <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Explantion</label>
                <TinyMce setTitle={setExplanation} defaultValue={explanation} />
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

export default UpdateQuestion;
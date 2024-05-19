"use client";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios';
import Loader from '../Loaders/Loader';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import TinyMce from '../Editor/TinyMce2';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

import {  RxCrossCircled } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useToast } from '@/components/ui/use-toast';


interface Props {
  testTitle:string
  testId:string
}

function CreateQuestion({testId, testTitle}:Props) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('Single Choice');
    const [marks, setMarks] = useState(1);

    const [inputFields, setInputFields] = useState([{ value: '' }]);

    const {toast} = useToast();
    const [explanation, setExplanation] = useState('');
    const router = useRouter();
    const params = useParams();

    const SubmitHandler =async(value:string)=>{
      try {
        console.log(value);
        // console.log(serverId, testId, testChannelId, type);
        let answers= []
        let checkbox = document.querySelectorAll('.checkbox');
        // console.log(checkbox[0].checked)
        let radio = document.querySelectorAll('.radio');
        if(type==="Single Choice"){
          for(let i=0; i<radio.length; i++){
            if(radio[i].ariaChecked==='true'){
              answers.push(radio[i].value);
            }
          }
        }else {
          for(let i=0; i<checkbox.length; i++){
            if(checkbox[i].checked){
              answers.push(radio[i].value);
            }
          }
        }   

      let options = []
      for(let i=0; i<inputFields.length; i++){
        options.push(inputFields[i].value);
      }

      if(answers.length===0){
        toast({
          title: "Please select the answer.",
      
        })
        return;
      }
      setLoading(true);

    
        
        const res = await axios.post(`/api/test/question/new?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${params?.testId}`, {title:name, qType:type, marks, options, answer:answers, explanation });
        setLoading(false);
        console.log(res);
        if(res.status===200){
          if(value==="Save"){
            console.log("SAVE EXecuting");
            router.push(`${testId}`);
            router.refresh();

          }else {
            console.log("ELSE EXecuting");
            router.push(`/add-question`);
            router.refresh();

          }
        }
        
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

    const hrefHandler =()=>{
      router.push(`/servers/${params?.id}/test-channel/${params?.testChannelId}/${testId}`);
    }


    const handleChangeInput = (index:number, event:any) => {
      const values = [...inputFields];
      values[index].value = event;
      setInputFields(values);
    };
  
    const handleAddInput = () => {
      setInputFields([...inputFields, { value: '' }]);
    };
  
    const handleRemoveInput = (index:number) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };



  
  return (
    <>
    
    
    {/* <Dialog open={open} onOpenChange={setOpen}> 
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
    
     */}
    <div className="add_question_container">
     <div className="px-20 py-8">
      <button onClick={hrefHandler} className='font-bold flex items-center gap-1 py-[0.3rem] px-3 rounded bg-gray-300   dark:bg-black/80 border'><IoIosArrowBack/>Back</button>
    
    
    <div className="py-4 font-semibold text-lg">{testTitle}</div>
    <hr />

     <div className='tt_ss overflow-scroll p-4'>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question title</label>
                <div className='create_ss_editor'>
                <TinyMce setTitle={setName} placeholder='Enter the question..' />
                </div>
               
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question Type</label>
                <select name="" id="" onChange={(e)=>setTypeHanlder(e.target.value)} className='bg-[#222F3E] px-3 py-2  rounded-md border border-input'>
                  <option value="Single Choice">Single Choice</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                </select>
               
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Marks</label>
                <Input onChange={e=>setMarks(e.target.value)} defaultValue={1} placeholder='eg. 1 ' className='bg-[#222F3E]' />
            </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Answer</label>
            <RadioGroup defaultValue="comfortable">



 <div>
      {inputFields.map((inputField, index) => (
        <div key={index} className='flex items-center gap-4 mb-4'>

<div className="flex items-center space-x-2">
        <RadioGroupItem value={inputField.value} className='radio' style={{height:'1.1rem', width:'1.1rem'}}  id="r1" />
        <input type="checkbox"  value={inputField.value}  className='checkbox'   style={{display:'none', height:'1.1rem', width:'1.1rem'}}  />
        <div className="create_ss_editor">
        <TinyMce setTitle={(value:string)=>handleChangeInput(index, value)} placeholder={`Enter the option ${index}`} />
        
        </div>
      </div>
      <div>
          <button onClick={()=>handleRemoveInput(index)} className='py-[0.3rem] px-4 rounded-md border-input font-semibold hover:bg-red-500 text-md flex items-center gap-1'><span className='text-xl'><RiDeleteBin5Line/></span> </button>
        </div>

        </div>
      ))}
    </div>





      <div className='p-4'>
      <button onClick={handleAddInput} className='py-2 px-4 rounded-md  font-semibold bg-green-500 text-white   text-md flex items-center gap-1'><span><FaPlus/> </span>Add Option</button>
      </div>

<hr />

      <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Explantion</label>
               <div className="create_ss_editor">
               <TinyMce setTitle={setExplanation} placeholder='Justify the answer' />
               </div>
            </div>
    </RadioGroup>
        </div>
        
        <div className='flex items-center gap-4'>
          {
            loading ? <Loader/> :
            <>
            
            <button className='py-2 px-4 rounded-md font-semibold bg-green-500 text-white text-md flex items-center gap-1' onClick={()=>SubmitHandler("Save")}>Save</button>
          <button className='py-2 px-4 rounded-md font-semibold bg-green-500 text-white  text-md flex items-center gap-1' onClick={()=>SubmitHandler("AddNext")}>Save and Add Next</button>
          <button className='py-2 px-4 rounded-md font-semibold border text-md flex items-center gap-1' onClick={hrefHandler}>Cancel</button>
            </>
          }
        </div>

        </div>
     </div>
     </div>

    
    </>
  )
}

export default CreateQuestion 
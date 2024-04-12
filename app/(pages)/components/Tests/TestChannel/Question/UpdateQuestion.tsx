"use client";
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios';
import Loader from '../../../Loaders/Loader';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import TinyMce from '../../../Editor/TinyMce';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

import {  RxCrossCircled } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Question } from '@prisma/client';


interface Props {
  testTitle:string
  testId:string
  question:Question
}

function UpdateQuestion({testId, testTitle, question}:Props) {
    const [name, setName] = useState(question.title)
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(question.qType);
    const [marks, setMarks] = useState(question.marks);
    const [answer, setAnswer] = useState(question.answer);
  


    const [inputFields, setInputFields] = useState([{value:""}]);
    useEffect(()=>{
        let ans = []
        for(let i=0; i<question.options.length; i++){
            ans.push({value:question.options[i]})
        }
        setInputFields(ans);
    }, [])


    const [explanation, setExplanation] = useState(question.explanation);
    const router = useRouter();
    const params = useParams();

    const SubmitHandler =async(value:string)=>{
      try {
        console.log(value);
        setLoading(true);
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
          for(let i=0; i<radio.length; i++){
            if(checkbox[i].checked){
              answers.push(radio[i].value);
            }
          }
        }   

      let options = []
      for(let i=0; i<inputFields.length; i++){
        options.push(inputFields[i].value);
      }
    
        
        const res = await axios.put(`/api/test/question/new?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${params?.testId}&questionId=${question?.id}`, {title:name, qType:type, marks, options, answer:answers, explanation });
        setLoading(false);
        console.log(res);
        if(res.status===200){
          if(value==="Save"){
            console.log("SAVE EXecuting");
            hrefHandler();
            router.refresh();

          }else {
            console.log("ELSE EXecuting");
            setInputFields([{value:""}]);
            setExplanation("");
            setName("");
            setType("Single Choice");
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
      console.log("Click");
      router.push(``);
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

    const RadioOnClick =(value:string)=>{
        console.log("Clicked");
        setAnswer([value]);
    }


    console.log(answer)

    const CheckBoxClick = (event:any) => {
        const { value, checked } = event.target;
        if (checked) {
            setAnswer([...answer, value]);
        } else {
            setAnswer(answer.filter(item => item !== value));
        }
      };
    
  
  return (
    <>
    
    
    <div className="add_question_container">
     <div className="px-20 py-8">
      <button onClick={hrefHandler} className='font-bold flex items-center gap-1 py-[0.3rem] px-3 rounded bg-gray-300   dark:bg-black/80 border'><IoIosArrowBack/>Back</button>
    
    
    <div className="py-4 font-semibold text-lg">{testTitle}</div>
    <hr />

     <div className='tt_ss overflow-scroll p-4'>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question title</label>
                <div className='create_ss_editor'>
                <TinyMce setTitle={setName} defaultValue={name} />
                </div>
               
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Question Type</label>
                <select name="" id="" onChange={(e)=>setTypeHanlder(e.target.value)} className='bg-[#222F3E] px-3 py-2  rounded-md border border-input'>
                  <option value="Single Choice" selected={"Single Choice"===type}>Single Choice</option>
                  <option value="Multiple Choice" selected={"Multiple Choice"===type}>Multiple Choice</option>
                </select>
                {/* <Select onValueChange={e=>setTypeHanlder(e)} >
                    <SelectTrigger className="">
                       <SelectValue placeholder="Select--" />
                    </SelectTrigger>
                <SelectContent className='bg-[#222F3E]' style={{background:"#222f3e !important"}}>
                     <SelectGroup>
                     
                  <SelectItem value='Single Choice' >Single Choice</SelectItem>
                  <SelectItem value='Multiple Choice'>Multiple Choice</SelectItem>
               
        </SelectGroup>
      </SelectContent>
    </Select> */}
            </div>
            <div className="create_ss">
                <label htmlFor="" className='font-semibold fontsize-xl'>Marks</label>
                <Input onChange={e=>setMarks(e.target.value)} defaultValue={marks} placeholder='eg. 1 ' className='bg-[#222F3E]'  />
            </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Answer</label>
            <RadioGroup defaultValue="comfortable">



 <div>
      {inputFields.map((inputField, index) => (
        <div key={index} className='flex items-center gap-4 mb-4'>

<div className="flex items-center space-x-2">
        <RadioGroupItem value={inputField.value} className='radio'   id="r1"  checked={answer.includes(inputField.value)}  onClick={()=>RadioOnClick(inputField.value)} />
        <input type="checkbox"  value={inputField.value}  className='checkbox' onClick={CheckBoxClick}  style={{display:'none'}} checked={answer.includes(inputField.value)} />
        <div className="create_ss_editor">
        <TinyMce setTitle={(value:string)=>handleChangeInput(index, value)} defaultValue={inputField.value}  />
        
        </div>
      </div>
      <div>
          <button onClick={()=>handleRemoveInput(index)} className='py-[0.3rem] px-4 rounded-md border-input font-semibold hover:bg-red-500 text-md flex items-center gap-1'><span className='text-xl'><RiDeleteBin5Line/></span> </button>
        </div>


          {/* <input
            type="text"
            value={inputField.value}
            onChange={(event) => handleChangeInput(index, event)}
          />
          <button onClick={() => handleRemoveInput(index)}>Remove</button> */}
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
               <TinyMce setTitle={setExplanation} placeholder='Justify the answer' defaultValue={explanation} />
               </div>
            </div>
    </RadioGroup>
        </div>
        
        <div className='flex items-center gap-4'>
          {
            loading ? <Loader/> :
            <>
            
            <button className='py-2 px-4 rounded-md font-semibold bg-green-500 text-white text-md flex items-center gap-1' onClick={()=>SubmitHandler("Save")}>Update</button>
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

export default UpdateQuestion; 
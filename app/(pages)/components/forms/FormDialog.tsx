import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Loader from '../Loaders/Loader'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { BsBodyText } from 'react-icons/bs'
import { MdShortText } from 'react-icons/md'
import { IoRadioButtonOn } from 'react-icons/io5'
import { IoIosCheckbox, IoIosOptions, IoMdRadioButtonOn } from 'react-icons/io'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6'
import { GoPlusCircle } from 'react-icons/go'
import { Switch } from '@/components/ui/switch'
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
const times = [
  {
      name:"12:00AM",
      value:"00:00"
  },
  {
      name:"12:30AM",
      value:"00:30"
  },
  {
      name:"01:00AM",
      value:"01:00"
  },
  {
      name:"01:30AM",
      value:"01:30"
  },
  {
      name:"02:00AM",
      value:"02:00"
  },
  {
      name:"02:30AM",
      value:"02:30"
  },
  {
      name:"03:00AM",
      value:"03:00"
  },
  {
      name:"03:30AM",
      value:"03:30"
  },
  {
      name:"04:00AM",
      value:"04:00"
  },
  {
      name:"04:30AM",
      value:"04:30"
  },
  {
      name:"05:00AM",
      value:"05:00"
  },
  {
      name:"05:30AM",
      value:"05:30"
  },
  {
      name:"06:00AM",
      value:"06:00"
  },
  {
      name:"06:30AM",
      value:"06:30"
  },
  {
      name:"07:00AM",
      value:"07:00"
  },
  {
      name:"07:30AM",
      value:"07:30"
  },
  {
      name:"08:00AM",
      value:"08:00"
  },
  {
      name:"08:30AM",
      value:"08:30"
  },
  {
      name:"09:00AM",
      value:"09:00"
  },
  {
      name:"09:30AM",
      value:"09:30"
  },
  {
      name:"10:00AM",
      value:"10:00"
  },
  {
      name:"10:30AM",
      value:"10:30"
  },
  {
      name:"11:00AM",
      value:"11:00"
  },
  {
      name:"11:30AM",
      value:"11:30"
  },
  {
      name:"12:00PM",
      value:"12:00"
  },
  {
      name:"12:30PM",
      value:"12:30"
  },
  {
      name:"01:00PM",
      value:"13:00"
  },
  {
      name:"01:30PM",
      value:"13:30"
  },
  {
      name:"02:00PM",
      value:"14:00"
  },
  {
      name:"02:30PM",
      value:"14:30"
  },
  {
      name:"03:00PM",
      value:"15:00"
  },
  {
      name:"03:30PM",
      value:"15:30"
  },
  {
      name:"04:00PM",
      value:"16:00"
  },
  {
      name:"04:30PM",
      value:"16:30"
  },
  {
      name:"05:00PM",
      value:"17:00"
  },
  {
      name:"05:30PM",
      value:"17:30"
  },
  {
      name:"06:00PM",
      value:"18:00"
  },
  {
      name:"06:30PM",
      value:"18:30"
  },
  {
      name:"07:00PM",
      value:"19:00"
  },
  {
      name:"07:30PM",
      value:"19:30"
  },
  {
      name:"08:00PM",
      value:"20:00"
  },
  {
      name:"08:30PM",
      value:"20:30"
  },
  {
      name:"09:00PM",
      value:"21:00"
  },
  {
      name:"09:30PM",
      value:"21:30"
  },
  {
      name:"10:00PM",
      value:"22:00"
  },
  {
      name:"10:30PM",
      value:"22:30"
  },
  {
      name:"11:00PM",
      value:"23:00"
  },
  {
      name:"11:30PM",
      value:"23:30"
  }
  
]

const FieldType = [
  {value:"shortAns", name:"Short Answer", icon:<MdShortText/>},
  {value:"longAns", name:"Long Answer", icon:<BsBodyText/>},
  {value:"singleChoice", name:"Single Choice", icon:<IoMdRadioButtonOn/>},
  {value:"multipleChoice", name:"Multiple Choice", icon:<IoIosCheckbox/>},
  {value:"select", name:"Select", icon:<IoIosOptions/>},
  {value:"file", name:"File", icon:<FaCloudUploadAlt/>},
]


interface Props {
  open:boolean
  setOpen:any
  schema:"Channel" | "Forum" | "DirectMessage"
}

function FormDialog({open, setOpen, schema}:Props) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = React.useState<Date | null>(null);
  const [hhmm, setHhmm] = useState<string | null>(null);
  const [type, setType] = useState("shortAns")

  const [inputFields, setInputFields] = useState([{ name: '', description:'', options:[''], fileType:'', fileCount:0, type:'shortAns', required:true, maxSize:0 }]);

  const [options, setOptions] = useState(['']);
  const [speficic, setSpecific] = useState(false);

  const params = useParams();
  const router = useRouter();

  var prev_date = new Date();
  prev_date.setDate(prev_date.getDate() - 1);

  const disabledDays = [
      {from:new Date(1947,8, 15 ),  to: prev_date }
    ];

  const SubmitHandler =async()=>{
    try {
      let expiryDate = null;
      if(date!==null){
        expiryDate= TimeHandler();
      }
      console.log(inputFields);
      setLoading(true);
      if(schema==="Channel"){
        const res = await axios.post(`/api/socket/messages/forms/new?serverId=${params?.id}&channelId=${params?.channelId}`, {
          title, description, questions:inputFields
        });
      }
      
      setLoading(false);
      router.refresh();
      setOpen(false);
    } catch (error) {
      setLoading(false);
      
    }
  }
  
  const TimeDisable =(value:string)=>{
    let [hour, minute] = value.split(':');
    const yy = date?.getFullYear();
    const mm = date?.getMonth() + 1;
    const dd = date?.getDate();
    let dtt = (`${yy}-${mm}-${dd}, ${hour}:${minute}:00`);
    const selectedDate = new Date(dtt);
    let currentDate = new Date();
    if(selectedDate<=currentDate){
        return true;
    }else {
        return false;
    }

  }
  const TimeHandler =()=>{
    const [hour, tm] = hhmm?.split(':');
        const yy = date?.getFullYear();
        const mm = date?.getMonth() + 1;
        const dd = date?.getDate();
        let dtt = (`${yy}-${mm}-${dd}, ${hour}:${tm}:00`);
        const neDt = new Date(dtt);
        return neDt;
  }
  const CalenderHandler =(e:any)=>{
    // setDate
    console.log(e)
    setDate(e);
    console.log(hhmm);
    if(hhmm===null){
      setHhmm("00:00");
    }
    console.log(hhmm)
    
  }


  const handleChangeInput = (index:number, event:any, changeType:string) => {
    if(changeType==="type"){
      const values = [...inputFields];
      values[index].type = event;
      if(type==="file"){
        values[index].options = [];
      }else if(type==="shortAns" || type==="longAns"){
        values[index].options = [];
        values[index].fileCount = 0;
        values[index].maxSize = 0;
        values[index].fileType = '';
      }else if(type==="multipleChoice" || type==="singleChoice" || type==="select"){
        values[index].fileCount = 0;
        values[index].maxSize = 0;
        values[index].fileType = '';
      }
      setInputFields(values);
      return;
    }
    else if(changeType==="required"){
      const values = [...inputFields];
      values[index].required = event;
      setInputFields(values);
      return;
    }
    else if(changeType==="title"){
      const values = [...inputFields];
      values[index].name = event;
      setInputFields(values);
      return;
    }
    else if(changeType==="description"){
      const values = [...inputFields];
      values[index].description = event;
      setInputFields(values);
      return;
    }
    else if(changeType==="fileType"){
      const values = [...inputFields];
      values[index].fileType = event;
      setInputFields(values);
      return;
    }
    else if(changeType==="fileCount"){
      const values = [...inputFields];
      values[index].fileCount = event;
      setInputFields(values);
      return;  
    }
    else if(changeType==="maxSize"){
      const values = [...inputFields];
      values[index].maxSize = event;
      setInputFields(values);
      return;  
    }
  }

  const handleAddInput = (type:string) => {
    console.log(type)
    if(type==="shortAns" || type==="longAns"){
      setInputFields([...inputFields,  { name:``, description:'', fileType:'', fileCount:0, type:type, options: [''], required:true, maxSize:0 }]);
    }else if(type==="singleChoice" || type==="multipleChoice" || type==="select"){
      setInputFields([...inputFields,  { name:``, description:'', fileType:'', fileCount:0, type:type, options: ['Option 1', 'Option 2'], required:true, maxSize:0 }]);
    }
    else {
      setInputFields([...inputFields,  { name:``, description:'', fileType:'image', fileCount:1, type:"file", options: [''], required:true, maxSize:1 }]);
    }
  };

  const handleRemoveInput = (index:number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };




  const OptionChangeHandler = (index:number, event:any, inputIndex:number) => {
    const values = [...options];
    values[index] = event;
    setOptions(values);

    const value2 = [...inputFields];
    value2[inputIndex].options = values;
      setInputFields(value2);

  };

  const OptionAddInput = (i:number) => {
    setOptions([...options, '']);
    const value2 = [...inputFields];
    value2[i].options = [...options, ''];
  };

  const OptionInputRemove = (index:number, index2:number) => {
    const values = [...options];
    values.splice(index, 1);
    setOptions(values);
    const value2 = [...inputFields];
    // value2.splice(index2, 1);
    value2[index2].options= values;


  };


  
  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild className='flex items-center gap-2'>
      {/* <span className="text-[1.2rem]"><CgPoll/></span>Create Polls */}
       
      </DialogTrigger>
      <DialogContent className="sm:max-w-[675px] sm:h-[650px] sm:max-h-[650px] sm:min-h-0  overflow-hidden px-0" >
        <div className='h-[610px] '>

       
      <DialogHeader className='px-4'>
          <DialogTitle>Create a Form</DialogTitle>
          <hr />
        </DialogHeader>

        <div className='overflow-scroll px-8 pt-4 h-[95%] min-h-0  new_from_slider'>     
            <div>
            <div className="mb-4">
                <label htmlFor="" className='text-sm font-bold'>Form Title:</label>
                <div className="mt-2">
                <Input className='resize-none' onChange={(e)=>setTitle(e.target.value)} />
                </div>
            </div> 
            <div className="mb-4">
                <label htmlFor="" className='text-sm font-bold'>Form Description:</label>
                <div className="mt-2">
                <Textarea className='resize-none' onChange={(e)=>setDescription(e.target.value)} />
                </div>
            </div>   
          
            <div className='mb-4'>
              <label htmlFor="" className='text-sm font-bold'>Expiry Date</label>
              <div>
              <div className='flex items-center gap-4 mt-4'>

<Popover>
<PopoverTrigger asChild>
<Button
  variant={"outline"}
  className={cn(
    "w-[180px] justify-start text-left font-normal",
    !date && "text-muted-foreground"
  )}
>
  <CalendarIcon className="mr-2 h-4 w-4" />
  {date ? format(date, "PPP") : <span>Pick a date</span>}
</Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0" align="start">
<Calendar
  mode="single"
  selected={date}
  onSelect={CalenderHandler}
  initialFocus
  disabled={disabledDays}
/>
</PopoverContent>
</Popover>

<div className="">
                <Select onValueChange={(e)=>setHhmm(e)}  >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Time" />
      </SelectTrigger>
      <SelectContent className='w-[140px]'>
        <SelectGroup defaultValue={hhmm!==null ? hhmm : "Select Time"} >
        <SelectLabel>Select Time</SelectLabel>
          {
            times.map((time, i)=>(
              <SelectItem key={i} value={time.value} defaultChecked={hhmm===time.value} disabled={TimeDisable(time.value)}>{time.name}</SelectItem>
            ))
          }
          
        </SelectGroup>
      </SelectContent>
    </Select>
                </div>



</div>
              </div>
            </div>
            </div>
          <hr />
          {
            inputFields.map((inputField, i)=>(
            <>
            <div className="border p-4 mt-4 rounded text-sm" key={i}>
            <div className='flex items-center gap-4'>
            <Select defaultValue={inputField.type} onValueChange={(e)=>handleChangeInput(i, e, "type")}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Field Type" />
      </SelectTrigger>
      <SelectContent className='w-full p-4'>
        <SelectGroup >
          {
            FieldType.map((field, i)=>(
              <SelectItem key={i} value={field.value} className=''> <div className='flex items-center gap-2'><span className='text-lg'>{field.icon}</span> {field.name}</div> </SelectItem>
            ))
          }
          
        </SelectGroup>
      </SelectContent>
    </Select>
    <div className='flex h-10 gap-2 items-center border px-3 rounded'>
      Required <Switch defaultChecked={inputField.required} onCheckedChange={e=>handleChangeInput(i, e, "required")} />
    </div>
    <div className=''>
      <button className='h-10 text-xl text-gray-500 rounded border p-3 flex justify-center items-center' onClick={()=>handleRemoveInput(i)}><RiDeleteBin6Line/></button>
    </div>
            </div>
            <div className='mt-4'>
              <label htmlFor="">Question Title</label>
              <div className='mt-2'><Input type='text' onChange={(e)=>handleChangeInput(i, e.target.value, "title")} /></div>
            </div>
            <div className='mt-4'>
              <label htmlFor="">Question Description <span className='text-gray-400'>- Optional</span></label>
              <div className='mt-2'><Textarea className='resize-none' onChange={(e)=>handleChangeInput(i, e.target.value, "description")} /></div>
            </div>
            {/* INPUT TYPE SINGLE CHOICE  */}

           {
             (inputField.type==="singleChoice" || inputField.type==="multipleChoice" || inputField.type==="select") &&<>
             {options.map((option, j)=>(
              <>
               <div className="mt-4">
              <label htmlFor="">Choice {j+1}</label>
              <div className='flex items-center gap-4 mt-2'><Input type='text' onChange={(e)=>OptionChangeHandler(j, e.target.value, i)} />
              <button className='border h-10 flex items-center justify-center w-10 flex-none text-lg text-gray-600 rounded' onClick={()=>OptionInputRemove(j, i)}><RiDeleteBin6Line/></button>
              </div>
            </div>
              
              </>
             ))}
             <button onClick={()=>OptionAddInput(i)} className='flex items-center gap-2 text-sm font-semibold px-2 py-[0.35rem] rounded border mt-4'><span className='text-lg'><AiOutlinePlus/></span> Add Choice</button>
             
             </>
           }

           {
            inputField.type==="file" && <>
            
            <div className='pt-4'>
              <div className='flex items-center justify-between gap-4'>Allow Only Specific file types: <span> <Switch onCheckedChange={e=>setSpecific(e)} /> </span></div>
              {
                speficic && <div className='flex items-center gap-8 mt-4'>
                <div className='flex flex-col gap-2'>
                <div className='flex gap-2'><input type='radio' name='file' value={"PDF"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")}  />PDF</div>
                  <div className='flex gap-2'><input type='radio' name='file' value={"Spreadsheet"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Spreadsheet</div>
                  <div className='flex gap-2'><input type="radio" name='file' value={"Word"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Word</div>
                  <div className='flex gap-2'><input type="radio" name='file' value={"Presentation"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Presentation</div>
                </div>
                <div className='flex flex-col gap-2'> 
                  <div className='flex gap-2'><input type="radio" name='file' value={"Image"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Image</div>
                  <div className='flex gap-2'><input type="radio" name='file' value={"Audio"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Audio</div>
                  <div className='flex gap-2'><input type='radio' name='file' value={"Video"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")} />Video</div>
                  <div className='flex gap-2'><input type='radio' name='file' value={"Zip"} onChange={e=>handleChangeInput(i, e.target.value, "fileType")}  />Document</div>
                </div>
              </div>
              }

              <div className='flex items-center justify-between mt-4'>
                <div>Maximum no of files: </div>
                <div>
                <Select onValueChange={e=>handleChangeInput(i, e, "fileCount")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a count" />
                </SelectTrigger>
                <SelectContent className=''>
                  <SelectGroup>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>                  
                </div>
              </div>

              <div className='flex items-center justify-between mt-4'>
                <div>Maximum file size (MB):</div>
                <div>
                <Select onValueChange={(e)=>handleChangeInput(i, e, "maxSize")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent className=''>
                  <SelectGroup>
                    <SelectItem value="1">1 MB</SelectItem>
                    <SelectItem value="10">10 MB</SelectItem>
                    <SelectItem value="100">100 MB</SelectItem>
                    <SelectItem value="1024">1 GB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>                  
                </div>
              </div>


              <div>

              </div>


            </div>

            
            </>
           }


              



          </div>
            
            </>
            ))
          }
          




            <div className='mt-4 flex items-center gap-4' >
            <div className=' w-full'>        
            <Select  onValueChange={(e)=>setType(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Field Type" />
      </SelectTrigger>
      <SelectContent className='w-full'>
        <SelectGroup  >
          {
            FieldType.map((field, i)=>(
              <SelectItem key={i} value={field.value} className=''> <div className='flex items-center gap-2'><span className='text-lg'>{field.icon}</span> {field.name}</div> </SelectItem>
            ))
          }
          
        </SelectGroup>
      </SelectContent>
    </Select></div>
    <div>
      <Button variant={"outline"} className='flex h-10 items-center gap-2 hover:bg-black hover:text-white' onClick={()=>handleAddInput(type)}><span className='text-lg'><GoPlusCircle/></span> Add</Button>
    </div>
    
            </div>






      <DialogFooter className='mt-8'>
      {
        loading ? <Loader/> : <>
        <Button  type="submit" variant={"ghost"} className='h-9' onClick={()=>setOpen(false)}>Cancel</Button>
        <Button  type="submit" className='h-9' onClick={SubmitHandler}>Create Form</Button>
        </>
      }
        
      </DialogFooter>
      </div>
      </div>
      </DialogContent>
    </Dialog>
    

    
    </>
  )
}

export default FormDialog
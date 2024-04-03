import React, { useState } from 'react'
import { TiUserAdd } from "react-icons/ti";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; 

function AddMember() {
    const [names, setNames] = useState([]);
    const [name, setName] = useState('');
    const SubmitHandler =()=>{

    }

    const onChangeHandler =(value:string)=>{
        
        if (value.indexOf(',') != -1) {
            let segments = value.split(',');
            setNames([segments, ...names]);
            setName("");
        }
        setName(value);
        console.log(names);
        
    }
  return (
    <>
    
    
    <Dialog> 
      <DialogTrigger asChild>
      <button className='addCol'><TiUserAdd/> Add Colleagues</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Add Colleagues</DialogTitle>
          <DialogDescription>
          Add Collgeague to your project. You can add multiple people at once by separating their names with commas.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>

          <div className="create_ss">
            <label htmlFor="">Name</label>
            <textarea id="username" placeholder='Enter a name or email address' className="col-span-3 add_input" onChange={e=>onChangeHandler(e.target.value)}  />
          </div>

        </div>

        <DialogFooter>
          <Button type="submit" onClick={SubmitHandler}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
  )
}

export default AddMember
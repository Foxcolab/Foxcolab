"use client";
import { Plus } from "lucide-react";
import { ActionTooltip } from "../tooolkit/Toolkit";
import { useModal } from "@/hooks/modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import axios from "axios"
import { Input } from "@/components/ui/input";
import { FaCamera, FaUsers } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../fileUpload/FileUpload";
import { Server, User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IoMdLock } from "react-icons/io";
import { BsFillSendCheckFill, BsFillThreadsFill } from "react-icons/bs";
import { SiFiles } from "react-icons/si";
import { GoMention } from "react-icons/go";
import { MdCategory, MdDataSaverOn, MdForum } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { FaNoteSticky } from "react-icons/fa6";
import Image from "next/image";
import Loader from "../Loaders/Loader";
import { FaBook, FaUserTie } from 'react-icons/fa'
import { GiArtificialHive, GiBookshelf, GiChestnutLeaf } from 'react-icons/gi'
import { GoLaw } from 'react-icons/go'
import { GrTechnology } from 'react-icons/gr'
import { IoHome } from 'react-icons/io5'
import { MdBusinessCenter, MdEngineering, MdLanguage, MdPeople, MdPermMedia, MdSportsEsports, MdTour } from 'react-icons/md'
import {  PiGraduationCapFill } from 'react-icons/pi'
import { RiGraduationCapFill } from 'react-icons/ri'
import { SiMediamarkt } from 'react-icons/si'
import { TbCoinRupee, TbMathFunction } from 'react-icons/tb'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BiAtom } from "react-icons/bi";



const Categories = [

  {
      icon: <PiExamFill/> ,
      name:"Assessment"
  },
  // {
  //     icon:<GiArtificialHive/>,
  //     name:"AI"
  // },
  {
      icon:<FaBook/>,
      name:"Books"
  },
  {
      icon:<MdBusinessCenter/>,
      name:"Business & Management"
  },
  {
      icon:<SiMediamarkt />,
      name:"Creative Arts & Media"
  },
  {
      icon:<PiGraduationCapFill/>,
      name:"CBSE"
  },
  {
      icon:<GiChestnutLeaf />,
      name:"Culture & Spiritual"
  },
  {
      icon:<RiGraduationCapFill/>,
      name:"Education "
  },
  {
      icon:<GiBookshelf/>,
      name:"Literature"
  },
  {
      icon:<TbMathFunction/>,
      name:"Science & Mathematics"
  },
  {
      icon:<MdEngineering/>,
      name:"Engineering"
  },
  {
      icon:<BiAtom/>,
      name:"Technology"
  },
  {
      icon:<GoLaw/>,
      name:"Law"
  },
  {
      icon:<MdPermMedia/>,
      name:"Entertainment"
  },
  {
      icon:<GrTechnology/>,
      name:"IT & Computer Science",
  },
  {
      icon:<TbCoinRupee />,
      name:"Finance"
  },
  {
      icon:<MdSportsEsports/>,
      name:"Sports & Games"
  },
  {
      icon:<MdLanguage/>,
      name:"Languages"
  },
  {
      icon:<MdTour/>,
      name:"Tourism"
  },
  {
      icon:<MdPeople/>,
      name:"Politics & Society"
  },
  {
      icon:<FaUserTie/>,
      name:"Job Portal"
  }
]

interface MyEventTarget extends EventTarget {
    value: string
}

interface MyFormEvent<T> extends React.FormEvent<T> {
    target: MyEventTarget
}

interface Props {
  // servers:Server[]
  user:User
}




export const SidebarActions = ({user}:Props)=>{
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

 
  const [openDialog, setOpenDialog] = useState(false);

    const {onOpen} = useModal();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState("public");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dp, setDp] = useState(null);
    const [category, setCategory] = useState('');
    // const []
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const formSchema = z.object({
      name: z.string().min(1, {
        message: "Server name is required."
      }),
      imageUrl: z.string().min(1, {
        message: "Server image is required."
      })
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        imageUrl: "",
      }
    });




    const submitHandler =async()=>{
        try {
            setLoading(true);
            let fileUrl;
            // if(preview){
            //   fileUrl = await UploadImage();
            //   fileUrl=fileUrl[0];
            // }
            const res = await axios.post('/api/server/new', {name, description, type, displayPic:'661de204bae329eb20417425'})            ', serverType:category});
            console.log(res);
            setOpenDialog(false);
            if(res.status===200){
                router.push(`/servers/${res.data.server.id}`);
                setLoading(false)
        
              }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    const UploadImage  = async()=>{
      try {
          const formData = new FormData();
          formData.append('file', dp);
          // setupLoading(true);
          const res = await axios.post('/api/upload', formData);
          if(res.status===200){
          // setupLoading(false);
          return res.data.fileUrl[0];
          }
      } catch (error) {
          // setupLoading(false);
          
      }
  }

  const onChangeHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
      console.log("AVATARRR");
      const files = e.target.files;
      if(!files) return;
      console.log(files);
      const fileUrl = URL.createObjectURL(files[0]);
      setPreview(fileUrl)
      setDp(files[0]);
      // setPreview(fileUrl);
  }


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post("/api/server/new", values);
  
        form.reset();
        router.refresh();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    
  
    if (!isMounted) {
      return null;
    }
    // const text = 
  
    return(<>
    
        <ActionTooltip side="right" align="center" label="Add a server" >
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
          <button className="group add_server"
        // onClick={()=>onOpen("createServer")}
        >
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center add_server_plus border">
            <Plus 
            className="
            
             transition 
            " size={25}/>
            </div>   
        </button>
          </DialogTrigger>

          <DialogContent className="new_server_container">
            <div className="new_ser_serv">
              <div className="new_serv_title">
                <div className="new_ser_nm">
                  {
                    preview ? <Image src={preview} height={100} width={100} alt="" /> : <>{name==="" ? "S": name.charAt(0) }  </>
                  }
                
                </div>
              </div>
              <div className="new_ser_chann">
                <div className="server_final_name">{name==="" ? "Server Name" : name}</div>
                <div className="new_side_sec">
                  <div className="new_side_item"><span><BsFillThreadsFill/></span> Threads</div>
                  <div className="new_side_item"><span><SiFiles/></span>Files</div>
                  <div className="new_side_item"><span><GoMention/></span>Mentions & Reactions</div>
                  <div className="new_side_item"><span><FaUsers/></span> User Groups</div>
                  <div className="new_side_item"><span><MdDataSaverOn/></span> Save for later</div>
                  <div className="new_side_item"><span><BsFillSendCheckFill/></span> Drafts & Sents</div>
                </div>
                <div className="new_side_sec">
                  <div className="new_side_item new_side_bg_tm font-bold"><span><MdCategory/></span> Sections</div>
                  <div className="new_side_item"><span># </span> Text Channel</div>
                  <div className="new_side_item"><span><PiExamFill/> </span> Assessments</div>
                  <div className="new_side_item"><span><FaNoteSticky/></span> Canvas</div>
                  <div className="new_side_item"><span><MdForum/> </span> Forums</div>
                </div>
              </div>
              <div className="new_serv_body">
                <div className="text-[2rem] font-bold " >Customize your Server</div>
                <div className="text-[1.0rem] font-semibold py-1">Let's setup some server details</div>
                <div className="text-gray-400 text-[0.9rem]">(Don't worry you can  change  this anytime)</div>
               
                    <div className="sever_profile_upload">
                    <label htmlFor="fileInput">
                    <div className="upload_logo">
                      {
                        preview ? <Image src={preview} height={100} width={100} alt="" /> :  <> <div className="flex items-center justify-center flex-col"><span className="text-base"><FaCamera/></span> Upload logo</div>   </>
                      }
                      
                      </div>
                    
                    {/* { previewc && !showOptc && <Image src={previewc} height={100} width={100} alt='image' /> } */}
    </label>
    <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onChangeHandler} />
                      {/* <label htmlFor="file">
                        <div className="upload_logo">Upload logo</div>
                        <input type="file" name="image" id="image" />
                      </label> */}
                    </div>
                    <div className="my-4 new_serv_sec">
                      <label htmlFor="">Server Name</label>
                      <Input type="text" className="serv_inputs" onChange={(e:any)=>setName(e.target.value)} />
                    </div>
                    <div className="my-4 new_serv_sec">
                      <label htmlFor="" className="">Server Description</label>
                      <Textarea className="resize-none serv_inputs" onChange={(e:any)=>setDescription(e.target.value)} />
                    </div>
                    {
                      user?.role==="admin" && 
                      <div className="my-4 new_serv_sec">
                      <label htmlFor="" className="mb-2">Server Cateogry</label>
                      <Select onValueChange={(e)=>setCategory(e)} >
  <SelectTrigger className="">
    <SelectValue placeholder="Server Category" />
  </SelectTrigger>
  <SelectContent className="serv_inputs">
                      {
                        Categories.map((category)=>(
                          <SelectItem className="" value={category.name}><div className="flex items-center text-base gap-2"><span className="text-lg">{category.icon}</span> {category.name}</div></SelectItem>
                        ))
                      }
                      
  </SelectContent>
</Select>

                      {/* <Textarea className="resize-none serv_inputs" onChange={(e:any)=>setDescription(e.target.value)} /> */}
                    </div>
                    }
                   
                    <div className="server_type_con">
                      <label htmlFor="">Server Type</label>
                      <div className="server_types_c">
                        <div className={cn("sing_server", type==="public" && "active_ser_type")}>
                          <button className="text-left" onClick={()=>setType("public")}>
                          <div className="sing_type_name flex items-center gap-2"><span className="text-lg"><FaUsers/></span> Public</div>
                          <div className="sing_type_des">Anyone on the internet can create an account and join your server </div>
                          </button>
                        </div>
                        <div className={cn("sing_server border border-green-500", type==="private" && "active_ser_type")} >
                          <button className="text-left" onClick={()=>setType("private")}>
                          <div className="sing_type_name flex items-center gap-2"><span className="text-lg"><IoMdLock/></span> Private</div>
                          <div className="sing_type_des">Only people you invite people can join your server</div>
                          
                          </button>
                          
                        </div>
                      </div>
                    </div>
                   
                   <div className="mt-8 flex gap-4">
                    {
                      loading ? <Loader/> : <>
                       <button className="px-5 py-[0.35rem] border rounded hover:bg-gray-800 font-semibold" onClick={()=>setOpenDialog(false)}>Cancel</button>
                    <button className="px-5 py-[0.35rem] rounded bg-green-500 text-white hover:bg-green-600 font-semibold" onClick={submitHandler}>Create</button>
                      </>
                    }
                   
                   </div>
                   
              </div>
            </div>


          </DialogContent>





          {/* <DialogContent className="sm:max-w-[525px] home_containerr">
            <DialogHeader >
              <DialogTitle className="dialog_header">Create A New Server</DialogTitle>
              <DialogDescription className="dialog_des">
                Give your new server a personality with a name. You can always change it later
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="dialog_file">
           <span>  <FaCamera/>Upload</span>

          
            </div>
            <div className="dialog_input">
                <Label className="dialog_title">SERVER'S NAME</Label>
                <Input className="outline-white text-black mt-1 text-base" onChange={nameHandler} />
            </div>
            <div className="dialog_input">
                <Label className="dialog_title">SERVER'S DESCRIPTION</Label>
                <Input className="outline-white text-black mt-1 text-base" onChange={descriptionHandler} />
                <DialogDescription className="dialog_des mt-1">
                Describe about your server
              </DialogDescription>
            </div>
            </form>
            </Form>
            <DialogFooter>
              <Button type="submit" variant="outline" className="text-white bg-transparent" onClick={submitHandler}>Next</Button>
            </DialogFooter>
          </DialogContent> */}
        </Dialog>
    
    
    
    
    
    
        </ActionTooltip>
       
    </>)
}
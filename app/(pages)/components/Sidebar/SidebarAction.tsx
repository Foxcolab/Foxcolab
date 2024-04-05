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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../fileUpload/FileUpload";

interface MyEventTarget extends EventTarget {
    value: string
}

interface MyFormEvent<T> extends React.FormEvent<T> {
    target: MyEventTarget
}



export const SidebarActions = ()=>{
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

 

    const {onOpen} = useModal();
    const [name, setName] = useState();;
    const [description, setDescription] = useState('');
    const [type, setType] = useState('public');
    const [loading, setLoading] = useState(true);
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




    const descriptionHandler = (e :ChangeEvent<HTMLInputElement>)=>{
        setDescription(e.target.value);
    }
    const nameHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }
    const submitHandler =async()=>{
        try {
            setLoading(true);
            const res = await axios.post('/api/server/new', {name, description, type});
            console.log(res);
            
            if(res.status===200){
                router.push(`/servers/${res.data.server.id}`);
                setLoading(false)
        
              }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

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
  
    return(<>
    
        <ActionTooltip side="right" align="center" label="Add a server" >
        <Dialog >
          <DialogTrigger asChild>
          <button className="group add_server"
        onClick={()=>onOpen("createServer")}
        >
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center add_server_plus border">
            <Plus 
            className="
            
             transition 
            " size={25}/>
            </div>   
        </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] home_containerr">
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

           {/* <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
              

                    {/* <input type="file" placeholder="Upload" className="hidden" /> */}
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
          </DialogContent>
        </Dialog>
    
    
    
    
    
    
        </ActionTooltip>
       
    </>)
}
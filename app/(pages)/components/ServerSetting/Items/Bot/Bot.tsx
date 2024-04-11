import React, { useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import CreateResponse from './CreateResponse'
import { useParams, useRouter } from 'next/navigation'
import SingleOpenBot from './SingleOpenBot'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BotResponse } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loader from '../../../Loaders/Loader'
import { Button } from '@/components/ui/button'
import { AiFillDelete } from 'react-icons/ai'
import { RiEditBoxFill, RiEditCircleFill } from 'react-icons/ri'
import UpdateResponse from './UpdateResponse'
import axios from 'axios'


interface Props {
    setOpen: any
    botResponse:BotResponse[]
    hasPermission:boolean
  }
function Bot({setOpen, botResponse, hasPermission}:Props) {
  const params = useParams();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [response, setResponse] = useState<null | BotResponse>(null);
  const [removeDialog, setRemovedDialog] = useState(false);
  const [responseId, setResponseId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editDialog, setEditDailog] = useState(false);

  const router = useRouter();

  const onClickHandler =(res:BotResponse)=>{
    console.log("Clickeddd")
    setSheetOpen(true);
    setResponse(res);
  }

  const RemovedHandler=(responseId:string, responseTitle:string)=>{
    setSheetOpen(false);
    console.log("Three dot");
    setResponseId(responseId);
    setName(responseTitle);
    setRemovedDialog(true);
  }
  const EditHandler=(res:BotResponse)=>{
    setResponse(res);
    setEditDailog(true);
  }

  const RemoveResponse =async()=>{
    try {
      setLoading(true);
      const res = await axios.delete(`/api/bot/response?serverId=${params?.id}&botResponseId=${responseId}`);
      router.refresh();
      setLoading(false);
      setRemovedDialog(false);
    } catch (error) {
      setLoading(false);
     console.log(error); 
    }
  }

  return (
    <>

        <ItemHeader setOpen={setOpen} title='Bots' />
        <div className="setting_section" style={{borderBottom:"none"}}>
        <div className="setting_section_title">Slackbot can automatically respond to messages that members of your server send in channels. </div>
        {
          hasPermission && <CreateResponse  serverId={params?.id as string} />
        }
        
        {/* <SingleOpenBot/> */}


        <Table className='server_member_table bot_res_table mt-4 '>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Triggered Text</TableHead>
          <TableHead>Response Text</TableHead>
          {/* <TableHead>No of File</TableHead> */}
          <TableHead>Created By</TableHead>
          <TableHead>Timestamp</TableHead>
          {
            hasPermission && <TableHead>Operations</TableHead>
          }
          


        </TableRow>
      </TableHeader>
      <TableBody className='cursor-pointer bot_res_table_row'>
        {
          botResponse &&  botResponse.map((response)=>(
            <TableRow key={response.id} >
              <TableCell onClick={()=>onClickHandler(response)}>{response.triggeredText}</TableCell>
              <TableCell onClick={()=>onClickHandler(response)}>{response.responseText}</TableCell>
              {/* <TableCell>{response.responseFileUrl.length}</TableCell> */}
              <TableCell onClick={()=>onClickHandler(response)}>{response.createdMember.user.name}</TableCell>
              <TableCell onClick={()=>onClickHandler(response)}>{format(new Date(response.updatedAt), 'dd MMM, yyyy')}</TableCell>
              {
                hasPermission && <TableCell className='member_operations' >
                <button className='bg-gray-500 text-white' onClick={()=>EditHandler(response)}><RiEditBoxFill/></button>
                <button className='bg-red-500 text-white' onClick={()=>RemovedHandler(response.id, response.triggeredText)}><AiFillDelete/></button>
                </TableCell>
              }
              


            </TableRow>
          ))
        }
    </TableBody>
      </Table>

        {
          sheetOpen && <SingleOpenBot open={sheetOpen} setOpen={setSheetOpen} botResponse={response} />
        }

        {
          editDialog && <UpdateResponse botResponse={response} open={editDialog} setOpen={setEditDailog}  />
        }


        {
          removeDialog && 
          <Dialog open={removeDialog} onOpenChange={setRemovedDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Remove Member</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-gray-800">
       
        <div>
          <div className='text-lg font-bold text-gray-300 my-4'>
          Are you absolutely sure to delete the response <span className='text-gray-200'>{name} ?</span> 
          </div>
        <div className='text-gray-400 font-sm'>
          This action cannot be undone. This action will delete the bot response.
        </div>
        </div>
        <DialogFooter className='pt-4'>
          {
            loading ? <Loader/> : <> 
            <Button variant={"outline"} onClick={()=>setRemovedDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-red-500 text-white' onClick={()=>RemoveResponse()}>Remove</Button>
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>

        }
        </div>

    </>
  )
}

export default Bot
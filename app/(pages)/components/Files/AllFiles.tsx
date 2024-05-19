"use client";
import { Member, Message, Server, UploadedFile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import FileFilter from './AllFilesComponents/FileFilter'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import FromFile from './AllFilesComponents/FromFile'
import ChannelIn from './AllFilesComponents/ChannelIn'
import FileType from './AllFilesComponents/FileType'
import DateFilter from './AllFilesComponents/DateFilter'
import Newest from './AllFilesComponents/Newest';
import { ActionTooltip } from '../tooolkit/Toolkit';
import { format } from 'date-fns';
import AllFilesContainer from './AllFilesComponents/AllFilesContainer';

interface Props {
    MessageFile:Message[] & {
        uploadedFiles:UploadedFile[]
    }
    server:Server & {
        Members: Member[]
    }

}

const DATE_FORMAT = "d MMM yyyy";

function getFileExtension(filename:string) {
    let data = filename.split('**').pop();
    if(data?.includes('application')){
        data = data?.slice( data.indexOf('/'));
    }else {
        data = data?.slice(0, data.indexOf('/'));
    }
    return data;
}
function AllFiles({MessageFile, server}:Props) {
    // const [MsgFiles, setMsgFiles] = useState(MessageFile);
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState('All');
    const [fileType, setFileType] = useState('All');
    const [fromIn, setFromIn] = useState('All');
    // const [date, setDate] = useState(null);
    const [startingDate, setStartingDate] = useState<Date | null>(null)
    const [endingDate, setEndingDate] = useState<Date | null>(null);
    const [dateType, setDateType] = useState('All');
    // const [endingDate, setEndingDate] = useState(null);
    // const [dateType, setDateType] = useState('');
    const [sortingOrder, setSortingOrder] = useState('Newest');
    const [listStyle, setListStyle] = useState('list');
    const [filteredFile, setFilteredFile] = useState<UploadedFile[]>();


    // console.log(startingDate, endingDate, )


    useEffect(()=>{
        setLoading(true);
        
        const filterMessages:UploadedFile[] = MessageFile.flatMap((message)=>{
            return message?.uploadedFiles?.filter((file:UploadedFile)=>{
                if ((from!=='All' ) && message.memberId !== from) {
                    return false;
                  }
                  if (fromIn!=='All' && message.channelId !== fromIn) {
                    return false;
                  }
                  if(fileType!=='All' && file.type!==fileType){
                    return false;
                  }

              


                  if ((dateType!=='All' && dateType!=="Range" && dateType!=="Last 7 days" && dateType!=="Last 30 days" && dateType!=="Last three months" && dateType!=="Last 12 months" && dateType!=="Before" && dateType!=="After") &&
                  format(new Date(file.createdAt), DATE_FORMAT)!==format(new Date(startingDate), DATE_FORMAT)) {
                    return false;
                  }
                  
                  
                  if((dateType!=='All' && dateType!=="Today" && dateType!=="Yesterday" && dateType!=='On') && (format(new Date(file.createdAt), DATE_FORMAT)<=format(new Date(startingDate), DATE_FORMAT) && format(new Date(file.createdAt), DATE_FORMAT)>=format(new Date(endingDate), DATE_FORMAT) )){
                    return false;
                  } 
                  return true;
                });

            })
            setFilteredFile(filterMessages);
            setLoading(false);
        
    }, [MessageFile, from, fileType, fromIn, dateType, startingDate, endingDate])


    useEffect(()=>{
        if(sortingOrder==="Newest"){
            filteredFile?.sort((a:UploadedFile, b:UploadedFile) => b.createdAt - a.createdAt);
        }
        else if(sortingOrder==="Oldest"){
            filteredFile?.sort((a:UploadedFile, b:UploadedFile) => a.createdAt - b.createdAt);
        }
        else if(sortingOrder==="A to Z"){
            filteredFile?.sort((a, b) => a.name.localeCompare(b.name));
        }else {
            filteredFile?.sort((a, b) => b.name.localeCompare(a.name));
        }
                
        
    }, [MessageFile, filteredFile, sortingOrder])






  return (
    <>
    
    <div className='px-4'>
        <div className="file_search_box pt-4">
            <input type="text" className='file_search' />
        </div>
        <div className='flex justify-between py-4'>
        <div className='file_left_filter'>
            
            <FromFile serverMembers={server.Members} setFrom={setFrom} from={from}/>
            {/* <button>In <IoIosArrowDown/></button> */}
            <ChannelIn serverChannels={server.channels} fromIn={fromIn} setFromIn={setFromIn} />
            <FileType  setFileType={setFileType} fileType={fileType} />
            <DateFilter setStartingDate={setStartingDate} setEndingDate={setEndingDate} setDateType={setDateType}  dateType={dateType} endingDate={endingDate} startingDate={startingDate} />
            <FileFilter server={server} from={from} setFrom={setFrom} fromIn={fromIn} setFromIn={setFromIn} startingDate={startingDate} setStartingDate={setStartingDate} dateType={dateType} setDateType={setDateType} fileType={fileType} setFileType={setFileType} endingDate={endingDate} setEndingDate={setEndingDate}  />
            
        </div>
        <div className='file_right_filter'>
            <Newest sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
            {/* <button className='file_filtering'>Newest File <IoIosArrowDown/></button> */}
            <div className='file_view_as'>
            <ActionTooltip label='View as list' align='center' side='top'>
            <button onClick={()=>setListStyle("list")} className={listStyle==="list"? 'active_view':''}><FaList/></button>
            </ActionTooltip>

            <ActionTooltip label='View as grid' align='center' side='top'>
            <button onClick={()=>setListStyle("grid")} className={listStyle==="grid"? 'active_view':''}><BsFillGridFill/></button>
            </ActionTooltip>
            </div>
            
           
        </div>
        </div>
    <div className='all_files_container'>
        {
          !filteredFile ?<>
            <div className='text-center mt-12'>
                <h1 className='font-bold text-zinc-400 text-lg'>No Results</h1>
                <h6 className=' text-zinc-500 text-sm'>You may want to try adjusting your filter.</h6>
            </div>
            </> : 
            <>
            {/* {loading && "Loading..."} */}
             <AllFilesContainer listStyle={listStyle} MsgFiles={filteredFile} />
            
            </>
        }
   
    </div>
    </div>


    
    
    </>
  )
}

export default AllFiles



  
"use client";
import { Member, Message, Server } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import SingleMsgFile from '../Channel/ChannelPin/SingleMsgFile'
import FileFilter from './AllFilesComponents/FileFilter'
import { BsFillGridFill } from 'react-icons/bs'
import { IoFilterSharp } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { FaList } from 'react-icons/fa'
import FromFile from './AllFilesComponents/FromFile'
import ChannelIn from './AllFilesComponents/ChannelIn'
import FileType from './AllFilesComponents/FileType'
import DateFilter from './AllFilesComponents/DateFilter'
import Newest from './AllFilesComponents/Newest';
import { ActionTooltip } from '../tooolkit/Toolkit';
import GridFile from './AllFilesComponents/GridFile';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import AllFilesContainer from './AllFilesComponents/AllFilesContainer';

interface Props {
    MessageFile:Message[]
    server:Server[]

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
    const [MsgFiles, setMsgFiles] = useState(MessageFile);
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState('');
    const [fileType, setFileType] = useState('');
    const [fromIn, setFromIn] = useState('');
    const [date, setDate] = useState(null);
    // const [endingDate, setEndingDate] = useState(null);
    // const [dateType, setDateType] = useState('');
    const [sortingOrder, setSortingOrder] = useState('');
    const [listStyle, setListStyle] = useState('list');

    const router = useRouter();
    const  onFiltering =(e:string, filterType:string, dateType:string, endingDate:Date)=>{
        try {
            
            console.log("FileType", e, filterType);
            setLoading(true);
            const msg:Message[] = []
            if(filterType==="from"){
                setFrom(e);
                for(let i=0; i<=MessageFile.length; i++){
                    if(MessageFile[i].memberId===e){
                        msg.push(MessageFile[i]);
                    }
                }
            }
            else if(filterType==="in"){
                for(let i=0; i<MessageFile.length; i++){
                    if(MessageFile[i].channelId===e){
                        msg.push(MessageFile[i]);
                    }
                }
            }
            else if(filterType==="date"){
                if(dateType==="Any Time"){
                    // MsgFiles.push(MessageFile);
                    for(let i=0;i<MessageFile.length; i++){
                        msg.push(MessageFile[i]);
                    }
                }
                if(dateType==="Today"){
                    for(let i=0; i<MessageFile.length; i++){
                        if(format(new Date(MessageFile[i].createdAt), DATE_FORMAT)===format(new Date(e), DATE_FORMAT)){
                            msg.push(MessageFile[i]);
                        }
                    }
                }
                else if(dateType==="Yesterday"){

                    for(let i=0; i<MessageFile.length; i++){
                        if(format(new Date(MessageFile[i].createdAt), DATE_FORMAT)===format(new Date(e), DATE_FORMAT)){
                            msg.push(MessageFile[i]);
                        }
                    }
                }
                else if(dateType==="Last 7 days" || dateType==="Last 30 days" || dateType==="Last 12 months"){
                    console.log("Filter Type", dateType);
                    const starting = format(new Date(e), DATE_FORMAT);
                    const ending = format(new Date(), DATE_FORMAT);
                    console.log("Starting:", starting);
                    console.log("Ending:", ending);
                    console.log("date:", e);
                    for(let i=0; i<MessageFile.length; i++){
                        if(
                            (new Date(MessageFile[i].createdAt)>=new Date(e)) && (new Date(MessageFile[i].createdAt)<=new Date())){
                            msg.push(MessageFile[i]);
                        }
                    }
                }
                else if(dateType==="On"){
                    console.log("ON", e);
                    
                    for(let i=0; i<MessageFile.length; i++){
                        console.log(format(new Date(MessageFile[i].createdAt), DATE_FORMAT)===format(new Date(e), DATE_FORMAT), 
                        format(new Date(e), DATE_FORMAT),
                        format(new Date(MessageFile[i].createdAt), DATE_FORMAT)
                        )
                        if(format(new Date(MessageFile[i].createdAt), DATE_FORMAT)===format(new Date(e), DATE_FORMAT)){
                            msg.push(MessageFile[i]);
                        }
                    }
                }
                else if(dateType==="After"){
                    for(let i=0; i<MessageFile.length; i++){
                        if(format(new Date(MessageFile[i].createdAt), DATE_FORMAT)>format(new Date(e), DATE_FORMAT)){
                            msg.push(MessageFile[i]);
                        }
                    }
                }
                else if(dateType==="Before"){
                    for(let i=0; i<MessageFile.length; i++){
                        if(format(new Date(MessageFile[i].createdAt),DATE_FORMAT)<format(new Date(e), DATE_FORMAT)){
                            msg.push(MessageFile[i]);
                        }
                    }
                }else if(dateType==="Range"){
                    for(let i=0; i<MessageFile.length; i++){
                        let starting = new Date(e);
                        const ending = new Date(endingDate);
                        const dt = new Date(MessageFile[i].createdAt);
                        if(starting<=dt && dt<=ending){
                            msg.push(MessageFile[i]);
                        }
                    }
                }

            }
            else if(filterType==="fileType"){
                if(e==="all"){
                    for(let i=0;i<MessageFile.length; i++){
                        msg.push(MessageFile[i]);
                    }
                }
                for(let i=0; i<MessageFile.length; i++){
                    let isFound = false;
                    console.log("FileUrl of", i, MessageFile[i].fileUrl)
                    for(let j=0; j<MessageFile[i].fileUrl.length; j++){
                        console.log("File Extension: ",getFileExtension(MessageFile[i].fileUrl[j]))
                        console.log("File Value:", e);
                        console.log("is Value and Type:", getFileExtension(MessageFile[i].fileUrl[j])===e);
                        if(getFileExtension(MessageFile[i].fileUrl[j])===e){
                            isFound = true;
                            console.log("Founded a type")
                            break;
                        }
                    }
                    if(isFound==true){
                        let temp = MessageFile[i];
                        console.log(temp);
                        console.log(temp.fileUrl.length);
                        temp.fileUrl = []
                        console.log(temp.fileUrl.length);
                        // let count = 0;
                        for(let j=0; j<MessageFile[i].fileUrl.length; j++){
                            if(getFileExtension(MessageFile[i].fileUrl[j])===e){
                                temp.fileUrl.push(MessageFile[i].fileUrl[j]);
                                // count++;
                            }
                        }
                        console.log(temp.fileUrl);
                        msg.push(temp);
                    }
                    

                }
                // console.log("File Type", fileType, e);
                // for(let i=0; i<MessageFile.length; i++){
                //     let isFound = false;
                //     for(let j=0; j<MessageFile[i].fileUrl.length; j++){
                //         console.log(getFileExtension(MessageFile[i].fileUrl[j]), e);
                //         if(getFileExtension(MessageFile[i].fileUrl[j])===e){
                //             msg.push(MessageFile[i]);
                //             isFound=true;
                //             break;
                //         }
                //     }
                //     if(isFound===false){
                //         break;
                //     }
                //     let length = msg.length - 1;
                //     for(let j=0; j<MessageFile[i].fileUrl.length; j++){
                //         if(getFileExtension(MessageFile[i].fileUrl[j])===e){
                //             msg[length].fileUrl.push(MessageFile[i].fileUrl[j]);
                //         }
                //     }
                // }   
                    
            }
            
            setMsgFiles(msg);
            router.refresh();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    const AllFilter =(from:string, channelId:string, date:string, fileType:string)=>{
        const msgs:Message[] = [];
        
        const filterMessages = MessageFile && MessageFile.filter(message=>{
            if((channelId!=="" || channelId!==null || channelId!==undefined ) && message.channelId!==channelId){
                return false;
            }
            if((from!=="" || from!==null || from!==undefined) && message.memberId!==from){
                return false;
            }
        })
        
        // const filteredMessages = messages.filter(message => {
        //     // Filter by channel Id
        //     if (filterCriteria.channelId !== null && message.channelId !== filterCriteria.channelId)
        //         return false;
        //     // Filter by Created By
        //     if (filterCriteria.createdBy !== null && message.createdBy !== filterCriteria.createdBy)
        //         return false;
        //     // Filter by Created At range
        //     if (filterCriteria.createdAtStart !== null && filterCriteria.createdAtEnd !== null) {
        //         const createdAt = new Date(message.createdAt);
        //         const start = new Date(filterCriteria.createdAtStart);
        //         const end = new Date(filterCriteria.createdAtEnd);
        //         if (!(createdAt >= start && createdAt <= end))
        //             return false;
        //     }
        //     // Filter by FileTypes
        //     if (filterCriteria.fileTypes !== null && filterCriteria.fileTypes !== undefined && filterCriteria.fileTypes.length > 0) {
        //         const fileTypesSet = new Set(filterCriteria.fileTypes);
        //         if (!message.fileTypes.some(fileType => fileTypesSet.has(fileType)))
        //             return false;
        //     }
        //     return true; // Include the message if it passes all filters
        // });
    }



    const getFileName =(file:string)=>{
        const fileUrl = file;
        file = file.replace('https://foxcolab.s3.ap-south-1.amazonaws.com/','')
        file =file.substring(0, file.indexOf('.'));
        if(fileType==="image"){
            return `${file}.jpg`
        }
        else if(fileType==="/pdf"){
            return `${file}.pdf`
        }
        else if(fileType==="/vnd.ms-powerpoint" || fileUrl.includes('.ppt')){
            return `${file}.ppt`
        }else if(fileType==="/vnd.ms-excel" || fileUrl.includes('.xls')){
            return `${file}.xlsx`
        }else if(fileUrl.includes('.txt')){
            return `${file}.txt`
        }else if(fileUrl.includes('.csv')){
            return `${file}.csv`
        }else if(fileType==="/vnd.ms-word"|| fileType==='/msword'|| fileUrl.includes('docx')){
            return `${file}.docx`
        }
        return file;
    }

    const SortingOrderHandler = (e:string)=>{
        let n = MessageFile.length;
        let msgs:Message[] = [];
        console.log("EEEEe", e);
        console.log(e==="Newest file", e==="Oldest file")
        // Newest file Oldest file A to Z  Z to A
        if(e==="Newest file"){
            setLoading(true);
            console.log("Newest Fileeeee")
            MsgFiles.sort((a:Message,b:Message)=>b.createdAt-a.createdAt);
            setMsgFiles(MsgFiles);
            console.log(MsgFiles);
            router.refresh();
            setLoading(false);
        }else if(e==="Oldest file"){
            setLoading(true);
            console.log("Oldest Fileeeee");
            MsgFiles.sort((a:Message,b:Message)=>a.createdAt-b.createdAt);
            setMsgFiles(MsgFiles);
            router.refresh();
            console.log(MsgFiles);
            setLoading(false);
        }
        else if(e==="A to Z"){
            setLoading(true);
            console.log("A to Z");
            MsgFiles.sort((a:Message,b:Message)=>b?.createdAt-a?.createdAt);
            MsgFiles.forEach(message => {
                message.fileUrl.sort();
            });

            setMsgFiles(MsgFiles);
            router.refresh();
            console.log(MsgFiles);
            setLoading(false);
        }
        else if(e==="Z to A"){
            setLoading(true);
            console.log("Z to A");
            MsgFiles.sort((a:Message,b:Message)=>a.createdAt-b.createdAt);
            MsgFiles.forEach(message => {
                message.fileUrl.sort();
            });

            setMsgFiles(MsgFiles);
            router.refresh();
            console.log(MsgFiles);
            setLoading(false);
        }

    }



  return (
    <>
    
    <div className='px-4'>
        <div className="file_search_box pt-4">
            <input type="text" className='file_search' />
        </div>
        <div className='flex justify-between py-4'>
        <div className='file_left_filter'>
            
            <FromFile serverMembers={server.Members} setFrom={setFrom} from={from} onFiltering={onFiltering} />
            {/* <button>In <IoIosArrowDown/></button> */}
            <ChannelIn serverChannels={server.channels} fromIn={fromIn} setFromIn={setFromIn} onFiltering={onFiltering}  />
            <FileType onFiltering={onFiltering} setFileType={setFileType} fileType={fileType} />
            <DateFilter date={date} setDate={setDate} onFiltering={onFiltering}     />
            <FileFilter server={server} from={from} setFrom={setFrom} fromIn={fromIn} setFromIn={setFromIn} date={date} setDate={setDate} onFiltering={onFiltering}   />
            
        </div>
        <div className='file_right_filter'>
            <Newest SortingOrderHandler={SortingOrderHandler} />
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
            MsgFiles.length===0 ? <>
            <div className='text-center mt-12'>
                <h1 className='font-bold text-zinc-400 text-lg'>No Results</h1>
                <h6 className=' text-zinc-500 text-sm'>You may want to try adjusting your filter.</h6>
            </div>
            </> : 
            <>
            {loading && "Loading..."}
             <AllFilesContainer listStyle={listStyle} MsgFiles={MsgFiles} />
            
            </>
        }
   
    </div>
    </div>


    
    
    </>
  )
}

export default AllFiles
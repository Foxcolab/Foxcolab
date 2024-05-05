import { Table as PrismaTable, TableRow as PrismaTableRow, TableColumn, TableRowData } from '@prisma/client'
import { CheckIcon, LucideFilter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoLink, IoSearchOutline, IoSettings } from 'react-icons/io5'
import { RiFilter2Fill } from 'react-icons/ri'
import { TbArrowsSort, TbNumber12Small } from 'react-icons/tb'
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
import { FaComment, FaEyeSlash, FaPlus, FaRegStar } from 'react-icons/fa'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { Input } from '@/components/ui/input'
import { MdDriveFileRenameOutline, MdEditOff, MdEditSquare, MdEmail, MdOutlineInfo, MdShortText } from 'react-icons/md'
import { BsBodyText, BsCalendar2Date, BsEyeSlashFill, BsPersonBoundingBox, BsThreeDots } from 'react-icons/bs'
import { GrStatusGood } from 'react-icons/gr'
import { IoIosArrowDropdown, IoIosCheckboxOutline, IoIosRadioButtonOn } from 'react-icons/io'
import { FaBarsProgress } from 'react-icons/fa6'
import { SiFiles } from 'react-icons/si'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { BiCollapseVertical, BiCustomize, BiSolidLockAlt, BiSolidLockOpen } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


import { Textarea } from '@/components/ui/textarea'
import Loader from '../../Loaders/Loader'
import { ActionTooltip } from '../../tooolkit/Toolkit'



const plusDropDown = [
    {
        icon: <MdShortText/>,
        name:"Short Text" ,
        value:"shortText"
    },
    {
        icon:<BsBodyText/>,
        name:"Long Text",
        value:"longText"
    },
    {
        icon:<BsCalendar2Date/>,
        name:"Date",
        value:"date"
    },
    {
        icon:<GrStatusGood/>,
        name:"Status",
        value:"status"
    },
    {
        icon:<BsPersonBoundingBox/>,
        name:"Person",
        value:"person"
    },
    {
        icon:<TbNumber12Small/>,
        name:"Number",
        value:"number"
    },

    {
        icon:<MdEmail/>,
        name:"Email",
        value:"email"
    },
    {
        icon:<IoIosCheckboxOutline/>,
        name:"Checkbox",
        value:"checkbox"
    }, {
        icon:<FaRegStar/>,
        name:"Rating",
        value:"rating"
    },
    {
        icon:<IoIosRadioButtonOn/>,
        name:"Vote",
        value:"vote"
    },
    {
        icon:<FaBarsProgress/>,
        name:"Progress",
        value:"progress"
    },
    {
        icon:<IoIosArrowDropdown/>,
        name:"Dropdown",
        value:"dropdown"
    },

    {
        icon:<IoLink/>,
        name:"Link",
        value:"link"
    },
    {
        icon:<SiFiles/>,
        name:"File",
        value:"file"
    },
]



interface Props {
    table:PrismaTable & {
        tableRows:PrismaTableRow[]
    }
    sectionId:string
}



function SingleTable({table,sectionId}:Props) {
    // const tableRows = table.tableRows;
    const [tableRows, setTableRows] = useState(table.tableRows);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("");
    const [hoverId, setHoverId] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [dropdownDialog, setDropDownDialog] = useState(false);
    const [dropDownId, setDropDownId] = useState('');
    const [descDialog, setDescDialog] = useState(false);
    const [description, setDescription] = useState('');
    const [descLoader, setDescLoader] = useState(false);
    const [addColDialog, setAddColDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [columnName, setColumnName] = useState('');
    const [colName, setColName] = useState('');
    const [colType, setColType] = useState('');
    const params = useParams();
    const router = useRouter();

    useEffect(()=>{
        if(table!==null && table!==undefined){
            setTableRows(table.tableRows);
        }
    }, [table])

    const onColumnUpdate =async(id:string, columnType:string, columnDescription:string)=>{
        try {
            setLoading(true);
            setEditing(false);
            setEditingId('');
            if(inputValue==='') return;
            const res = await axios.post(`/api/spreadsheet/table/column/update?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}&columnId=${id}`, {columnName:inputValue, columnDescription:columnDescription, columnType:columnType});
            router.refresh();
            setLoading(false);
            setInputValue('');
            
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const ColumnDescriptionHandler =async(id:string)=>{
        try {
            if(description==='') return;
            setDescLoader(true);
            const res = await axios.post(`/api/spreadsheet/table/column/update/description?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}&columnId=${id}`, {columnDescription:description});
            setDescription('');
            setDescLoader(false);
            router.refresh();
        } catch (error) {
            setDescLoader(false);
            console.log(error)
        }
    }

    const ColumnDeleteHandler =async(id:string)=>{
        try {
            setDescLoader(true);
            const res = await axios.delete(`/api/spreadsheet/table/column/delete?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}&columnId=${id}`);
            setDescLoader(false);
            router.refresh();
        } catch (error) {
            setDescLoader(false);
            console.log(error);
        }
    }

    const RestrictionHandler =async(id:string, restriction:boolean)=>{
        try {
            const res = await axios.post(`/api/spreadsheet/table/column/update/restricted?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}&columnId=${id}`, {restricted:restriction});
            router.refresh();
        } catch (error) {
            setDescLoader(false);
            console.log(error)
        }
    }

    const AddColumnHanler =async()=>{
        try {
            setDescLoader(true);

            const res =await axios.post(`/api/spreadsheet/table/column/add?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}`, {columnName:colName, columnDescription:description, columnType:colType})
            setDescription('');
            setDescLoader(false);
            router.refresh();
            setAddColDialog(false);

        } catch (error) {
            setDescLoader(false);
            console.log(error);
        }
    }

    const UpdateRowHandler = async(id:string)=>{
        try {
            setLoading(true);
            setEditing(false);
            setEditingId('');
            const res = await axios.post(`/api/spreadsheet/table/row/rowData/update?serverId=${params?.id}&spreadsheetId=${params?.spreadsheetId}&tableId=${table.id}&sectionId=${sectionId}&rowDataId=${id}`, {data:[inputValue], labels:[]});
            router.refresh();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const EditHandler =(id:string)=>{
        setEditingId(id);
        setEditing(true);
    }
    const HoverHandler =(id:string)=>{
        setHoverId(id);
    }
    const DropdownHandler =(id:string)=>{
        setDropDownId(id);
        setDropDownDialog(true);
    }
  return (
    <>
    
    <div className="">
        <div className="flex items-center justify-center gap-4 pt-4 table_filter">
            <button className='flex items-center gap-1 font-semibold text-[0.9rem]'><span><IoSearchOutline/></span> Search</button>
            <button className='flex items-center gap-1 font-semibold text-[0.9rem]'><span><RiFilter2Fill/></span>Filter</button>
            <button className='flex items-center gap-1 font-semibold text-[0.9rem]'><span><TbArrowsSort/></span>Sort</button>
        </div>
        <div className='p-4'>

           <Table className='border spreadsheet_table'>
      <TableHeader>

       
      </TableHeader>
      <TableBody>
        {
            table && tableRows.map((tableRow, i:number)=>(
                <>
                {
                    i===0 ?  <>
                    <TableRow>
                        {
                            tableRow?.columns?.map((col:TableColumn, j:number)=>(
                                <TableHead key={j} className="border text-center w-[17rem]" onClick={()=>EditHandler(col.id)} onBlur={()=>onColumnUpdate(col.id, col.columnType, col.columnDescription as string)} onMouseEnter={()=>HoverHandler(col.id)} onMouseLeave={()=>setHoverId('')}>     
                                    <div className='flex items-center justify-between gap-2'>
                                    <div className={cn('w-full py-1 rounded', hoverId===col.id &&  (editing===false || editingId!==col.id) && 'border')}>{editing && editingId===col.id ? <Input type='text' className='my-2 w-full' defaultValue={col.columnName} onChange={(e)=>setInputValue(e.target.value)} /> : col.columnName}</div>
                                    <div className='flex items-center gap-2 flex-none'>
                                        <ActionTooltip label='Restricted column' side='top' align='center'>
                                        <div className='text-lg cursor-pointer'>{col.restricted && <BiSolidLockAlt/>}</div>
                                        </ActionTooltip>
                                       
                                         <HoverCard>
                                            <HoverCardTrigger><button className='text-lg flex items-center '><MdOutlineInfo/></button></HoverCardTrigger>
                                             <HoverCardContent>

                                             {!col.columnDescription ? "Column Information" : col.columnDescription}

                                            </HoverCardContent>
                                            </HoverCard>     
                                        
                                                                    
                                        
                                        <button className='text-lg' onClick={()=>DropdownHandler(col.id)}>{hoverId===col.id && <BsThreeDots/>}</button>
                                        {
                                            dropDownId===col.id && <DropdownMenu open={dropdownDialog} onOpenChange={setDropDownDialog} >
                                            <DropdownMenuTrigger></DropdownMenuTrigger>
                                            <DropdownMenuContent className='w-[250px] p-2'>
                                            <DropdownMenuSub>
                                              <DropdownMenuSubTrigger> <div className='flex items-center gap-1'><span><IoSettings/></span>Setting</div>  </DropdownMenuSubTrigger>
                                              <DropdownMenuPortal>
                                                <DropdownMenuSubContent className='w-[250px] p-2'>
                                                  <DropdownMenuItem><div className='flex items-center gap-1'><span className='text-lg'><BiCustomize/></span> Customize  column</div></DropdownMenuItem>
                                                  <DropdownMenuItem onClick={()=>{setDescription(col.columnDescription as string); setDescDialog(true)}}><div className='flex items-center gap-1'><span className='text-lg'><MdEditSquare/> </span> Add description</div></DropdownMenuItem>
                                                
                                                  <DropdownMenuSeparator />
                                                  <DropdownMenuItem onClick={()=>RestrictionHandler(col.id, col.restricted===true ? false : true)}> <div className='flex items-center gap-1'>
                                                    {
                                                        col?.restricted  ? <><span className='text-lg'><BiSolidLockOpen/></span>Remove Restriction</> : <><span className='text-lg'><BiSolidLockAlt/></span>Restrict column editing</>
                                                    }
                                                    </div> </DropdownMenuItem>
                                                  <DropdownMenuItem> <div className='flex items-center gap-1'><span className='text-lg'><BsEyeSlashFill/></span> Hide column summary</div> </DropdownMenuItem>

                                                </DropdownMenuSubContent>
                                              </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                                {/* <DropdownMenuItem>Setting</DropdownMenuItem> */}
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem><div className='flex items-center gap-1'><span className='text-lg'><TbArrowsSort/></span>Sort</div> </DropdownMenuItem>
                                                  <DropdownMenuItem> <div className='flex items-center gap-1'> <span className='text-lg'><BiCollapseVertical/></span> Collapse </div></DropdownMenuItem>
                                                  <DropdownMenuSeparator />
                                                  <DropdownMenuItem onClick={()=>EditHandler(col.id)}> <div className='flex items-center gap-1'><span className='text-lg'><MdDriveFileRenameOutline/></span>Rename</div> </DropdownMenuItem>
                                                  <DropdownMenuItem onClick={()=>setDeleteDialog(true)}> <div className='flex items-center gap-1'><span className='text-lg'><AiOutlineDelete/></span> Delete</div> </DropdownMenuItem>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                        }
                                        
                                    </div>
                                    
                                    </div>
                                </TableHead>

                            ))
                        }
<TableHead className="w-full text-center flex items-center justify-center cursor-pointer" onClick={()=>setAddColDialog(true)}> <FaPlus/></TableHead>

{/* <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <TableHead className="w-full text-center flex items-center justify-center cursor-pointer" > <FaPlus/></TableHead>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {plusDropDown.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {framework.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover> */}
                                

                    </TableRow> 
                    
                    </>:
                     <TableRow>
                        {
                            tableRow?.rowData?.map((row:TableRowData, j:number)=>(
                                <>
                                {
                                    j===0 ? <> 
                                    <TableCell className="border" key={j} onClick={()=>EditHandler(row.id)} onBlur={()=>UpdateRowHandler(row.id)}><div className='flex items-center justify-between'> <button className='flex-none'>
                                       
                                        {
                                            editing && editingId===row.id ? <Input type='text' className=' w-full' defaultValue={row.data[0]} onChange={(e)=>setInputValue(e.target.value)} /> :  row.data[0]
                                            }   
                                    </button> <button><FaComment/></button>   </div></TableCell>
                                    </> : <> 
                                    {
                                        row.type==="person" ?<TableCell className="border" key={j} >
                                            {row.assignedMember.map((member:any)=>(
                                                <div className='flex items-center gap-1' key={member.id}>
                                                    {
                                                        member.user.profilePic===null ? 
                                                        <LetterAvatar name={member?.user?.name} size={30} radius={50} /> :
                                                        <UserAvatar src={member?.user?.profilePic} />
                                                    }
                                                </div>
                                            ))}
                                            
                                        </TableCell> :
                                        <TableCell className="border" key={j} onClick={()=>EditHandler(row.id)} onBlur={()=>UpdateRowHandler(row.id)}>
                                            {
                                            editing && editingId===row.id ? <Input type='text' className=' w-full' defaultValue={row.data[0]} onChange={(e)=>setInputValue(e.target.value)} /> :  row.data[0]
                                            }   
                                            </TableCell>
                                    }
                                    
                                    </> 
                                }
                                
                                </>
                            

                            ))
                        }
                     </TableRow> 

                     
                }
               
                
                
                </>
            ))
        }
        <TableRow className='flex items-center gap-2 h-10 px-4'><FaPlus/> Add Item</TableRow>
      </TableBody>
    
    </Table>



        </div>
    </div>
    
    {/* ADd Descrition dialog  */}
    <Dialog open={descDialog} onOpenChange={setDescDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Description</DialogTitle>
          <DialogDescription>
            Add description to the column here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
            <Textarea className='resize-none' defaultValue={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <DialogFooter className='mt-4'>
            {
                descLoader ? <Loader/> : <>  
                <Button  className='border bg-transparent dark:text-white hover:bg-transparent' onClick={()=>setDescDialog(false)}>Cancel </Button>
                <Button type="submit" className='bg-green-500 hover:bg-green-600 text-white' onClick={()=>ColumnDescriptionHandler(dropDownId)}>Save </Button>
                
                </>
            }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>



    <Dialog open={addColDialog} onOpenChange={setAddColDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Add Column</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create a column</DialogTitle>
          <DialogDescription>
            Add a new column by filling the details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <hr />
        <div>
            <div className='mt-4'>
                <label htmlFor="">Column Name</label>
                <div className='mt-2'><Input type="text" onChange={(e)=>setColName(e.target.value)} /></div>
            </div>
            <div className='mt-4'>
                <label htmlFor="">Column Description</label>
                <div className="mt-2"> <Textarea className='resize-none' onChange={(e)=>setDescription(e.target.value)} /> </div>
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <label htmlFor="">Column Type</label>
                <div>
            <Select onValueChange={(e)=>setColType(e)}>
             <SelectTrigger className="w-[180px]">
             <SelectValue placeholder="Select column type" />
            </SelectTrigger>
                <SelectContent>
             <SelectGroup>
                { 
                 plusDropDown && plusDropDown.map((item, i)=>(
                <SelectItem value={item.value} key={i}><div className='flex items-center gap-3'><span className='text-lg'>{item.icon}</span>{item.name}</div></SelectItem>
                 ))
                    
                }
          
        </SelectGroup>
      </SelectContent>
    </Select>

                </div>
            </div>
        </div>
        <DialogFooter className='mt-4'>
            {
                descLoader ? <Loader/> : <>  
                <Button  className='border bg-transparent dark:text-white hover:bg-transparent' onClick={()=>setAddColDialog(false)}>Cancel </Button>
                <Button type="submit" className='bg-green-500 hover:bg-green-600 text-white' onClick={AddColumnHanler}>Save </Button>
                
                </>
            }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>


    <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] pt-10">
        <DialogHeader>
          <DialogTitle>Deleting column {columnName}</DialogTitle>
          <DialogDescription>
            Are you absolutely sure to delele the column {columnName}. You cannot be recovered if you delete the column.
          </DialogDescription>
        </DialogHeader>
        <div>
            </div>
        <DialogFooter className='mt-4'>
            {
                descLoader ? <Loader/> : <>  
                <Button  className='border bg-transparent dark:text-white hover:bg-transparent' onClick={()=>setDescDialog(false)}>Cancel </Button>
                <Button type="submit" className='bg-red-500 hover:bg-red-600 text-white' onClick={()=>ColumnDeleteHandler(dropDownId)}>Delete </Button>
                
                </>
            }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>


    </>
  )
}

export default SingleTable
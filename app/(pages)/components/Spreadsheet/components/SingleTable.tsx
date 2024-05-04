import { Table as PrismaTable, TableRow as PrismaTableRow, TableColumn, TableRowData } from '@prisma/client'
import { CheckIcon, LucideFilter } from 'lucide-react'
import React, { useState } from 'react'
import { IoLink, IoSearchOutline } from 'react-icons/io5'
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
import { FaComment, FaPlus, FaRegStar } from 'react-icons/fa'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { Input } from '@/components/ui/input'
import { MdEmail, MdShortText } from 'react-icons/md'
import { BsBodyText, BsCalendar2Date, BsPersonBoundingBox } from 'react-icons/bs'
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
}



function SingleTable({table}:Props) {

    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    const EditHandler =(id:string)=>{
        setEditingId(id);
        setEditing(true);
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
            table && table.tableRows.map((tableRow, i:number)=>(
                <>
                {
                    i===0 ?  <>
                    <TableRow>
                        {
                            tableRow?.columns?.map((col:TableColumn, j:number)=>(
                                <TableHead key={j} className="border text-center w-[17rem]" onClick={()=>EditHandler(col.id)} onBlur={()=>setEditing(false)}>
                                    
                                    {editing && editingId===col.id ? <Input type='text' className='my-2 w-full' defaultValue={col.columnName} /> : col.columnName}
                                </TableHead>

                            ))
                        }


<Popover open={open} onOpenChange={setOpen}>
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
    </Popover>
                                

                    </TableRow> 
                    
                    </>:
                     <TableRow>
                        {
                            tableRow?.rowData?.map((row:TableRowData, j:number)=>(
                                <>
                                {
                                    j===0 ? <> 
                                    <TableCell className="border" key={j} onClick={()=>EditHandler(row.id)} onBlur={()=>setEditing(false)}><div className='flex items-center justify-between'> <button className='flex-none'>
                                       
                                        {
                                            editing && editingId===row.id ? <Input type='text' className=' w-full' defaultValue={row.data[0]} /> :  row.data[0]
                                            }   
                                    </button> <button><FaComment/></button>   </div></TableCell>
                                    </> : <> 
                                    {
                                        row.type==="person" ?<TableCell className="border" key={j} >
                                            {row.assignedMember.map((member)=>(
                                                <div className='flex items-center gap-1' key={member.id}>
                                                    {
                                                        member.user.profilePic===null ? 
                                                        <LetterAvatar name={member?.user?.name} size={30} radius={50} /> :
                                                        <UserAvatar src={member?.user?.profilePic} />
                                                    }
                                                </div>
                                            ))}
                                            
                                        </TableCell> :
                                        <TableCell className="border" key={j} onClick={()=>EditHandler(row.id)} onBlur={()=>setEditing(false)}>
                                            {
                                            editing && editingId===row.id ? <Input type='text' className=' w-full' defaultValue={row.data[0]} /> :  row.data[0]
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
    
    




    </>
  )
}

export default SingleTable
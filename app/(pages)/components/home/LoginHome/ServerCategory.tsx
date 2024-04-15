import { cn } from '@/lib/utils'
import React from 'react'
import { BiAtom } from 'react-icons/bi'
import { FaBook, FaUserTie } from 'react-icons/fa'
import { GiArtificialHive, GiBookshelf, GiChestnutLeaf } from 'react-icons/gi'
import { GoLaw } from 'react-icons/go'
import { GrTechnology } from 'react-icons/gr'
import { IoHome } from 'react-icons/io5'
import { MdBusinessCenter, MdEngineering, MdLanguage, MdPeople, MdPermMedia, MdSportsEsports, MdTour } from 'react-icons/md'
import { PiExamFill, PiGraduationCapFill } from 'react-icons/pi'
import { RiGraduationCapFill } from 'react-icons/ri'
import { SiMediamarkt } from 'react-icons/si'
import { TbCoinRupee, TbMathFunction } from 'react-icons/tb'



const Categories = [
    {
        icon:<IoHome/>,
        name:"Home"
    },
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


interface Props {
    selectedCategory:string
    setSelectedCategory:any
}

function ServerCategory({selectedCategory, setSelectedCategory}:Props) {
  return (
    <>
    
    <div className="server_categories">
        {
            Categories.map((category)=>(
                <>
                
                <div className={ cn("server_category_item", selectedCategory===category.name ? "server_active" : '')} >
                    <button onClick={()=>setSelectedCategory(category.name)}  > {category.icon} {category.name} </button>
                </div>
                
                </>
            ))
        }
    </div>
    
    </>
  )
}

export default ServerCategory
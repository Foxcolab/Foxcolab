import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MdDeveloperBoard, MdEngineering, MdHealthAndSafety, MdJoinFull, MdOutlinePrivacyTip } from 'react-icons/md';
import { RiCpuLine, RiCustomerService2Fill, RiNewspaperLine, RiQrScan2Line, RiRadarFill, RiShakeHandsFill } from 'react-icons/ri';
import { HiCurrencyDollar, HiMiniPencilSquare } from 'react-icons/hi2';
import { FaChartBar, FaGraduationCap, FaInfoCircle, FaProjectDiagram } from 'react-icons/fa';
import { LucideBadgeHelp, LucideBadgePercent, LucideNfc } from 'lucide-react';
import { TbReportAnalytics } from 'react-icons/tb';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { IoMdPricetags } from 'react-icons/io';
import { GrShieldSecurity } from 'react-icons/gr';

          

  const NavItem = [
    {
      name:"Products",
      items:[
        {
          title:"Public Server",
          subTitle:"Public to worldwide",
          url:`products/public-server`
        },
        {
          title:"Private Server",
          subTitle:"Accessible by only member",
          url:'products/private-server'
        },
        {
          title:"Canvas",
          subTitle:"Note with comments",
          url:'products/canvas'
        },
        {
          title:"Test",
          subTitle:"Skill & knowledge assessment",
          url:'products/test'
        },
        {
          title:"Forum",
          subTitle:"Start discussion",
          url:"products/forum"
        },
        {
          title:"Forms",
          subTitle:"Online forms and surveys",
          url:"products/form"
        },
        {
          title:"Files",
          subTitle:"Share and organize documents",
          url:"products/files"
        },
        {
          title:"Spreadsheet",
          subTitle:"Sheets for managing data",
          url:"products/spreadsheet"
        },
        {
          title:"Poll",
          subTitle:"Manage surveys",
          url:"products/polls"
        },
        {
          title:"Text Channel",
          subTitle:"Communicate with team members",
          url:"products/channel"
        },
        {
          title:"Reporting",
          subTitle:"Statistical view of usaged",
          url:"products/reporting"
        },
        {
          title:"Automation",
          subTitle:"Make workflow automation",
          url:"products/automation"
        },
        {
          title:"Docs",
          subTitle:"Manage & organize Documents",
          url:"products/docs"
        },
        
      

      ]
    },
    {
      name:"Features",
      items:[
        {
          title:"Channels",
          subTitle:"Communicate with team members",
          url:"features/channels"
        },
        {
          title:"Canvas",
          subTitle:"Note with comment",
          url:"features/canvas"
        },
        {
          title:"Messaging",
          subTitle:"Messaging app",
          url:"features/messaging"
        },
        // {
        //   title:"Search",
        //   subTitle:"Search all over server",
        //   url:"features/search"
        // },
        {
          title:"File Sharing",
          subTitle:"Share files",
          url:"features/file-sharing"
        },
        {
          title:"Security",
          subTitle:"Ensure security and privary",
          url:"features/security"
        },
        {
          title:"foxcolab Bot",
          subTitle:"Help to use server",
          url:"features/foxcolab-bot"
        },
        {
          title:"Assessment",
          subTitle:"Skill & knowledge assessment",
          url:"features/assessment"
        },
        {
          title:"Forms",
          subTitle:"Online forms and surveys",
          url:"features/forms"
        },
        {
          title:"Threads",
          subTitle:"Comment on a message",
          url:"features/threads"
        },
        {
          title:"Polls",
          subTitle:"Manage surveys",
          url:"features/polls"
        },
        {
          title:"Permission & Roles",
          subTitle:"Make restriction on resources",
          url:"features/permission-&-roles"
        },
        {
          title:"Voice Message",
          subTitle:"Communicate with voice message",
          url:"features/voice-message"
        },
        {
          title:"Video Message",
          subTitle:"Communicate with video message",
          url:"features/video-message"
        },
        {
          title:"Screen Sharing",
          subTitle:"Share screen with team member",
          url:"features/screen-sharing"
        },
        {
          title:"Personalisation",
          subTitle:"Customize the server",
          url:"features/personalisation"
        },
        
      ]
    },
    {
      name:"Solutions",
      items:[
        {
          icon: <MdEngineering/>,
          title:`Engineering`,
          url:"solutions/engineering"
        },
        {
          icon:<RiCpuLine/>,
          title:"IT",
          url:"solutions/IT"
        },
        {
          icon:<RiCustomerService2Fill/>,
          title:"Customer Service",
          url:"solutions/customer-service"
        },
        {
          icon:<HiCurrencyDollar/>,
          title:"Financial Service",
          url:"solutions/financial-service"
        },
        {
          icon:<RiQrScan2Line/>,
          title:"Retails",
          url:"solutions/retails"
        },
        {
          icon:<FaGraduationCap/>,
          title:"Educations",
          url:"solutions/educations"
        },
        {
          icon:<LucideBadgePercent/>,
          title:"Sales",
          url:"solutions/sales"
        },
        {
          icon:<FaProjectDiagram/>,
          title:"Project Management",
          url:"solutions/project-management"
        },
        {
          icon:<FaChartBar/>,
          title:"Marketing",
          url:"solutions/marketing"
        },
        {
          icon:<MdHealthAndSafety/>,
          title:"Health & Life Science",
          url:"solutions/health-&-life-science"
        },
        {
          icon:<RiRadarFill/>,
          title:"Technology",
          url:"solutions/technology"
        },
        {
          icon:<TbReportAnalytics/>,
          title:"Media",
          url:"solutions/media"
        }
      ]
    },
    {
      name:"Resources",
      items:[
        {
          icon:<LucideBadgeHelp/>,
          title:"Help Centre",
          url:"resources/help-centre"
        },
        {
          icon:<BsPatchQuestionFill/>,
          title:"What's new",
          url:"resources/what's-new"
        },
        {
          icon:<HiMiniPencilSquare/>,
          title:"Blog",
          url:"resources/blog"
        },
        {
          icon:<MdDeveloperBoard/>,
          title:"Developers",
          url:"resources/developers"
        },
        {
          icon:<RiShakeHandsFill/>,
          title:"Partners",
          url:"resources/partners"
        },
        {
          icon:<FaInfoCircle/>,
          title:"About Us",
          url:"resources/about-us"
        },
        {
          icon:<IoMdPricetags/>,
          title:"Pricing",
          url:"pricing"
        },
        {
          icon:<MdJoinFull/>,
          title:"Careers",
          url:"resources/careers"
        },
        {
          icon:<LucideNfc/>,
          title:"Contact Us",
          url:"resources/contact-us"
        },
        {
          icon:<RiNewspaperLine/>,
          title:"News",
          url:"resources/news"
        },
        {
          icon:<GrShieldSecurity/>,
          title:"Terms & Conditions",
          url:"resources/terms-&-conditions"
        },
        {
          icon:<MdOutlinePrivacyTip/>,
          title:"Privacy",
          url:"resources/privacy"
        },

        
      ]
    }
  ]
  

function Navigations() {
  return (
    <>
     <NavigationMenu className=''>
      <NavigationMenuList className=''>
        {
          NavItem.map((nav, i)=>(
            <>
            <NavigationMenuItem key={i} className='navmenu_container ' >
          <NavigationMenuTrigger className=' data-[state=open]:bg-[#f6f6f6] data-[state=open]:text-[#ff0000] focus:bg-[#f6f6f6] text-black'>{nav.name}</NavigationMenuTrigger>
          <NavigationMenuContent className=' '>
            <ul className={cn("grid  gap-3 p-4  ", nav.name==="Features" ? "w-[550px] md:w-[650px] md:grid-cols-3 lg:w-[750px]" : nav.name==="Resources" || nav.name==="Solutions" ? "w-[350px] md:w-[400px] md:grid-cols-2 lg:w-[450px]" :  "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]")}>
              {nav.items.map((item, j) => (
                <Link key={j} href={`/${item.url}`} className="hover:bg-[#f6f6f6] navmenu_items p-2 rounded">
                <div key={j}>
                  <div className='text-semibold text-[0.95rem] navtitle flex items-center gap-[0.3rem]'><span className='text-[1.2rem] '>{item.icon}</span> {item.title}</div>
                  {
                    item.subTitle && 
                  <div className='text-[0.85rem] text-[#7c8385] '>{item?.subTitle}</div>
                }
  

                </div>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
            </>
          ))
        }
        
        
       
        


      </NavigationMenuList>
    </NavigationMenu>
    
    </>
  )
}

export default Navigations


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground navigation_content_single",
            className
          )}
          {...props}
        >
          <div className=" font-medium leading-none">{title}</div>
          <p className="line-clamp-2  leading-snug text-[#717273]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
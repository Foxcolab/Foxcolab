import React from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { BsLaptop } from 'react-icons/bs'
import { ModeToggle } from '../../../mode-toggle/Toggle'
import { useTheme } from 'next-themes'
import { IoDiamond } from 'react-icons/io5'

interface Props {
    setOpen: any
  }
function Themes({setOpen}:Props) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  // const isSystem = theme === "system";
  // const isDark = isSystem && resolvedTheme==="dark";
  // const isLight = isSystem && resolvedTheme==="light";
  // console.log(isDark, isLight)
  
  return (
    <>
    
   <ItemHeader setOpen={setOpen} title='Themes' />
   <div className='theme_container'>
    <div className=' mt-4'>
    Choose if Foxcolab's appearance should be light or dark, or follow your computer’s settings.
    </div>
    <div className='flex items-center gap-4 mt-4'>
    <div className='theme_item'>
      <button onClick={()=>setTheme("light")} className={theme==="light" ? "active_theme":""}><MdLightMode/> Light</button>
    </div>
    <div className='theme_item'>
      <button onClick={()=>setTheme("dark")} className={theme==="dark" ? "active_theme":""}><MdDarkMode/> Dark</button>
    </div>
    <div>
    <div className='theme_item'>
      <button onClick={()=>setTheme("system")} className={theme==="system" ? "active_theme":""}><BsLaptop/> System</button>
    </div>
    </div>
    </div>
    <div>
      <div className='flex items-center gap-1 font-bold text-lg pt-4'><span><IoDiamond/></span> Premium Themes</div>
      <div className='flex items-center gap-4 mt-4'>
    <div className='theme_color_item'>
      <button > <div className='theme_color'> </div> Light</button>
    </div>
    <div className='theme_color_item'>
      <button ><div className='theme_color'></div> Dark</button>
    </div>
    <div>
    <div className='theme_color_item'>
      <button ><div className='theme_color'></div> System</button>
    </div>
    </div>
    </div>




    </div>
   </div>
    
    </>
  )
}

export default Themes
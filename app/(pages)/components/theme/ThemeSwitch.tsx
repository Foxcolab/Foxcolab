'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const {setTheme, resolvedTheme} = useTheme()
    
    useEffect(()=>{setMounted(true)}, []);

    if(!mounted) {
        return <h1>Loading..</h1>
    }
    if(resolvedTheme==="dark"){
        return <button onClick={()=>setTheme("light")}>Light</button>
    }
    if(resolvedTheme==="white"){
        return <button onClick={()=>setTheme("dark")}>Dark</button>
    }
  
}

export default ThemeSwitch
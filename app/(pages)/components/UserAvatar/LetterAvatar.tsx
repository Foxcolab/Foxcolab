import React from 'react'
import LetteredAvatar from "react-lettered-avatar"
function LetterAvatar({name, size, radius}:{name:string, size:number,radius: number}) {

    const arrayWithColors = [
        '#2ecc71',
        '#3498db',
        '#8e44ad',
        '#e67e22',
        '#e74c3c',
        '#1abc9c',
        '#2c3e50'
    ];
  return (
    <>
    <LetteredAvatar 
            name={name===(undefined || null) ? 'Y': name}
           size={size}
           radius={radius}
            backgroundColors={arrayWithColors}
            textSizeRatio={3}
            />
    
    
    </>
  )
}

export default LetterAvatar
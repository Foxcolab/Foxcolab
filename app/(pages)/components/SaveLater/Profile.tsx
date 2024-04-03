"use client";
import React from 'react'
import { UserAvatar } from '../UserAvatar/UserAvatar';
import LetteredAvatar from "react-lettered-avatar";

function Profile({name, url}) {
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
    {
            url===null ? 
            <LetteredAvatar 
            name={name===undefined ? 'Y':"B"}
           size={30}
            backgroundColors={arrayWithColors}
            /> : 
          <UserAvatar src={url} />

          }

          
    
    </>
  )
}

export default Profile
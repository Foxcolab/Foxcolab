import React from 'react'
import { PiUsersThreeFill } from 'react-icons/pi'

interface Props {
    serverName:string
    memberName:string
}
function InviteUpper({serverName, memberName}:Props) {
  return (
    <>
    <div className="invite_bg">
    <div className='invite_upper'>
          <div className="test_hdng">
              Foxcolab
          </div>
          <div className="fox_hh1">
            <h1>See what <span className='invite_title'>{serverName}</span> is up to </h1>
            <p>Foxcolab is a messaging app that brings your whole team together.</p>
          </div>
            <div className='mem_ico'>
              <div className='member_icons'> <PiUsersThreeFill/> </div>
              <div> <b>{memberName}</b> & many more </div>
              </div>
        </div>
        </div>
    </>
  )
}

export default InviteUpper
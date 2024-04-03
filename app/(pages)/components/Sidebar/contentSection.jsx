import React from 'react'

function contentSection({title, server}) {
    const onClick = () => {
        router.push(`/servers/${params?.serverId}/${title}`);
      }
  return (
    <>
    <button onClick={onClick}>{title}</button>
    
    
    </>
  )
}

export default contentSection
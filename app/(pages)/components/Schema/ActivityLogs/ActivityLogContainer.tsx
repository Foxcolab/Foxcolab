import { SchemaActivity } from '@prisma/client';
import React from 'react'
import SingleActivity from './SingleActivity';

interface Props {
    schemaType:"Channel" | "Forum Channel" | "Canvas" | "Test Channel";
    activityLogs:SchemaActivity[]

}
function ActivityLogContainer({schemaType, activityLogs}:Props) {
  return (
    <>
    
    {
        activityLogs && activityLogs.map((activityLog)=>(
            <SingleActivity activityLog={activityLog} key={activityLog.id} />
        ))
    }
    
    
    </>
  )
}

export default ActivityLogContainer
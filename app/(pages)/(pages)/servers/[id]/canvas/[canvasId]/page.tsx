import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'
import {SiSimplenote} from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import Link from 'next/link';
import CreateCanvas from '@/app/(pages)/components/Create/CreateCanvas';
import CreateNote from '@/app/(pages)/components/canvas/CreateNote';
import SingleCanvas from '@/app/(pages)/components/canvas/SingleCanvas';
import { getServer } from '@/lib/db/ServerLib';
import SchemaHeader from '@/app/(pages)/components/Schema/Header/SchemaHeader';
import { format } from 'date-fns';
import CanvasContainer from '@/app/(pages)/components/canvas/container/CanvasContainer';
import CanvasSearch from '@/app/(pages)/components/canvas/search/CanvasSearch';
interface Props {
  params:{
    id:string,
  canvasId:string
  }
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

async function CanvasPage({params}:Props) {

  const profile = await myProfile();
  const count = 1;
  
  if(!profile) redirect('/home');
  const server = await getServer(params.id, profile.id);

  if(!server) redirect('/home');

  const member = await db.member.findFirst({
    where:{
      userId:profile.id,
      serverId:server.id
    }
  });
  
  if(!member) redirect(`/servers/${params.id}`);

  const canvas = await db.canvas.findFirst({
    where:{
      id:params.canvasId as string,
      serverId:server.id
    },
    include:{
      createdUser:true,
      notes:{
        orderBy:{
          createdAt:"desc"
        },
        include:{
          createdUser:{
            include:{
              user:true
            }
          },
          comments:{
            include:{
              createdMember:{
                include:{
                  user:true
                }
              }
            }
          }
        
        }
      },
      Members:{
        include:{
          user:true
        }
      },
      manager:{
        include:{
          member:{
            include:{
              user:true
            }
          }
        }
      }
    }
  });
  if(!canvas) redirect(`/servers/${params.id}`);
  const members = canvas?.Members;
  const managers = canvas?.manager;

  let isAdmin = false;
  for(let i=0; i<canvas?.manager?.memberIds?.length; i++){
    if(canvas.manager?.memberIds[i]===member.id){
      isAdmin=true;
      break;
    }
  }
  const createdAt = format(new Date(canvas.createdAt), DATE_FORMAT);
  let sendMsg = canvas.isEveryonePost !==undefined && canvas.isEveryonePost!==null ? canvas.isEveryonePost : true;


  return (
    <>
    
    
    <MainSidebar server={server}>
      <SchemaHeader
      name={canvas?.title as string}
      description={canvas?.description as string}
      members={members}
      managers={canvas.manager}
      serverMembers={server.Members}
      createdAt={createdAt}
      createdBy={canvas?.createdUser?.name as string}
      schemaType="Canvas"
      isAdmin={isAdmin}
      type={canvas.type}
      sendMsg={sendMsg}

      />
    

    <div className="canvas_container">
      <CanvasSearch sectionId={canvas.sectionId} />
    <div className='cnvs_sc'>
        <div><b>All Canvases</b></div>
       </div>
    
    <CanvasContainer notes={canvas.notes} />

    </div>




    </MainSidebar>
    
    </>
  )
}

export default CanvasPage
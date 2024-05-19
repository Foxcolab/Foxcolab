import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import React from 'react'
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import { MdMessage } from 'react-icons/md';
import { myProfile } from '@/lib/db/profile';
import { redirect } from 'next/navigation';
import { getServer } from '@/lib/db/ServerLib';
import { db } from '@/prisma';
import ThreadContainer from '@/app/(pages)/components/threads/Sidebar/ThreadContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { BsFillThreadsFill } from 'react-icons/bs';

interface ThreadProp {
  params:{
    id:string
  }
}
async function ThreadPage({params}:ThreadProp) {
  const profile = await myProfile();
  if(!profile) redirect('/home');

  const server = await getServer(params?.id, profile.id);
  if(!server) redirect('/home');



  const ThreadMessages = await db.message.findMany({
    where:{
      serverId:server.id as string,
      OR:[{
        member:{
          userId:profile.id
        },
        threads:{
          some:{
            member:{
              userId:profile.id
            }
          }
        }
      }]
    },
    include:{
      member:{
        include:{
          user:true
        }
      },
      threads:{
        include:{
          message:{
            include:{
              member:{
                include:{
                  user:true
                }
              },
              uploadedFiles:true
            }
          },
          member:{
            include:{
              user:true
            }
          },
          uploadedFiles:true
        }
      },
      poll:{
        include:{
          createdMember:{
            include:{
              user:true
            }
          },

        }
      },
      form:{
        include:{
          createdMember:{
            include:{
              user:true
            }
          }
        }
      },
      channel:true,
      uploadedFiles:true,

    }
  })

  // console.log("Threads", ThreadMessages[0].threads)
  return (
    <>
    
    {/* <MainSidebar server={server}>
    <div className="forum_msg_container">
        
        <SectionHeader icon={<MdMessage/>} name={"Threads"} />
        <ThreadContainer  ThreadMessages={ThreadMessages} />
      </div>
    </MainSidebar> */}

    <ServerHome server={server} user={profile}>
    <div className="forum_msg_container">
        
        <SectionHeader icon={<BsFillThreadsFill/>} name={"Threads"} />
        <div className="forum_messages">
        <ThreadContainer  ThreadMessages={ThreadMessages} />
        {
          ThreadMessages.length===0 && 
        <h1 className='nopinn'>You have not participate any thread.</h1>

        }
        </div>
      </div>
    </ServerHome>
    
    
    </>
  )
}

export default ThreadPage
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import React from 'react'
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import { MdMessage } from 'react-icons/md';
import { myProfile } from '@/lib/db/profile';
import { redirect } from 'next/navigation';
import { getServer } from '@/lib/db/ServerLib';
import { db } from '@/prisma';
import ThreadContainer from '@/app/(pages)/components/threads/Sidebar/ThreadContainer';

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

  // const myThreads = await db.threads.findMany({
  //   where:{
  //     serverId:server.id,
  //     OR:[
  //       {
  //         member:{
  //           userId:profile.id
  //         }
  //       },
  //       {
  //         message:{
  //           member:{
  //             userId:profile.id
  //           }
  //         }
  //       }
  //     ]
  //   },
  //   include:{
  //     message:{
  //       include:{
  //         member:{
  //           include:{
  //             user:true
  //           }
  //         }
  //       }
  //     },
  //     channel:true

  //   }
  // })

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
              }
            }
          },
          member:{
            include:{
              user:true
            }
          }
        }
      }
    }
  })

  console.log("Threads", ThreadMessages[0].threads)
  return (
    <>
    
    <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<MdMessage/>} name={"Threads"} />
        {/* <DraftContainer drafts={myDrafts} sents={messages} /> */}
        <ThreadContainer  ThreadMessages={ThreadMessages} />
      </div>
    </MainSidebar>
    
    
    </>
  )
}

export default ThreadPage
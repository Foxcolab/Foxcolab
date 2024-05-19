import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import PollContainer from '@/app/(pages)/components/polls/sidebar/PollContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaPollH } from 'react-icons/fa';

interface Props {
  params:{
    id:string
  }
}
async function Polls({params}:Props) {
  const profile = await myProfile();
    const count = 1;
    
    if(!profile) redirect('/home');
    const server = await getServer(params?.id, profile.id);
    if(!server) redirect('/home');

    // const myVotes = await db.poll.findMany({
    //   where:{
    //     serverId:server.id as string,
    //     createdMember:{
    //       userId:profile.id
    //     }
    //   }
    // });

    const myVotes = await db.message.findMany({
      where:{
        serverId:server.id,
        channel:{
          memberIds:{
            hasSome:[server.currentMember.id]
          }
        },
        pollId:{
          not:null
        },
        poll:{
          createdBy:server.currentMember.id
        }
      },
      include:{
        member:{
          include:{
            user:true
          }
        },
        poll:true,
        pollVotes:{
          include:{
            createdMember:{
              include:{
                user:true
              }
            }
          }
        }
      }
    })

    const Voted = await db.message.findMany({
      where:{
        serverId:server.id,
        pollId:{
          not:null
        },
        pollVotes:{
          some:{
            createdBy:server.currentMember.id
          }
        }

      },
      include:{
        member:{
          include:{
            user:true
          }
        },
        poll:true,
        pollVotes:{
          include:{
            createdMember:{
              include:{
                user:true
              }
            }
          }
        }
      }
    });
    const pendingMessage = await db.message.findMany({
      where:{
        serverId:server.id,
        channel:{
          memberIds:{
            hasSome:[server.currentMember.id]
          }
        },
        pollId:{
          not:null
        },
        poll:{
          createdMember:{
            NOT: {
              userId:profile.id
            }
          }
        },
        pollVotes:{
          none:{
            createdMember:{
              userId:profile.id
            }
          }
        }
      },

      include:{
        member:{
          include:{
            user:true
          }
        },
        poll:true,
        pollVotes:{
          include:{
            createdMember:{
              include:{
                user:true
              }
            }
          }
        }
      }
    });


    console.log(Voted.length)

  return (
    <>
    
    
    <ServerHome server={server} user={profile}>
    <div className="forum_msg_container">
        
    <SectionHeader icon={<FaPollH/>} name={"Polls"} />
    <div className="forum_messages">
    <PollContainer pendingPoll={pendingMessage} Voted={Voted} myVotes={myVotes}  currentMember={server.currentMember} />

    </div>
       </div>
    </ServerHome>
    
    </>
  )
}

export default Polls
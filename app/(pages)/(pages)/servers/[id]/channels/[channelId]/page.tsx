
import ChatComponents from '@/app/(pages)/components/Chat/ChatComponents'
import React from 'react'
import { db } from '@/prisma';
import {  myProfile } from '@/lib/db/profile';
import EditorFooter from '@/app/(pages)/components/Editor/EditorFooter';
import { redirect } from 'next/navigation';
import ChatMessages from '@/app/(pages)/components/Chat/ChatMessages';
import ChannelHeader from '@/app/(pages)/components/Channel/ChannelHeader';
import { format } from 'date-fns';
import { getServer } from '@/lib/db/ServerLib';
import ChannelContainer from '@/app/(pages)/components/Channel/component/ChannelContainer';


interface Props {
  params:{
    id:string,
    channelId:string
  }
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChannelChat =async({params}:Props)=> {

  const profile = await myProfile();
  if(!profile) redirect('/home')
  const server = await getServer(params.id, profile.id);
  if(!server) redirect('/home')

  
  let channel = await db.channel.findUnique({
    where: {
      id: params?.channelId ,
      // OR:[
      //   {
      //     type:"public"
      //   },
      //   {
      //     Members:{
      //       some:{
      //         userId:profile.id
      //       }
      //     }
      //   }
      // ]
    },
    include:{
      createdMember:{
        include:{
          user:true
        }
      },
      schemaActivity:{
        where:{
          channelId:params.channelId
        },
        include:{
          member:{
            include:{
              user:true
            }
          },
          member2:{
            include:{
              user:true
            }
          }
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      messages: {
        where:{
          fileUrl:{
            isEmpty:false
          }
        },
        take:5,
        orderBy: {
          createdAt: "desc",
        },
        include:{
          uploadedFiles:true
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
      },
      pinnedPost: {
        orderBy:{
          createdAt:"desc"
        },
        include:{
          createdUser:{
            include:{
              user:true
            }
          },
          message:{
            include:{
              member:{
                include:{
                  user:true,

                }
              },
              uploadedFiles:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  }
                }
              },
              poll:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  },
                  votes:true
                
                }
              },
              form:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  },
                  formFields:true,
                  formResponses:{
                    include:{
                      formFieldResponses:true
                    }
                  }
                },
                
              }
            }
          }

          
        },
        
      }
    }
  });


  if(!channel) redirect(`/servers/${params.id}`);
  const member = await db.member.findFirst({
    where: {
      serverId: params.id,
      userId: profile?.id,
      // channels: {
      //   some:{
      //     id:params.channelId
      //   }
      // }

      // channelIds:{
      //   has:params.channelId
      // }
    },
    include:{
      user:true,
      saveLater:true,
      Drafts:{
        where:{
          channelId:channel?.id,
          createdMember:{
            userId:profile.id
          },
          // ScheduledDate:null
          // OR:[
          //   {
          //     ScheduledDate:{
          //       equals:null
          //     }
          //   }
          // ]
          // OR:[
          //   {
          //     ScheduledDate:null
          //   },
          //   {
          //     ScheduledDate:{ 
          //       equals:undefined
          //     }
          //   }
          // ]
        }
      }
    }
  });

  if (!member) {
    redirect(`/servers/${params.id}`);
  }

  const myChannels = await db.channel.findMany({
    where:{
      memberIds:{
        hasSome:[member.id]
      }
    }
  })
  
  
  const memberId = channel.memberIds.some((id)=>id===member.id);
  if(!memberId){
    if(channel.type==="private"){
      redirect(`/servers/${server.id}`);
    }else {
      await db.section.update({
        where:{
          id:channel.sectionId as string
        },
        data:{
          channels:{
            update:{
              where:{
                id:channel.id
              },
              data:{
                Members:{
                  connect:{
                    id:member.id
                  }
                }
              }
            }
          }
        }
      })
    }
  }

  const isAdmin = member.id===channel.createdBy;
  // channel.currentMember = member;


  return (
    <>



    <ChannelContainer server={server} channel={channel} currentMember={member} isAdmin={isAdmin} myChannels={myChannels} user={profile} />





    </>
  )
}

export default ChannelChat
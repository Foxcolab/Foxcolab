import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import FormContainer from '@/app/(pages)/components/forms/Sidebar/FormContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaWpforms } from 'react-icons/fa';
import { SiFiles } from 'react-icons/si';

interface Props {
  params:{
    id:string
  }
}
async function Forms({params}:Props) {
  const profile = await myProfile();
    const count = 1;
    
    if(!profile) redirect('/home');
    const server = await getServer(params?.id, profile.id);


    if(!server) redirect('/home');

    const myForms = await db.message.findMany({
      where:{
        serverId:server.id,
        channel:{
          memberIds:{
            hasSome:[server.currentMember.id]
          }
        },
        formId:{
          not:null
        },
        form:{
          createdBy:server.currentMember.id
        }
      },
      include:{
        member:{
          include:{
            user:true
          }
        },
        form:{
          include:{
            formFields:true,
            formResponses:{
              include:{
                createdMember:{
                  include:{
                    user:true
                  }
                },
                formFieldResponses:{
                  include:{
                    createdMember:{
                      include:{
                        user:true
                      }
                    }
                  }
                }
              },
              
            }
          }
        },
        
      }
    });

    const submittedForm = await db.message.findMany({
      where:{
        serverId:server.id,
        channel:{
          memberIds:{
            hasSome:[server.currentMember.id]
          }
        },
        formId:{
          not:null
        },
        form:{
          formResponses:{
            some:{
              createdBy:server.currentMember.id
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
        form:{
          include:{
            formFields:true,
            formResponses:{
              include:{
                formFieldResponses:true
                
              },
            },
          }
        },
        
      }
    }); 

    const pendingForms = await db.message.findMany({
      where:{
        serverId:server.id,
        channel:{
          memberIds:{
            hasSome:[server.currentMember.id]
          }
        },
        formId:{
          not:null
        },
        form:{
          createdMember:{
            NOT:{
              id:server.currentMember.id
            }
          },
          formResponses:{
            none:{
              createdBy:server.currentMember.id
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
        form:{
          include:{
            formFields:true,
            formResponses:{
              include:{
                createdMember:{
                  include:{
                    user:true
                  }
                },
              }
            }
          }
        },
        
      }
    }); 


  return (
    <>
    
 
    {/* <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<FaWpforms/>} name={"Forms"} />

        <FormContainer myForms={myForms} submittedForms={submittedForm} pendingForms={pendingForms} currentMember={server.currentMember} />
      
      </div>

    </MainSidebar> */}

    <ServerHome server={server} user={profile}>
      <div className="forum_msg_container">
        
        <SectionHeader icon={<FaWpforms/>} name={"Forms"} />
        <div className="forum_messages">
        <FormContainer myForms={myForms} submittedForms={submittedForm} pendingForms={pendingForms} currentMember={server.currentMember} />
      </div>
      </div>
    </ServerHome>


    </>
  )
}

export default Forms
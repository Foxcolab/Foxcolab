
import SpreadSheetContainer from '@/app/(pages)/components/Spreadsheet/Container/SpreadSheetContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params:{
    id:string
    spreadsheetId:string
  }
}
async function page({params}:Props) {

  const profile = await myProfile();
  if(!profile) redirect('/home')

  const server = await getServer(params.id, profile.id);
  if(!server) redirect('/home');
  const member = await db.member.findFirst({
    where:{
      userId:profile.id,
      serverId:server.id
    },
    include:{
      user:true
    }
  });
  if(!member) redirect('/home');
  

  const spreadSheet = await db.spreadsheets.findFirst({
    where:{
      id:params.spreadsheetId,
      serverId:server.id
    },
    include:{
      schemaActivity:{
        where:{
          spreadsheetId:params.spreadsheetId
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
      tables:{
        include:{
          tableRows:{
            include:{
              columns:true,
              rowData:{
                include:{
                  assignedMember:{
                    include:{
                      user:true
                    }
                  },
                  files:true,
                  column:true
                }
              },
              RowComments:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  },
                  files:true
                }
              }
            }
          },
          tableColumns:true,
          createdUser:{
            include:{
              user:true
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
      },
      createdMember:{
        include:{
          user:true
        }
      }

    }
  });
  if(!spreadSheet) redirect(`/servers/${server.id}`);

  const isMember = spreadSheet?.memberIds.includes(member.id);
  if(!isMember){
    if(spreadSheet?.type==="private"){
      redirect(`/servers/${server.id}`);
    }
    else {
      await db.section.update({
        where:{
          id:spreadSheet.sectionId as string
        },
        data:{
          spreadsheets:{
            update:{
              where:{
                id:params?.spreadsheetId
              },
              data:{
                Members:{
                  connect:{
                    id:member.id
                  }
                },
                memberIds: {
                  push:member.id
                }
              }
            }
          }
        }
      })
    }
  }



   


  return (
    <>
    
    <ServerHome server={server} user={profile}>
      <SpreadSheetContainer
       tables={spreadSheet.tables} 
       name={spreadSheet.name}
       members={spreadSheet.Members}
       member={member}
       description={spreadSheet.description as string}
       createdBy={spreadSheet.createdMember?.user?.name as string}
       managers={spreadSheet.manager}
       serverMember={server.Members}
       sectionId={spreadSheet.sectionId}
       activeTable={spreadSheet?.tables[0]}
       />
    </ServerHome>
    
    
    </>
  )
}

export default page
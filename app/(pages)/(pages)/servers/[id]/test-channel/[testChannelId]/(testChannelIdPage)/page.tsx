
import TestChannelComponent from '@/app/(pages)/components/Tests/TestChannel/TestChannelComponent';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { Result, Test } from '@prisma/client';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import React from 'react'

interface ForumsProps {
  params:{
    id:string,
    testChannelId:string
  }
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

async function TestChannel({params}:ForumsProps) {
  const profile = await myProfile();
  if(!profile) redirect('/home')


  const server = await getServer(params.id, profile.id);


  if(!server) redirect('/home')


  const member = await db.member.findFirst({
    where: {
      serverId: params.id,
      userId: profile?.id,
    },
    include:{
      user:true
    }
  });

  if ( !member) {
    redirect("/");
  }
  const testChannel = await db.testChannel.findFirst({
    where:{
      id:params.testChannelId,
      // serverId:params.id
    },
    include:{
      schemaActivity:{
        where:{
          testChannelId:params.testChannelId
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
      Tests:{
        include:{
          createdUser:{
            include:{
              user:true
            },
            
          },
          questions:true
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      Results:{
        where:{
          memberId:member.id
        },
        orderBy:{
          submitTime:"desc"
        }
      },
      createdMember:{
        include:{
          user:true
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
 
  if(!testChannel) redirect(`/severs/${params.id}`);


  const memberId = testChannel.memberIds.some((id)=>id===member.id);
  if(!memberId){
    if(testChannel.type==="private"){
      redirect(`/servers/${server.id}`);
    }else {
      await db.section.update({
        where:{
          id:testChannel.sectionId as string
        },
        data:{
          TestChannels:{
            update:{
              where:{
                id:testChannel.id
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







  const members = testChannel?.Members;
  const managers = testChannel?.manager;

  let isAdmin = testChannel.createdBy===member.id;
  const createdAt = format(new Date(testChannel.createdAt), DATE_FORMAT);
  let sendMsg = testChannel.isEveryoneCreate !==undefined && testChannel.isEveryoneCreate!==null ? testChannel.isEveryoneCreate : true;
  const tests = testChannel.Tests;
  const allResults = testChannel.Results;
  let myResults = []
  for(let i=0; i<allResults?.length; i++){
    if(allResults[i].memberId===member.id){
      myResults.push(allResults[i])
    }
  }
  function getAttemptedTests(results:Result[], tests:Test[]) {
    const attemptedTestIds = results.map(result => result.testId);
    const attemptedTests = tests.filter(test => attemptedTestIds.includes(test.id));
    return attemptedTests;
}

const attemptedTests = getAttemptedTests(myResults, tests);


  return (
    <>
    



      {/* <TestChannelContainer tests={testChannel.Tests} sectionId={testChannel.sectionId} /> */}


    <ServerHome server={server}>

   

      <TestChannelComponent 
      tests={testChannel.Tests} 
      sectionId={testChannel.sectionId}
      server={server}
      testChannelName={testChannel.name}
      members={members}
      serverMembers={testChannel.Members}
      sendMsg={sendMsg}
      managers={managers}
      createdAt={createdAt}
      createdBy={testChannel.createdMember?.user?.name as string}
      type={testChannel.type}
      isAdmin={isAdmin}
      description={testChannel.description as string}
      results={testChannel.Results}
      testLength={testChannel.Tests.length}
      attemptedTests={attemptedTests}
      schema={testChannel}
      member={member}
    
      />

</ServerHome>
    
    
    </>
  )
}

export default TestChannel;
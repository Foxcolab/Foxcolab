import { db } from "@/prisma";


export const getServer =async(serverId:string, userId:string)=>{
    try {

        let server = await db.server.findUnique({
          
            where:{
              id:serverId,
              Members:{
                some:{
                  userId:userId
                }
              },
              
            },
            include: {
              sections:{
                  include:{
                      channels:{
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      canvas:{
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      forumsChannel:{
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      TestChannels:{
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
        
                  }
              },
              Members: {
                include: {
                  user: true,
                },
                orderBy: {
                  role: "asc",
                }
              },
              channels:{
                where:{
                  type:"public"
                }
              },
              TestChannels:{
                where:{
                  type:"public"
                }
              },
              forumsChannel:{
                where:{
                  type:"public"
                }
              },
              canvases:{
                where:{
                  type:"public"
                }
              },
              groups:true,
              activityLogs:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  }
                }
              }
              // {
              //   include:{
              //     members:{
              //       include:{
              //         user:true
              //       }
              //     }
              //   }
              // }
            },
            // member:{}
            
        
          });
        
      
        const currentMember = await db.member.findFirst({
          where:{
            userId:userId,
            serverId:server?.id
          },
          include:{
            user:true
          }
        });
        if(!currentMember){
          return null;
        }
        server.currentMember = currentMember;
        // console.log(server.currentMember)
        return server;


    } catch (error) {
        
    }
}
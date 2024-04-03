import { db } from "@/prisma";


export const getServer =async(serverId:string, userId:string)=>{
    try {

        const server = await db.server.findUnique({
            where:{
              id:serverId,
              Members:{
                some:{
                  userId:userId
                }
              }
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
              groups:true
              // {
              //   include:{
              //     members:{
              //       include:{
              //         user:true
              //       }
              //     }
              //   }
              // }
            }
        
          });
        
      
        
        return server;


    } catch (error) {
        
    }
}
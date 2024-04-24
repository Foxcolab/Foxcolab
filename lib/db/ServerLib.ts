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
              displayPicture:true,
              coverPic:true,
              sections:{
                  include:{
                      channels:{
                        where:{
                          OR:[
                            {
                              type:"public"
                            },
                            {
                              Members:{
                                some:{
                                  userId:userId
                                }
                              }
                            }
                          ]

                        },
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      canvas:{
                        where:{
                          OR:[
                            {
                              type:"public"
                            },
                            {
                              Members:{
                                some:{
                                  userId:userId
                                }
                              }
                            }
                          ]
                        },
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      forumsChannel:{
                        where:{
                          OR:[
                            {
                              type:"public"
                            },
                            {
                              Members:{
                                some:{
                                  userId:userId
                                }
                              }
                            }
                          ]
                        },
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
                      TestChannels:{
                        where:{
                          OR:[
                            {
                              type:"public"
                            },
                            {
                              Members:{
                                some:{
                                  userId:userId
                                }
                              }
                            }
                          ]
                        },
                          orderBy:{
                              createdAt:"desc"
                          }
                      },
        
                  }
              },
              Members: {
                where:{
                  role:{not:"bot"}
                },
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
              },
              botResponses:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  }
                },
                orderBy:{
                  updatedAt:"desc"
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
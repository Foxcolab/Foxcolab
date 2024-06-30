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
              shortInvite:true,
              displayPicture:true,
              coverPic:true,
              guides:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  }
                }
              },
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
                      spreadsheets:{
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
                  },
                  uploadedFiles:true
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


export const getServerWithOutMember =async(serverId:string)=>{
  try {

      let server = await db.server.findUnique({
        
          where:{
            id:serverId,
            
            
          },
          include: {
            shortInvite:true,
            displayPicture:true,
            coverPic:true,
            guides:{
              include:{
                createdMember:{
                  include:{
                    user:true
                  }
                }
              }
            },
            sections:{
                include:{
                    channels:{
                      where:{
                        type:"public"

                      },
                        orderBy:{
                            createdAt:"desc"
                        }
                    },
                    canvas:{
                      where:{
                        type:"public"

                      },
                        orderBy:{
                            createdAt:"desc"
                        }
                    },
                    forumsChannel:{
                      where:{
                        type:"public"

                      },
                        orderBy:{
                            createdAt:"desc"
                        }
                    },
                    TestChannels:{
                      where:{
                        type:"public"

                      },
                        orderBy:{
                            createdAt:"desc"
                        }
                    },
                    spreadsheets:{
                      where:{
                        type:"public"

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
                },
                uploadedFiles:true
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
      
    
     


      return server;


  } catch (error) {
      
  }
}
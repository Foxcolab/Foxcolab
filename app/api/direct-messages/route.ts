import { NextRequest, NextResponse } from "next/server";
import { DirectMessage } from "@prisma/client";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";

const MESSAGES_BATCH = 10;


export const GET =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
    const profile = await db.user.findUnique({where:{
        id:userId
    }})
    const { searchParams } = new URL(req.nextUrl);
    
        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId");
        // const serverId = searchParams.get("serverId");
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
      
        if (!conversationId) {
          return new NextResponse("Conversation ID missing", { status: 400 });
        }
        // if (!serverId) {
        //   return new NextResponse("Server ID missing", { status: 400 });
        // }
        let messages: DirectMessage[] = [];
    
        if (cursor) {
          messages = await db.directMessage.findMany({
            take: MESSAGES_BATCH,
            skip: 1,
            cursor: {
              id: cursor,
            },
            where: {
              conversationId,
              // serverId
            },
            include: {
              uploadedFiles:true,
              poll:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  },
                  votes:{
                    include:{
                      createdMember:{
                        include:{
                          user:true
                        }
                      }
                    }
                  }
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
                  formResponses: {
                    include:{
                      formFieldResponses: {
                        include:{
                          files:true
                        }
                      },
                      createdMember:{
                        include:{
                          user:true
                        }
                      }
                    }
                  }
                },
                
              },
            
              member: {
                include: {
                  user: true,
                }
              },
              threads:{
                include:{
                  member:{
                    include:{
                      user:true
                    }
                  }
                }
              },
              Reactions:true,
              forwardedMessage:{
                include:{
                  member:{
                    include:{
                      user:true
                    }
                  },
                  channel:true
                },
                
              }
            },
            orderBy: {
              createdAt: "desc",
            }
          })
        } else {
          messages = await db.directMessage.findMany({
            take: MESSAGES_BATCH,
            where: {
              conversationId,
              // serverId
            },
            include: {
              uploadedFiles:true,
              poll:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  },
                  votes:{
                    include:{
                      createdMember:{
                        include:{
                          user:true
                        }
                      }
                    }
                  }
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
                  formResponses: {
                    include:{
                      formFieldResponses: {
                        include:{
                          files:true
                        }
                      },
                      createdMember:{
                        include:{
                          user:true
                        }
                      }
                    }
                  }
                },
                
              },
              
              
              
              member: {
                include: {
                  user: true,
                }
              },
              threads:{
                include:{
                  member:{
                    include:{
                      user:true
                    }
                  }
                }
              },
              Reactions:true,
              forwardedMessage:{
                include:{
                  member:{
                    include:{
                      user:true
                    }
                  },
                  channel:true
                },
                
              }
            },
            orderBy: {
              createdAt: "desc",
            }
          });
        }
    
        let nextCursor = null;
    
        if (messages.length === MESSAGES_BATCH) {
          nextCursor = messages[MESSAGES_BATCH - 1].id;
        }
    
        return NextResponse.json({
          items: messages,
          nextCursor
        });
      } catch (error) {
        console.log("[DIRECT_MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
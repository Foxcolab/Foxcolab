import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const MESSAGES_BATCH = 10;

export async function GET(
  req: NextRequest
) {
  try {
    const userId = await GetDataFromToken(req);
    const profile = await db.user.findUnique({where:{
        id:userId
    }})
    const { searchParams } = new URL(req.nextUrl);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
          // createdAt:{
          //   lte:new Date()
          // }
        },
        include: {
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
              },
              uploadedFiles:true
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
              channel:true,
              uploadedFiles:{
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
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId,
          // createdAt:{
          //   lte:new Date()
          // }
        },
        include: {
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
              // formResponses:{
              //   include:{
              //     createdMember:{
              //       include:{
              //         user:true
              //       }
              //     },
              //     formFieldResponses:{
              //       include:{
              //         createdMember:{
              //           include:{
              //             user:true
              //           }
              //         }
              //       }
              //     }
              //   }
              // },
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
              },
              uploadedFiles:true
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
              channel:true,
              uploadedFiles:{
                include:{
                  createdMember:{
                    include:{
                      user:true
                    }
                  }
                }
              }

            }
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
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
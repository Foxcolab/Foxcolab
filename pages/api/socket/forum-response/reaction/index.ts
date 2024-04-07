

import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";





export const PUT =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const { forumResponseId, serverId, forumId } = req.query;
        const { content } = req.body;
        // console.log(messageId, serverId, channelId, content);
        if (!userId) {
            // return res.status(401).json({ error: "Unauthorized" });
            return res.status(401).json({error:"Unauthorized"});
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      
          if (!forumResponseId) {
            return res.status(400).json({ error: "Forum Response ID missing" });
          }
          if (!forumId) {
            return res.status(400).json({ error: "Forum ID missing" });
          }

          const server = await db.server.findFirst({
            where: {
              id: serverId as string,
              Members: {
                some: {
                  userId: userId as string,
                }
              }
            },
            include: {
              Members: true,
            }
          })
      
          if (!server) {
            return res.status(404).json({ error: "Server not found" });
          }

          const forums = await db.forums.findFirst({
            where: {
              id: forumId as string,
              serverId: serverId as string,
            },
            // include:{
            //     manager:{
            //         include:{
            //             member:true
            //         }
            //     }
            // }
          });
        
          if (!forums) {
            return res.status(404).json({ error: "Forum not found" });
          }
          const member = server.Members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let ForumResponse = await db.forumResponse.findFirst({
      where: {
        id: forumResponseId as string,
        forumsId: forumId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          }
        },
        forums:true,
        Reactions:true
      }
    })
    if (!ForumResponse) {
        return res.status(404).json({ error: "Message not found" });
      } 
    const reactions = await db.reaction.findMany({
        where:{
            forumResponseId:forumResponseId as string,
            createdBy:member.id
        }
    });

    let message;

    if(reactions.length===0){
        message = await db.forumResponse.update({
            where:{
                id:forumResponseId as string,
                serverId:serverId as string
            },
            data:{
                Reactions:{
                    create:{
                        content,
                        createdBy:member.id as string,
                        serverId:serverId as string
                    }
                }
            },
            include: {
              member: {
                include: {
                  user: true,
                }
              },
              Reactions:true

            //   forwardedMessage:{
            //     include:{
            //       member:{
            //         include:{
            //           user:true
            //         }
            //       },
            //       channel:true
            //     },
                
            //   }
            }

    
           })
    }else {
        let isPresent=false;
        for(let i=0; i<reactions.length; i++){
            if(reactions[i].content===content){
                isPresent=true;
                message = await db.forumResponse.update({
                    where:{
                        id:forumResponseId as string,
                        serverId:serverId as string
                    },
                    data:{
                        Reactions:{
                            delete:{
                                id:reactions[i].id,
                                createdBy:member.id
                            }
                        }
                    },
                    include: {
                      member: {
                        include: {
                          user: true,
                        }
                      },
                     Reactions:true

                    //   forwardedMessage:{
                    //     include:{
                    //       member:{
                    //         include:{
                    //           user:true
                    //         }
                    //       },
                    //       channel:true
                    //     },
                        
                    //   }
                    },
            
                   });
                break;
            }
        }
        if(isPresent==false) {
           message =  await db.forumResponse.update({
                where:{
                    id:forumResponseId as string,
                    serverId:serverId as string
                },
                data:{
                    Reactions:{
                        create:{
                            content,
                            createdBy:member.id as string,
                            serverId:serverId as string
                        }
                    }
                },
                include: {
                  member: {
                    include: {
                      user: true,
                    }
                  },
                  Reactions:true,
                //   forwardedMessage:{
                //     include:{
                //       member:{
                //         include:{
                //           user:true
                //         }
                //       },
                //       channel:true
                //     },
                    
                //   }
                }
        
               })
        }
    }
    console.log("Emoji added", content)
    const updateKey = `chat:${forumId}:messages:update`;
    res?.socket?.server?.io?.emit(updateKey, message);
    // return NextResponse.json({
    //     success:true,
    //     message
    // }, {status:200});
    return res.status(200).json({ success:true, message });

    } catch (error) {
        console.log(error);
    }

}

export default PUT;
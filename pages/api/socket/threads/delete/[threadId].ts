import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";



export const DELETE =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {

        const userId =await GetAuth(req);
        const { threadId, serverId, channelId } = req.query;
        console.log("ITs executing....", threadId, serverId, channelId)
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      
          if (!channelId) {
            return res.status(400).json({ error: "Channel ID missing" });
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

          const channel = await db.channel.findFirst({
            where: {
              id: channelId as string,
              serverId: serverId as string,
            },
            include:{
                manager:{
                    include:{
                        member:true
                    }
                }
            }
          });
        
          if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
          }
          const member = server.Members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let thread = await db.threads.findFirst({
      where: {
        id: threadId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          }
        }
      }
    })

    if (!thread || thread.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    const managers = channel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isMessageOwner = thread.createdBy === member.id;
    const isAdmin = member.role === MemberRole.admin;
    const isModerator = member.role === MemberRole.moderator;
    const canModify = isMessageOwner || isAdmin || isModerator || isManager;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // message = await db.message.update({
    //     where: {
    //       id: messageId as string,
    //     },
    //     data: {
    //       content: "This message was deleted successfully",
    //       fileUrl:[],
    //     },
    //     include: {
    //       member: {
    //         include: {
    //           user: true,
    //         }
    //       }
    //     }
    //   });
     const result = await db.threads.delete({
        where: {
          id: threadId as string,
          serverId:serverId as string,
          channelId:channelId as string
        }
      });
      console.log("Message Deleted Successfully");
      
      const updateKey = `chat:${thread.messageId}:messages:delete`;
    res?.socket?.server?.io?.emit(updateKey, result );

    return res.status(200).json({ success:true });
        
    } catch (error) {
        console.log(error);
        
    }

}


export default DELETE;


import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";





export const DELETE =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {forumResponseId, forumId, forumsChannelId, serverId } = req.query;
        // console.log(messageId, serverId, channelId);
        const { content } = req.body;
        // console.log(messageId, serverId, channelId, content);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      
          if (!forumsChannelId) {
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

          const forumChannel = await db.forumsChannel.findFirst({
            where: {
              id: forumsChannelId as string,
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
        
          if (!forumChannel) {
            return res.status(404).json({ error: "Forum Channel not found" });
          }
          const member = server.Members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let forumResponse = await db.forumResponse.findFirst({
      where: {
        id: forumResponseId as string,
        forumsId:forumId as string
      },
      include: {
        member: {
          include: {
            user: true,
          }
        }
      }
    })

    if (!forumResponse || forumResponse.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    const managers = forumChannel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isForumResponseOwner = forumResponse.createdBy === member.id;
    const isAdmin = member.role === MemberRole.admin;
    const isModerator = member.role === MemberRole.moderator;
    const canModify = isForumResponseOwner || isAdmin || isModerator || isManager;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deleteResponse =  await db.forumResponse.delete({
        where: {
          id: forumResponseId as string,
          forumsId:forumId as string,
          forumsChannelId:forumsChannelId as string,
          serverId:serverId as string,
        },
      });


      const updateKey = `chat:${forumId}:messages:delete`;
      res?.socket?.server?.io?.emit(updateKey, '' );
    return res.status(200).json({ success:true, forumResponse });

    } catch (error) {
        console.log(error);
    }

}


export default DELETE;
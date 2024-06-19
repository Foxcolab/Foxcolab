import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";





export const PUT =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const { messageId, serverId, conversationId } = req.query;
        const { content } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      
          if (!conversationId) {
            return res.status(400).json({ error: "Conversation ID missing" });
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

          const member = server.Members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let message = await db.directMessage.findFirst({
      where: {
        id: messageId as string,
        conversationId:conversationId as string
      },
      include: {
        member: {
          include: {
            user: true,
          }
        },
        uploadedFiles:true
      }
    })

    if (!message || message.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = message.memberId === member.id;
 
    const canModify = isMessageOwner;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

     message = await db.directMessage.update({
        where: {
          id: messageId as string,
        },
        data: {
          content: content,
        },
        include: {
          member: {
            include: {
              user: true,
            }
          },
          uploadedFiles:true
        }
      });


    const updateKey = `chat:${conversationId}:messages:update`;
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
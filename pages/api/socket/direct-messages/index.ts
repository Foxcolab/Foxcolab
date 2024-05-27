import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/prisma";
import { GetAuth } from "@/lib/GetAuth";
// import { currentProfilePages } from "@/lib/current-profile-pages";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userId =await GetAuth(req);
    const profile = await db.user.findUnique({
        where:{
            id:userId
        }
    })

    const { content, fileUrl, contentText } = req.body;
    const { conversationId, serverId } = req.query;
    
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }    
  
    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }
    if (!serverId) {
      return res.status(400).json({ error: "Server Id missing" });
    }
          
    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }


    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              userId: profile.id,
            }
          },
          {
            memberTwo: {
              userId: profile.id,
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            user: true,
          }
        },
        memberTwo: {
          include: {
            user: true,
          }
        }
      }
    })

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const member = conversation.memberOne.userId === profile.id ? conversation.memberOne : conversation.memberTwo

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        contentText:contentText,
        uploadedFiles:{
          connect:fileUrl?.map((file:string)=>({id:file}))
        },
        conversationId: conversationId as string,
        memberId: member.id,
        serverId:serverId as string,
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

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}
import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/prisma";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { NextRequest } from "next/server";
import { GetAuth } from "@/lib/GetAuth";


 const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        // console.log("cominggg....");
        
      
      const { content, fileUrl } =  req.body;
      const { serverId, channelId, sectionId } = req.query;
      
        const user = await db.user.findUnique({
            where:{
                id:userId
            }
        });
    
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }    
  
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
      
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }
    if (!sectionId) {
      return res.status(400).json({ error: "Section ID missing" });
    }
          
    if (!content && fileUrl.length===0) {
      return res.status(400).json({ error: "Content missing" });
    }
    // console.log("CONTENT",content, "CHANNEL", channelId,"SERVER", serverId);
    

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        Members: {
          some: {
            userId: user.id
          }
        }
      },
      include: {
        Members: true,
      }
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        // serverId: serverId as string,
      }
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server.Members.find((member) => member.userId === user.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        serverId: serverId as string,
        sectionId:sectionId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          }
        }
      }
    });
    // console.log("Message sent successfully");
    
    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);

    } catch (error) {
        console.log(error);
        
    }
}

export default POST;
import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/prisma";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { NextRequest } from "next/server";
import { GetAuth } from "@/lib/GetAuth";
import { BotResponse, Message } from "@prisma/client";


 const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        // console.log("cominggg....");
        
      
      const { content, fileUrl, contentText, scheduleTime } =  req.body;
      const { serverId, channelId, sectionId } = req.query;
      console.log("Time IS:", scheduleTime)
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
    let time = scheduleTime===undefined  ? new Date(): scheduleTime;
    // console.log("Schedule Time: is", time);
    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        serverId: serverId as string,
        sectionId:sectionId as string,
        memberId: member.id,
        contentText,
        createdAt:time,
        updatedAt:time,
        uploadedFiles:{
          connect:fileUrl?.map((file:string)=>({id:file}))
        }
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
    const channelKey = `chat:${channelId}:messages`;
    if(scheduleTime===undefined){
      res?.socket?.server?.io?.emit(channelKey, message);
    }
    if(scheduleTime){
      // console.log("Schedule Time:", scheduleTime)
      // const dt = new Date(scheduleTime);
      // console.log("AFter Dte Time:", dt)

      // const cur = new Date()
      // let RemainingTime:any = dt - cur;
      // console.log("Remaining Time: is", RemainingTime);
      // console.log(RemainingTime/(60*1000))
      // setTimeout(() => {
      //   console.log("Socket IO");
      
      // console.log("SEND")
      // }, RemainingTime);
    
    }


    const allBotRespones = await db.botResponse.findMany({
      where:{
        serverId:serverId as string
      }
    });
    console.log(allBotRespones);

    let fullResponse:BotResponse = null;
    let specificResponse:BotResponse = null;
    for(let i=0; i<allBotRespones.length; i++) {
      const lowerText = allBotRespones[i].triggeredText.toLowerCase();
      const lowerContent = contentText.toLowerCase();
      if(allBotRespones[i].triggeredType==="fullText" && lowerText.trim()===lowerContent.trim()){
        fullResponse=allBotRespones[i];
        // break;
      }else if(allBotRespones[i].triggeredType==="specificText" && lowerText===lowerContent.trim()){
        specificResponse=allBotRespones[i];

      }
    }

    console.log("fullResponse", fullResponse);
    console.log("SpecificResponse", specificResponse);
    
    let botMessage:Message; 
    


    if(fullResponse || specificResponse){
      const bot = await db.member.findFirst({
        where:{
          serverId:serverId as string,
          role:"bot"
        }
      });
      if((fullResponse && specificResponse) || (fullResponse && !specificResponse)){
         botMessage = await  db.message.create({
          data:{
            content:fullResponse.responseText,
            contentText:fullResponse.responseText,
            fileUrl:fullResponse.responseFileUrl,
            memberId:bot?.id as string,
            serverId:serverId as string,
            channelId:channelId as string,
            sectionId:sectionId as string,
            
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
        if(scheduleTime===undefined){
          res?.socket?.server?.io?.emit(channelKey, botMessage);
        }
      }else if(!fullResponse && specificResponse){
         botMessage = await  db.message.create({
          data:{
            content:specificResponse.responseText,
            contentText:specificResponse.responseText,
            fileUrl:specificResponse.responseFileUrl,
            memberId:bot?.id as string,
            serverId:serverId as string,
            channelId:channelId as string,
            sectionId:sectionId as string,
            
          },
          include: {
            member: {
              include: {
                user: true,
              }
            }
          }
        })
        if(scheduleTime===undefined){
          res?.socket?.server?.io?.emit(channelKey, botMessage);
        }
      }
    }


    // setTimeOut (function, delay)

    // console.log("Message sent successfully");
    
    
 

    return res.status(200).json(message);

    } catch (error) {
        console.log(error);
        
    }
}

export default POST;
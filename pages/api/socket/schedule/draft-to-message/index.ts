import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { BotResponse, Message } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import cron from "node-cron"



export const convertDraftsToMessages =async( res:NextApiResponseServerIo)=>{
    try {
        const currentTime = new Date();
        const getHours = currentTime.getHours();
        const getMinutes = currentTime.getMinutes();
        console.log(`Current Time is: ${getHours}:${getMinutes}`);

        console.log("Searching....")
        const drafts = await db.draft.findMany({
            where:{
                ScheduledDate:{
                    lte: new Date()
                }
            }
        });
        console.log("What is going on");
        console.log(drafts);

        for(let i=0; i<drafts.length; i++){
            const message = await db.message.create({
                data:{
                    content:drafts[i].content,
                    contentText:drafts[i].content,
                    fileUrl:drafts[i].fileUrl,
                    memberId:drafts[i].createdBy,
                    uploadedFiles:{
                        connect:drafts[i].fileUrl?.map((file:string)=>({id:file}))
                    },               
                    serverId:drafts[i].serverId as string,
                    channelId:drafts[i].channelId as string,
                    sectionId:drafts[i].sectionId as string,
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
            console.log(message);
            const channelKey = `chat:${drafts[i].channelId}:messages`;
            res?.socket?.server?.io?.emit(channelKey, message);


            const allBotRespones = await db.botResponse.findMany({
                where:{
                  serverId:drafts[i].serverId as string
                }
              });
              console.log(allBotRespones);
          
              let fullResponse:any = null;
              let specificResponse:any = null;
              for(let i=0; i<allBotRespones.length; i++) {
                const lowerText = allBotRespones[i].triggeredText.toLowerCase();
                const lowerContent =drafts[i].contentText?.toLowerCase();
                if(allBotRespones[i].triggeredType==="fullText" && lowerText.trim()===lowerContent?.trim()){
                  fullResponse=allBotRespones[i];
                  // break;
                }else if(allBotRespones[i].triggeredType==="specificText" && lowerText===lowerContent?.trim()){
                  specificResponse=allBotRespones[i];
          
                }
              }
          
              console.log("fullResponse", fullResponse);
              console.log("SpecificResponse", specificResponse);
              
          
          
              
          
          
              let botMessage:Message; 
              
          
          
              if(fullResponse || specificResponse){
                const bot = await db.member.findFirst({
                  where:{
                    serverId:drafts[i].serverId as string,
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
                      serverId:drafts[i].serverId as string,
                      channelId:drafts[i].channelId as string,
                      sectionId:drafts[i].sectionId as string,
                      
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
                res?.socket?.server?.io?.emit(channelKey, botMessage);
                  
                  // if(scheduleTime===undefined){
                  //   res?.socket?.server?.io?.emit(channelKey, botMessage);
                  // }
                }else if(!fullResponse && specificResponse){
                   botMessage = await  db.message.create({
                    data:{
                      content:specificResponse.responseText,
                      contentText:specificResponse.responseText,
                      fileUrl:specificResponse.responseFileUrl,
                      memberId:bot?.id as string,
                      serverId:drafts[i].serverId as string,
                      channelId:drafts[i].channelId as string,
                      sectionId:drafts[i].sectionId as string,
                      
                    },
                    include: {
                      member: {
                        include: {
                          user: true,
                        }
                      }
                    }
                  });
                res?.socket?.server?.io?.emit(channelKey, botMessage);
          
                 
                }
              }
          













        }



        console.log("Scheduled Successfully");
        return NextResponse.json({
            success:true,
        }, {status:200})
    } catch (error) {
        console.log(error);
    }
}

cron.schedule('* * * * *', () => {
    console.log('Running draft to message conversion job using node con...');
    
    convertDraftsToMessages();
  });
  


export default convertDraftsToMessages;

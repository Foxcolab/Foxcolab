import { db } from "@/prisma";
import { NextRequest } from "next/server";
import { GetDataFromToken2 } from "@/middlewares/getDataFromToken";
import jwt from "jsonwebtoken"



export const getServerDetails = async(id:any,token:any)=>{
  try {
    
    
    const server = await db.server.findUnique({
      where:{
        id:id,
        Members:{
          some:{
            // userId:userId
          }
        }
      }      
    });
    console.log(server);
    return server;
    
  } catch (error) {
   console.log(error);
    
  }
}
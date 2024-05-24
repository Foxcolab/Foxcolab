import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";


export const GET =async(req:NextRequest, params:{id:String})=>{
    try {
        const userId =await GetDataFromToken(req);
        const server = await db.server.findUnique({
            where:{
                id:params.id as string
            },
            include: {
                sections: {
                    orderBy:{
                        createdBy:"asc"
                    }
                },
                channels: {
                    orderBy:{
                        createdBy:"desc"
                    }
                },
                Members: {
                    include:{
                        user:true
                    }
                },
            }
        })

        



        return NextResponse.json({
            success:true,
            server
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
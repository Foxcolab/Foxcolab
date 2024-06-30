import { NextRequest, NextResponse } from "next/server";
import {db} from "@/prisma"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";


export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {name, email, message, detailedMessage, files} = reqBody;
        if(!email || !message) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        console.log(name, email, message, detailedMessage, files);

        const contactUs = await db.contactUs.create({
            data:{
                name,
                email,
                message,
                detailedMessage,
                files:{
                    connect:files?.map((file:string)=>({id:file}))
                },
            }
        });
        console.log(contactUs);
        return NextResponse.json({
            success:true,
            contactUs
        }, {status:200});
    } catch (error) {
        console.log(error);
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const contactId = req.nextUrl.searchParams.get('contactId');
        if(!contactId) return NextResponse.json({
            error:"Contact id missing"
        }, {status:409});
        
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"User id not found"
        }, {status:409});

        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });
        if(!user) return NextResponse.json({
            error:"User not found"
        }, {status:409});
        
        if(user.role!=="superAdmin"){
            return NextResponse.json({
                erorr:"You are not authorized"
            }, {status:409});
        }
        
        const contactUs = await db.contactUs.findFirst({
            where:{
                id:contactId
            }
        });
        if(!contactUs) return NextResponse.json({
            error:"Message not found"
        }, {status:200})

        const del = await db.contactUs.delete({
            where:{
                id:contactId
            }
        });

        return NextResponse.json({
            success:true,
            message:"Message deleted successfully."
        }, {status:200});
    } catch (error) {
        console.log(error);
    }
}
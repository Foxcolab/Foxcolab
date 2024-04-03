import { NextResponse } from "next/server";



export const GET = async()=>{
    try {
        const response = NextResponse.json({
            message:"Logout successfully",
            success:true
        }, {status:200});

        response.cookies.set("token", null, 
        { httpOnly: true,secure:true, sameSite:"none", expires: new Date(0) 
        });
        return response;

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}
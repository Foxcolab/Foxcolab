import { NextResponse, NextRequest } from "next/server";
import { db } from "./prisma";
import { GetDataFromToken } from "./middlewares/getDataFromToken";
import jwt from "jsonwebtoken"


export const middleware=async(req:NextRequest)=>{
    
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path==="/"

  const token = req.cookies.get('token')?.value || ''
  console.log(token);
  

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

// await connectDB();

console.log(token);


// // const user = await User.findById(userId).select("-password");
// if(!user){
//   return NextResponse.redirect("/");
// }else {
//   return NextResponse.redirect("/home")
// }

}


export const config = {
    matcher: [
      '/',
      '/profile',
      '/register',
      '/login',
      `/server/:id`,
      "/api/uploadthing"

    ]
  }
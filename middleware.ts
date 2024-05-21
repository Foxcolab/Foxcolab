import { useSession } from "next-auth/react";
import { NextResponse, NextRequest } from "next/server";



export const middleware=async(req:NextRequest)=>{
    
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path==="/"

  const token = req.cookies.get('token')?.value || '';
  const googleToken = req.cookies.get('next-auth.csrf-token')?.value || '';
  console.log("Token", token);
  console.log("googleToken", googleToken)
  
  // if(googleToken!==''){
  //   const {status} = useSession();
  //   console.log(status);
  // }
  // // console.log(isPublicPath && (token!=='' && googleToken!==''));

  // if(isPublicPath && (token!=='' && googleToken!=='')) {
  //   return NextResponse.redirect(new URL('/home', req.nextUrl))
  // }

  // if (!isPublicPath && (token==='' && googleToken==='')) {
  //   return NextResponse.redirect(new URL('/', req.nextUrl))
  // }

// await connectDB();

// console.log(token);


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
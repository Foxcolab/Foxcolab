import { NextResponse, NextRequest } from "next/server";



export const middleware=async(req:NextRequest)=>{
    
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path==="/"

  const token = req.cookies.get('token')?.value || '';
  // const googleToken = req.cookies.get('next-auth.csrf-token')?.value || '';
  const googleToken = req.cookies.get('next-auth.session-token')?.value || '';
  const googleServerToken = req.cookies.get('__Secure-next-auth.session-token')?.value || '';
  
  if(isPublicPath && (token!=='' || googleToken!=='' || googleServerToken!=='')) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  if (!isPublicPath && (token==='' && googleToken==='' && googleServerToken==='')) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }




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
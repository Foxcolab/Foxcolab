import { NextResponse } from "next/server"



export const ErrorHandler = ( statusCode=500,
  message="Inernal Server Error"
)=> {
  return NextResponse.json({
    success:false,
    message,
    status:statusCode
  })
}

export const CatchAsyncError =(passedFunction)=>(req)=>{
  Promise.resolve(passedFunction(req)).catch((err)=>{
    console.log("ERROR", err);
    ErrorHandler( 500, err.message)
  })

}
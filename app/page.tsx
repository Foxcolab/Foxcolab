

import { NextSeo } from "next-seo";
import MainPage from "./(pages)/components/LandingPage/MainPage/MainPage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Foxcolab - a community plaform for teams',
  description: "Foxcolab is a new way to communicate with your team. It's faster, better organised and more secure than any other plaform",
}

export default function Home() {


  return (
    <>
  {/* <NextSeo
      title={"Foxcolab - a community plaform for teams"}
      description={"Foxcolab is a new way to communicate with your team. It's faster, better organised and more secure than any other plaform."}
      /> */}
   
    {/* <h1>This is home age</h1> */}
   <MainPage />




    </>
  )
}

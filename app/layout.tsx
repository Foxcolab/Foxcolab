import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './(pages)/components/provider/Theme-provider'
import { cn } from '@/lib/utils'
import { SocketProvider } from './(pages)/components/provider/SocketProvider'
import { QueryProvider } from './(pages)/components/provider/QueryProvider'
const inter = Inter({ subsets: ['latin'] })
import { Toaster } from "@/components/ui/toaster"
import { NextSeo } from 'next-seo'
export const metadata: Metadata = {
  title: 'Foxcolab',
  description: 'Foxcolab - where community meets',
}

{/* <NextSeo
title="Login - Foxcolab"
description="Login in Foxcolab using Email or Google Account or Apple Account."
/> */}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      // className={cn(inter, "bg-white dark:bg-[#313338]")} 
      >

      {/* <ThemeProvider attribute='class' defaultTheme='Dark'  enableSystem={true} storageKey='foxcolab-key'> */}
      <SocketProvider>
      <QueryProvider>
                {children}
                <Toaster />

      </QueryProvider>
      </SocketProvider>
        {/* </ThemeProvider>         */}
        
        </body>
    </html>
  )
}

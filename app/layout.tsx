import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import './main.scss'
import { ModelProvider } from '@/components/model-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeuroGen AI | Unlock Infinite Creativity - Images, Audios, Videos, Codes, and Chat',
  description: 'Unleash infinite creativity with NeuroGen AI! Create stunning images, videos, audios, codes, and chat effortlessly. Try our free tier or subscribe for limitless possibilities. Developed and designed by Vinojan Abhimanyu',
  keywords: "AI application, All-in-one AI, Image generation, Video generation, Audio generation, Code generation, Chatbot, Natural language processing"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />

        <head>
          <link rel="icon" href="/logo.png" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </head>

        <body className={inter.className}>
          <ModelProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    MessageSquare,
    ImageIcon,
    VideoIcon,
    Music,
    Code,
    Settings
} from "lucide-react";

import { cn } from '@/lib/utils';

const montserrat = Montserrat({
    weight: "600",
    subsets: ['latin']
});

const routes = [
    {
        lable: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        lable: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        lable: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        lable: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        lable: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        lable: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        lable: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

function Sidebar() {
    const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
        <div className='px-3 py-2 flex-1'>
            <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
                <div className='relative w-8 h-8 mr-4'>
                    <Image 
                        fill
                        alt='Logo'
                        src='/logo.png'
                    />
                </div>
                <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                    NeuroGen
                </h1>
            </Link>
            <div className='space-y-1'>
                {routes.map((route) => (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                            'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                            // for the active page section
                            pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
                        )}
                    >
                        <div className='flex items-center flex-1'>
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.lable}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
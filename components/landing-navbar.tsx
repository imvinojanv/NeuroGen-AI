"use client"

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";    // (auth-useAuth) useAuth is one of the code from Next client, So we are using here to use in both client and server side

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({
    weight: "600",
    subsets: ['latin']
});

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="px-4 py-6 bg-transparent flex items-center justify-between">
            <Link href='/' className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image 
                        fill
                        alt="Logo"
                        src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl md:text-3xl font-bold text-white", montserrat.className)}>
                    NeuroGen
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                    {isSignedIn ? 
                        <Button variant='outline' className={cn("text-md rounded-full bg-transperant text-white md:px-8", montserrat.className)}>
                            Dashboard
                        </Button>
                    : 
                        <Button variant='outline' className={cn("text-md rounded-full md:px-8", montserrat.className)}>
                            Get started
                        </Button>
                    }
                </Link>
            </div>
        </nav>
    )
}
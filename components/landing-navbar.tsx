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
                <h1 className={cn("text-2xl font-bold text-white", montserrat.className)}>
                    NeuroGen
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                {isSignedIn ? 
                    <Link href='/dashboard'>
                        <Button variant='outline' className={cn("text-md rounded-full bg-transperant text-white md:px-8", montserrat.className)}>
                            Dashboard
                        </Button>
                    </Link>
                :
                    <div className="flex items-center justify-center gap-4">
                        <Link className="hidden md:block lg:block" href='sign-in'>
                            <Button variant='link' className={cn("text-md rounded-full bg-transperant text-white md:px-8", montserrat.className)}>
                                Sign in
                            </Button>
                        </Link>
                        <Link href='sign-up'>
                            <Button variant='outline' className={cn("text-md rounded-full md:px-8 text-[#171719] border-nonen transition-all hover:bg-transparent hover:text-white", montserrat.className)}>
                                Get started
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        </nav>
    )
}
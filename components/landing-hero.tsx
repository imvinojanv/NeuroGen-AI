"use client"

import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const montserrat = Montserrat({
    weight: "600",
    subsets: ['latin']
});

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    
    return (
        <div className="text-white font-bold py-36 text-center space-y-5 h-[83%]">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Ultimate AI Artisan for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Chatbot.",
                                "Code Generation.",
                                "Image Generation.",
                                "Video Generation.",
                                "Music Generation.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>

            <div className="text-sm md:text-xl font-light text-zinc-400">
                Unlock Infinite Creativity using AI 10X faster.
            </div>

            {/* <div className="absolute h-20 w-20">
                <Image
                    fill
                    alt="bg"
                    src='/bg.png'
                />
            </div> */}

            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant='premium' className={cn("md:text-lg py-4 px-4 md:py-6 md:px-8 rounded-full font-semibold", montserrat.className)}>
                        {isSignedIn ? "Go to Dashboard" : "Start Generating for FREE"}
                    </Button>
                </Link>
            </div>

            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required.
            </div>
        </div>
    )
}
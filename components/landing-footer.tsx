"use client"

import Link from "next/link"

export const LandingFooter = () => {
    return (
        <div className="flex justify-between items-center px-4">
            <p className="text-zinc-400 text-sm">
                Copyright © 2023 <span className="font-semibold">NeuroGen AI</span>. All rights reserved.
            </p>
            <p className="text-zinc-400 text-sm">
                Designed and Developed by <a 
                    className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#3a47d5] to-[#1CB5E0]" 
                    href="https://vinojan.online"
                    target="_blank"
                >
                    Vinojan Abhimanyu
                </a>
            </p>
        </div>
    )
}
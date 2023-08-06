"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
    {
        title: "Conversation",
        description: "Our most advanced conversation model."
    },
    {
        title: "Conversation",
        description: "Our most advanced conversation model."
    },
    {
        title: "Conversation",
        description: "Our most advanced conversation model."
    },
    {
        title: "Conversation",
        description: "Our most advanced conversation model."
    },
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {features.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="text-zinc-400 pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
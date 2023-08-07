"use client"

import { useState } from "react";
import axios from "axios";
import { Check, Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon, X, Zap } from "lucide-react";
import { toast } from 'react-hot-toast';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePremiumModel } from "@/hooks/use-premium-model";
import { cn } from "@/lib/utils";

const tools = [
    {
        lable: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        lable: "Code Generation",
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    },
    {
        lable: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        lable: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        lable: "Music Generation",
        icon: MusicIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
];

const PremiumModel = () => {
    const premiumModel = usePremiumModel();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = axios.get("/api/stripe");

            window.location.href = (await response).data.url;
        } catch (error) {
            toast.error("Something went wrong!");
            console.log("STRIPE_CLIENT_ERROR", error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <Dialog open={premiumModel.isOpen} onOpenChange={premiumModel.onClose}>
        <DialogContent className="bg-[#171719] border-white/10">
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgade to NeuroGen
                        <Badge variant="premium" className="uppercase border-none text-sm py-1 tracking-wider">
                            premium
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card
                            key={tool.lable}
                            className="p-3 bg-[#202025] border border-[rgba(56,56,58,.6)] flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                   <tool.icon className={cn("w-6 h-6", tool.color)} /> 
                                </div>
                                <div className="font-semibold text-sm text-white">
                                    {tool.lable}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5 text-green-500" />
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    disabled={loading}
                    onClick={onSubscribe}   
                    size="lg"
                    variant="premium"
                    className="w-full gap-1 text-md"
                >
                    Upgrade
                    <Zap className="w-4 h-4 fill-white" />
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default PremiumModel
"use client"

import { Check, Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon, Zap } from "lucide-react";

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

  return (
    <Dialog open={premiumModel.isOpen} onOpenChange={premiumModel.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgade to NeuroGen
                        <Badge variant="premium" className="uppercase text-sm py-1">
                            premium
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card
                            key={tool.lable}
                            className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                   <tool.icon className={cn("w-6 h-6", tool.color)} /> 
                                </div>
                                <div className="font-semibold text-sm">
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
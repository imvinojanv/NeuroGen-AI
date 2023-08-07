import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUNTS } from "@/constants";
import { usePremiumModel } from "@/hooks/use-premium-model";

import { Zap } from "lucide-react";

interface FreeCounterProps {
    apiLimitCounter: number;
    isPremium: boolean;
}

const FreeCounter = ({
    apiLimitCounter = 0,
    isPremium = false,
}: FreeCounterProps) => {
    const premiumModel = usePremiumModel();
    //  To prevent from any hydreation errors
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Allow to use premium features after subscribed
    if (isPremium) return null;

  return (
    <div className="px-3">
        <Card className="bg-[#202025] border-[rgba(56,56,58,.6)]">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p>
                        {apiLimitCounter} / {MAX_FREE_COUNTS} Free Generations
                    </p>
                    <Progress 
                        className="h-3 "
                        value={(apiLimitCounter / MAX_FREE_COUNTS) * 100}
                    />
                </div>
                <Button onClick={premiumModel.onOpen} className="w-full" variant="premium">
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white" />
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default FreeCounter 
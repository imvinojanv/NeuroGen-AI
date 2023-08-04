import { Settings } from "lucide-react"

import { Heading } from "@/components/heading"
import { checkSubscription } from "@/lib/subscription"
import { SubscriptionButton } from "@/components/subscription-button";

const SettingsPage = async () => {
    // Server side component
    const isPremium = await checkSubscription();

  return (
    <div>
        <Heading 
            title="Settings"
            description="Manage account settings."
            icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
        />

        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {isPremium ? "You're currently on a premium plan." : "You're currently on a free plan."}
            </div>
            <SubscriptionButton isPremium={isPremium} />
        </div>
    </div>
  )
}

export default SettingsPage
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
            iconColor="text-gray-500"
            bgColor="bg-gray-500/20"
        />

        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-white text-md">
                {isPremium ? "You're currently on a Premium Plan." : "You're currently on a FREE Plan."}
            </div>
            <SubscriptionButton isPremium={isPremium} />
        </div>
    </div>
  )
}

export default SettingsPage
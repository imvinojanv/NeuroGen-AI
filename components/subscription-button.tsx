"use client"

import axios from "axios";
import { Zap } from "lucide-react";
import { toast } from 'react-hot-toast';

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SubscriptionButtonProps {
    isPremium: boolean;
};

export const SubscriptionButton = ({
    isPremium = false,
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            // Is there no different, route for our stripe is know whether user has the subscription or not. 
            // If user have the subcsription, its going to open billing page. If don't it's going to open the checkout page
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong!");
            console.log("BILLING_ERROR", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button className="px-10" disabled={loading} variant={isPremium ? "default" : "premium"} onClick={onClick}>
            {isPremium ? "Manage Subscription" : "Upgrade Plan"}
            {!isPremium && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}
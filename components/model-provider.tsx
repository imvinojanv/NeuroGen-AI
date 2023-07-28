"use client"

import { useState, useEffect } from "react";
import PremiumModel from "@/components/premium-model";

export const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PremiumModel />
        </>
    )
    
}
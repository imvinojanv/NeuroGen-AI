"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPremium: boolean;
}

function MobileSidebar({
  apiLimitCount = 0,
  isPremium = false
}: MobileSidebarProps) {
    // For the Hydration error
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, [])
    
    if (!isMounted) return null;

  return (
    <Sheet>
        <SheetTrigger>
            <Button variant="darkBtn" size="icon" className="md:hidden">
                <Menu color="#fff" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar isPremium={isPremium} apiLimitCount={apiLimitCount} />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

interface MobileSidebarProps {
  apiLimitCount: number;
}

function MobileSidebar({
  apiLimitCount
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
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar apiLimitCount={apiLimitCount} />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
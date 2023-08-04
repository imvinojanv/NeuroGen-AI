"sue client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("a68004ee-d7aa-4ce3-8dfb-a2304056e6a1");
    }, [])
    
    return null;
}
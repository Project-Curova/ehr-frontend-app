import { useEffect, useState } from "react";
import { MOBILE_CONSTRAINT } from "../lib/definitions";

// Custom hook to detect mobile viewport
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < MOBILE_CONSTRAINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_CONSTRAINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export default useIsMobile;
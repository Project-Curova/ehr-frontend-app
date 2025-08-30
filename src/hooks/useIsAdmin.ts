import { useEffect, useState } from "react";

// Custom hook to detect mobile viewport
const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    useEffect(() => {
        setIsAdmin(true);
    }, [])

    return isAdmin;
};

export default useIsAdmin;
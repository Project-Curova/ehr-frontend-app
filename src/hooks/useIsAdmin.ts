import { useEffect, useState } from "react";

// Custom hook to detect mobile viewport
const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAdmin(false);
    }, [])

    return isAdmin;
};

export default useIsAdmin;
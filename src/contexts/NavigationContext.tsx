import { createContext, useState, type ReactNode } from "react";

// Interface for the context
interface NavigationContextProp {
    setMobleNavBarToTrue: () => void;
    isMobileNavOpen: boolean;
    setMobleNavBarToFalse: () => void;
    toggleMobileNavBar: () => void;
}

// SETTNG INTERFACEFOR THE CHILDREN AND THE VALUE
interface NavigationProviderProps {
    children: ReactNode;
}

// creating context for navigation
export const NavigationContext = createContext({} as NavigationContextProp);

// conext provider for the whole app
export function NavigationContextProvider({ children }: NavigationProviderProps) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

    // to toggle the navbar
    function setMobleNavBarToTrue() {
        setIsMobileNavOpen(true);
    }
    function toggleMobileNavBar() {
        setIsMobileNavOpen(!isMobileNavOpen);
    }

    function setMobleNavBarToFalse() {
        setIsMobileNavOpen(false);
    }

    return (
        <NavigationContext.Provider
            value={{
                isMobileNavOpen,
                setMobleNavBarToTrue,
                setMobleNavBarToFalse,
                toggleMobileNavBar,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}
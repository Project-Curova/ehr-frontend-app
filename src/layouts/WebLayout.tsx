import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { NavigationContextProvider } from "../contexts/NavigationContext";
import useIsMobile from "../hooks/useIsMobile";

const WebLayout: React.FC = () => {

    const isMobile = useIsMobile();

    return (
        <NavigationContextProvider>

            {/* Navigation */}
            {/* <NavigationBar /> */}

            <main
                className={classNames({
                    'min-h-screen bg-gray-100 bbg-[#F5F2F0]': true,
                    "lg:pl-[250px] ": !isMobile
                })}
            >
                <div>
                    <Outlet />
                </div>
            </main>
        </NavigationContextProvider>
    )
}


export default WebLayout
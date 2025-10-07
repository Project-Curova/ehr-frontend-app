import { useEffect, useRef, useState, type ReactNode } from "react";
import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import { RiHome9Fill } from "react-icons/ri";
import { Link } from "react-router";
import { BeatLoader } from "react-spinners";
import AvatarImg from "../../assets/profile/user-default.svg";
import useLogoutHook from "../../hooks/auth/useLogoutHook";
import { NAVIGATION, override } from "../../lib/definitions";

type TopNavigationProp = {
    title?: string
    homePage?: boolean
}

const TopNavigation: React.FC<TopNavigationProp> = ({ title, homePage }) => {
    return (
        <div className="py-3 mb-3 w-full border-b border-b-[#e6e2e2] px-3 flex items-center justify-between">
            <div><h2 className="font-medium text-xl">{title}</h2></div>
            <div className="flex items-center gap-x-5">
                <div className="cursor-pointer">
                    {!homePage ?
                        <Link to={NAVIGATION.HOME}>
                            <RiHome9Fill color="#57687E" size={25} />
                        </Link> :
                        <>
                            <GoBellFill color="#57687E" size={25} />
                        </>}
                </div>
                <div>
                    <DropdownComponent>
                        <img
                            className="rounded-full w-[3rem] h-[3rem] object-cover cursor-pointer"
                            src={AvatarImg}
                            alt="Profile"
                        />
                    </DropdownComponent>
                </div>
            </div>
        </div>
    )
}

type DropdownProps = {
    children?: ReactNode
};

const DropdownComponent: React.FC<DropdownProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { logoutUser, isSignOutUserLoading } = useLogoutHook();

    // Close the dropdown when clicked outside
    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener to detect clicks outside of the dropdown
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-max h-max" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="rounded-full w-[3rem] h-[3rem]">
                {children}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[20vw] max-w-[350px] bg-white rounded-md shadow-lg">

                    <div className="px-4 py-2">
                        <p className="font-medium text-xl">Profile</p>
                        <div className="mt-3 flex items-center gap-x-5">
                            <img
                                className="rounded-full w-[3rem] h-[3rem] object-cover cursor-pointer"
                                src={AvatarImg}
                                alt="Profile"
                            />

                            <div>
                                <p>Lillian Domme</p>
                                <p className="text-blue-950 text-xs">lilliandomme@gmail.com</p>
                            </div>
                        </div>

                        <div className="mt-5 text-sm flex flex-col gap-y-3">
                            <Link to={NAVIGATION.HOME} className="flex justify-between items-center hover:text-pry">
                                <p>Edit Profile</p>
                                <BsFillArrowDownRightSquareFill fill="#6a7282" />
                            </Link>
                            <Link to={NAVIGATION.HOME} className="flex justify-between items-center">
                                <p>Change Password</p>
                                <BsFillArrowDownRightSquareFill fill="#6a7282" />
                            </Link>
                            <Link to={NAVIGATION.HOME} className="flex justify-between items-center">
                                <p>Notification Settings</p>
                                <BsFillArrowDownRightSquareFill fill="#6a7282" />
                            </Link>
                        </div>

                        <button type="button" onClick={(e) => {
                            e.stopPropagation();
                            logoutUser();
                        }} className="w-full bg-pry text-white text-sm rounded py-2 font-medium mt-5 my-3 cursor-pointer">
                            {isSignOutUserLoading ? (
                                <BeatLoader
                                    color={"#ffffff"}
                                    loading={true}
                                    cssOverride={override}
                                    size={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : "Log Out"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopNavigation;
import { GoBellFill } from "react-icons/go";
import { RiHome9Fill } from "react-icons/ri";
import { Link } from "react-router";
import AvatarImg from "../../assets/profile/user-default.svg";
import { NAVIGATION } from "../../lib/definitions";

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
                <img
                    className="rounded-full w-[3rem] h-[3rem] object-cover cursor-pointer"
                    src={AvatarImg}
                    alt="Profile"
                />
            </div>
        </div>
    )
}

export default TopNavigation;
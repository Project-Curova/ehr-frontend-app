import Activ8Logo from "../../assets/auth/Activ8LogoNTS.svg";
import "./style.css";

interface LoaderProp {
    onClose?: () => void
}

const Loader: React.FC<LoaderProp> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-75" onClick={onClose}>
            <div className="relative items-center w-24 h-24 lg:w-64">
                <img
                    src={Activ8Logo}
                    alt="Loading"
                    // layout="fill"
                    // objectFit="contain"
                    className="svg-water-fill mx-auto object-contain"
                />
            </div>
        </div>
    )
}

export default Loader
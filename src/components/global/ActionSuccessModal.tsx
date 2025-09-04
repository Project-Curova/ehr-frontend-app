import classNames from "classnames";
import type { ReactNode } from "react";
import { TfiClose } from "react-icons/tfi";

interface ActionSuccessProp {
    desc: ReactNode,
    img?: string
    imgElement?: ReactNode
    altText?: string
    closeModal: () => void
    buttonTitle: string,
    buttonAction: () => void
}

const ActionSuccessModal: React.FC<ActionSuccessProp> = ({ desc, img, imgElement, altText, buttonTitle, buttonAction, closeModal }) => {
    return (
        <div className="relative rounded bg-[#ffffff] flex flex-col justify-center items-center px-inlinePage px-[2rem] py-[3rem] w-[350px]">
            <p onClick={closeModal} className="absolute top-6 right-3 w-[30px] h-[30px] z-[10] cursor-pointer">
                <TfiClose />
            </p>

            {img &&
                <img width={170} src={img} alt={altText} />
            }

            {imgElement && imgElement}

            <div>
                {desc}
            </div>

            <button className={classNames({
                'rounded px-[2rem] py-2 w-full cursor-pointer text-white mt-9 bg-black max-w-[300px] mx-auto': true
            })} type="button" onClick={buttonAction}>{buttonTitle}</button>
        </div >
    )
}

export default ActionSuccessModal;
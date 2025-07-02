import classNames from "classnames";
import { useEffect, type ReactNode } from "react";
import crossSvg from "../../assets/cross.svg";

type ModalProps = {
    closeModal: () => void;
    children: ReactNode;
    bare?: boolean
    info?: boolean
    dark?: boolean
    position?: 'right' | 'left'
    desktopAlign?: boolean
};

function Modal({ closeModal, children, bare, info, dark, position, desktopAlign }: ModalProps) {
    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            className={
                classNames({
                    'bg-[#000000c0]': dark,
                    'justify-center': !position,
                    'justify-end pr-5': position == 'right',
                    'justify-start': position == 'left',
                    'fixed inset-0 bg-[#1110101a] flex items-center transition-colors z-[999]': true,
                })}
            onClick={closeModal}
        >
            <div className={`relative bg-white ${!bare && "px-3 py-8 sm:p-5"} ${desktopAlign && "ml-[250px]"} rounded-xl overflow-hidden `}>
                {/* This  */}
                {(!bare && !info) && (
                    <img
                        className="absolute top-3 right-3 w-[20px] h-[15px] z-[10] cursor-pointer"
                        src={crossSvg}
                        alt="close icon"
                        onClick={closeModal}
                        width={10}
                    />
                )}

                {/* Stop propagation to prevent closing modal */}
                <div
                    className="h-maxx"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
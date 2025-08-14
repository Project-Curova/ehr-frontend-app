// import { useState, useRef, FormEvent } from "react";
// import { useSetPinMutation } from "../../app/services/auth/auth";
// import { useAppDispatch, useAppSelector } from "../typedHooks";
// import toast from "react-hot-toast";
// import { VerifyEmailResponse } from "../../lib/auth";

// const useSetPinHook = () => {

//     const user = useAppSelector(state => state.authUser);

//     const dispatch = useAppDispatch();

//     // const [pin, setPin] = useState<string | null>(null);

//     const [setUserPin, { isLoading: isSetPinLoading }] = useSetPinMutation();

//     const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

//     const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

//     const [pinSetSuccess, setPinSetSuccess] = useState<boolean | null>(null);

//     const jwt = user.jwt;

//     const handleChange = (element: HTMLInputElement, index: number) => {
//         const value = element.value;
//         if (/^[0-9]$/.test(value) || value === "") {
//             const newOtp = [...otp];
//             newOtp[index] = value;

//             setOtp(newOtp);

//             // Move focus to the next input box
//             if (value && index < 5) {
//                 inputsRef.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         if (e.key === "Backspace" && otp[index] === "") {
//             if (index > 0) {
//                 inputsRef.current[index - 1]?.focus();
//             }
//         }
//     };

//     async function handleSubmission(e: FormEvent) {
//         e.preventDefault();

//         if (otp.length < 4) {
//             toast.error("Incomplete Otp");
//             return;
//         }

//         const inputPin = otp.join("");

//         if (!pin) {
//             setPin(inputPin);
//             setOtp(new Array(4).fill(""));
//             return;
//         }

//         if (pin != inputPin) {
//             toast.error("Pin mismatch");
//             setPin(null);
//             setOtp(new Array(4).fill(""));
//             return;
//         }

//         try {

//             if (!jwt) {
//                 toast.error("User jwt not found");
//                 return;
//             }

//             // Set user email
//             await setUserPin({ createPin: pin, reEnterPin: inputPin, jwt }).unwrap();
//             setPinSetSuccess(true);
//         } catch (error) {
//             // Clear Pin field
//             setOtp(new Array(4).fill(""));
//             setPin(null);
//             if (typeof error == 'object' && error != null) {
//                 const errorMessage = (error as VerifyEmailResponse).data.message
//                 toast.error(errorMessage);
//             }
//             else {
//                 toast.error("OTP error. Try again!");
//             }
//             setOtp(new Array(4).fill(""));
//         }
//     }
//     // Check if OTP is complete
//     const isOtpComplete = otp.every((digit) => digit != "");

//     return {
//         pin,
//         otp,
//         setOtp,
//         isOtpComplete,
//         isSetPinLoading,
//         inputsRef,
//         pinSetSuccess,
//         handleChange,
//         handleBackspace,
//         handleSubmission,
//         dispatch
//     }
// }

// export default useSetPinHook
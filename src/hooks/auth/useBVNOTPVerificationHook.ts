// import { useKycOTPVerificationMutation, useResendBVNOtpMutation } from "../../app/services/auth/auth";
// import { MutationResultType } from "../../lib/definitions/definitions";
// import { getErrorMessage } from "../../utils/util";

// const useBVNOTPVerificationHook = () => {
//     const [verifyUser, { isLoading: isVerifyUserLoading }] = useKycOTPVerificationMutation();
//     const [resendOtp, { isLoading: isResendingOtpLoading }] = useResendBVNOtpMutation();

//     async function resendUserOtp(email: string): Promise<MutationResultType> {
//         // Clear all errors and messages
//         let message = ""
//         let success = false;
//         let data;

//         await resendOtp({ email }).unwrap();

//         try {
//             data = await resendOtp({ email }).unwrap();
//             success = true;
//         } catch (error) {
//             message = getErrorMessage(error);
//         }

//         return { success, message, data };
//     }

//     async function verifyUserOtp({ userId, otp }: { userId: string, otp: string }): Promise<MutationResultType> {
//         // Clear all errors and messages
//         let message = ""
//         let success = false;
//         let data;

//         try {
//             data = await verifyUser({ userId, otp }).unwrap();
//             success = true;
//         } catch (error) {
//             message = getErrorMessage(error);
//         }

//         return { success, message, data };
//     }


//     return (
//         {
//             resendUserOtp,
//             isResendingOtpLoading,
//             isVerifyUserLoading,
//             verifyUserOtp
//         }
//     )
// }

// export default useBVNOTPVerificationHook
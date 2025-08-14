// import { useState } from "react";
// import { useKycVerificationMutation } from "../../app/services/auth/auth";
// import { MutationResultType } from "../../lib/definitions/definitions";
// import { getErrorMessage } from "../../utils/util";

// const BVN_DIGITS = 11;
// const NIN_DIGITS = 11;

// export type VerificationFormType = {
//     firstName: string,
//     lastName: string,
//     bvn: string,
//     nin: string,
//     phoneNumber: string
// }

// type useBVNVerificationHookProp = {
//     userId: string
// }

// const useBVNVerificationHook = ({ userId }: useBVNVerificationHookProp) => {

//     const [formData, setFormData] = useState<VerificationFormType>({
//         firstName: "",
//         lastName: "",
//         bvn: "",
//         nin: "",
//         phoneNumber: ""
//     })

//     const [verifyUser, { isLoading: isVerifyUserLoading }] = useKycVerificationMutation();

//     // Verify User Pin
//     async function verifyUserBVN(): Promise<MutationResultType> {
//         // Clear all errors and messages
//         let message = ""
//         let success = false;
//         let data;

//         try {
//             data = await verifyUser({ firstName: formData.firstName, lastName: formData.lastName, nin: formData.nin, bvn: formData.bvn, phoneNumber: formData.phoneNumber, userId }).unwrap();

//             // Suucessful action
//             success = true;
//         } catch (error) {
//             message = getErrorMessage(error);
//         }

//         return { success, message, data };
//     }


//     return (
//         {
//             formData,
//             setFormData,
//             isVerifyUserLoading,
//             verifyUserBVN,
//             BVN_DIGITS,
//             NIN_DIGITS
//         }
//     )
// }

// export default useBVNVerificationHook
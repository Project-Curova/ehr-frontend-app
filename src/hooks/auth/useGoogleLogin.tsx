// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import { AuthSliceActions } from "../../features/auth/AuthSlice";
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, NAVIGATION } from "../../lib/definitions/definitions";
// import { getEmailFromJWT, getErrorMessage } from "../../utils/util";
// // import { gapi } from 'gapi-script';
// import { useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from 'react-router-dom';
// import { useGoogleSigninMutation, useGoogleSignupMutation } from "../../app/services/auth/auth";
// import { useAppDispatch } from "../typedHooks";

// type UseGoogleLoginHookProp = {
//     setGoogleErrorMessage: React.Dispatch<React.SetStateAction<string | undefined | null>>
//     setVerificationOpen: React.Dispatch<React.SetStateAction<string | null>>
//     mode?: 'login'
// }

// export const useGoogleLoginHook = ({ setGoogleErrorMessage, setVerificationOpen, mode }: UseGoogleLoginHookProp) => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<any | null>(null);
//     const [signinWithGoogle, { error: GoogleProfileLoginError, isError: isGoogleProfileLoginError, isLoading: isGoogleProfileLoginLoading, isSuccess: isGoogleProfileLoginSuccess }] = useGoogleSigninMutation();
//     const [signUpWithGoogle, { error: GoogleProfileErrorSignUp, isError: isGoogleProfileSignUpError, isLoading: isGoogleProfileSignUpLoading, isSuccess: isGoogleProfileSignUpSuccess }] = useGoogleSignupMutation();

//     const dispatch = useAppDispatch();

//     const googleLogin = useGoogleLogin({
//         flow: 'auth-code', // Use 'auth-code' to fetch tokens, including id_token
//         scope: "openid profile email",
//         onSuccess: async (codeResponse) => {
//             try {
//                 // Exchange the authorization code for tokens
//                 const tokens = await fetch('https://oauth2.googleapis.com/token', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                     body: new URLSearchParams({
//                         code: codeResponse.code,
//                         client_id: GOOGLE_CLIENT_ID,
//                         client_secret: GOOGLE_CLIENT_SECRET,
//                         redirect_uri: GOOGLE_REDIRECT_URL,
//                         grant_type: 'authorization_code',
//                     }),
//                 });

//                 const tokenResponse = await tokens.json();

//                 // Extract and structure the desired data
//                 const userData = {
//                     provider: 'google',
//                     type: 'oauth',
//                     providerAccountId: tokenResponse.sub, // Extract from ID token (JWT)
//                     access_token: tokenResponse.access_token,
//                     expires_at: Date.now() + tokenResponse.expires_in * 1000, // Calculate expiry
//                     scope: tokenResponse.scope,
//                     token_type: tokenResponse.token_type,
//                     id_token: tokenResponse.id_token,
//                 };

//                 setUser(userData);
//             } catch (error) {
//                 console.error('Error during token exchange:', error);
//             }
//         },
//         onError: (error) => {
//             console.error('Login error:', error);
//         }
//     });

//     useEffect(() => {
//         if (!user) return;

//         (async function () {
//             try {
//                 let response;

//                 if (mode == "login") {
//                     response = await signinWithGoogle({ token: user?.id_token }).unwrap();
//                 }
//                 else {
//                     response = await signUpWithGoogle({ token: user?.id_token }).unwrap();
//                 }

//                 if (response.statusCode === 400) {
//                     setGoogleErrorMessage(response.message);
//                     return;
//                 }

//                 const email = getEmailFromJWT(user.id_token);

//                 if (!response || !response.result) return;

//                 if (response.result?.isProfileUpdatedForAuthUsers === false) {
//                     navigate(NAVIGATION.LOGIN_PROFILE_UPDATE, {
//                         state: { userId: response.result?.user }
//                     });
//                     return;
//                 }

//                 // Validate BVN | NIN
//                 if (response?.result?.isBVNVerified == 1) {
//                     setVerificationOpen(response.result?.user);
//                     return;
//                 }

//                 dispatch(AuthSliceActions.setUserDetails({
//                     token: response.result.jwt,
//                     isSecurityQuestionSet: response.result.isSecurityQuestionSet,
//                     isPinSet: response.result.isPinSet,
//                     isCouponViewed: response.result.isCouponViewed,
//                     isUsersFirst100: response.result.isUsersFirst100,
//                     email,
//                     signUpCouponExpiryDate: response.result.signUpCouponExpiryDate,
//                     isPinLocked: response.result.isPinLocked
//                 }));

//                 navigate(NAVIGATION.VALIDATE_OTP, { state: { response, email, userId: response.result.user } })
//             } catch (error) {
//                 const errorData = getErrorMessage(error);
//                 setGoogleErrorMessage(errorData);
//             }
//         })();
//     }, [user]);

//     return {
//         googleLogin,
//         isGoogleProfileLoading: isGoogleProfileLoginLoading || isGoogleProfileSignUpLoading,
//         isGoogleProfileError: isGoogleProfileLoginError || isGoogleProfileSignUpError,
//         GoogleProfileError: GoogleProfileLoginError || GoogleProfileErrorSignUp,
//         isGoogleProfileSuccess: isGoogleProfileLoginSuccess || isGoogleProfileSignUpSuccess
//     };
// };

// // if (response?.result?.isPinSet !== true) {
// //     navigate(NAVIGATION.PIN_SETUP, {
// //         state: { jwt: response?.result?.jwt }
// //     });
// //     return;
// // }
import type { GoogleSigninRequest, GoogleSigninResponse, SignInRequest, SignInResponse, SignOutRequest, SignOutResponse, SignupRequest, SignupResponse } from "../../../lib/auth/authLib";
import { emptySplitApi } from "../api";

export const authApi = emptySplitApi.injectEndpoints({
    
    // Define your endpoints to the server
    endpoints: (builder) => ({
        googleSignin: builder.mutation<GoogleSigninResponse, GoogleSigninRequest>({
            query: (credentials) => ({
                method: 'POST',
                url: `auth/google/`,
                body: credentials
            }),
        }),

        // googleSignup: builder.mutation<GoogleSigninResponse, GoogleSigninRequest>({
        //     query: (credentials) => ({
        //         method: 'POST',
        //         url: `User/UserManager/google_auth_sign_up`,
        //         body: credentials
        //     }),
        // }),

        // Verify OTP sent to user
        // verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
        //     query: (credentials) => ({
        //         url: 'User/UserManager/verify_email_address',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // // Verify OTP sent to user
        // validateOtp: builder.mutation<ValidaOtpResponse, ValidateOtpRequest>({
        //     query: (credentials) => ({
        //         url: 'User/PasswordReset/verify_otp',
        //         method: 'POST',
        //         body: {
        //             otp: credentials.data.otp
        //         },
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${credentials.token}`,
        //         },
        //     }),
        // }),

        signin: builder.mutation<SignInResponse, SignInRequest>({
            query: (credentials) => ({
                url: 'login/',
                method: 'POST',
                body: credentials,
            }),
        }),

        signout: builder.mutation<SignOutResponse, SignOutRequest>({
            query: (credentials) => ({
                url: 'logout/',
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (credentials) => ({
                url: 'register/',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
})

export const { useSigninMutation, useSignupMutation, useSignoutMutation, useGoogleSigninMutation  } = authApi;
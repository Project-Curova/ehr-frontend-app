import type { SignInRequest, SignInResponse, SignupRequest, SignupResponse } from "../../../lib/auth/authLib";
import { emptySplitApi } from "../api";

export const authApi = emptySplitApi.injectEndpoints({
    
    // Define your endpoints to the server
    endpoints: (builder) => ({
        // googleSignin: builder.mutation<GoogleSigninResponse, GoogleSigninRequest>({
        //     query: (credentials) => ({
        //         method: 'POST',
        //         url: `User/UserManager/google_auth_sign_in`,
        //         body: credentials
        //     }),
        // }),

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
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),

        // updateOauthProfile: builder.mutation<UpdateOauthUserResponse, UpdateOauthUserRequest>({
        //     query: (credentials) => ({
        //         url: 'User/UserManager/update_user',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),


        // resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
        //     query: (credentials) => ({
        //         url: 'User/UserManager/resend_otp',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // resendBVNOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
        //     query: (credentials) => ({
        //         url: 'User/Verification/resend_bvn_otp',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
        //     query: (credentials) => ({
        //         url: 'User/PasswordReset/forgot_password',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
        //     query: (credentials) => ({
        //         url: 'User/PasswordReset/change_password',
        //         method: 'POST',
        //         body: {
        //             newPassword: credentials.data.newPassword,
        //             confirmPassword: credentials.data.confirmPassword
        //         },
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${credentials.token}`,
        //         },
        //     }),
        // }),

        // kycVerification: builder.mutation<KycVerificationResponse, kycVerificationRequest>({
        //     query: (credentials) => ({
        //         url: 'User/Verification/verification',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // kycOTPVerification: builder.mutation<KycOTPVerificationResponse, KycOTPVerificationRequest>({
        //     query: (credentials) => ({
        //         url: 'User/Verification/bvn-otp-verification',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // // Verify OTP sent to user
        // verifyPin: builder.mutation<VerifyPinResponse, VerifyPinRequest>({
        //     query: (credentials) => ({
        //         url: 'User/Pin/enter_pin',
        //         method: 'POST',
        //         body: credentials,
        //     }),
        // }),

        // setPin: builder.mutation<SetPinResponse, SetPinRequest>({
        //     query: (credentials) => ({
        //         url: 'User/Pin/set_pin',
        //         method: 'POST',
        //         body: {
        //             createPin: credentials.createPin,
        //             reEnterPin: credentials.reEnterPin
        //         },
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${credentials.jwt}`,
        //         },
        //     }),
        // })
    })
})

export const { useSigninMutation, useSignupMutation,  } = authApi;
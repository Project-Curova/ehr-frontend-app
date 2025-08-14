import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define type to set User Email
type UserTokenType = {
    token: string | null;
    isSecurityQuestionSet: boolean | null
    signUpCouponExpiryDate: null | Date,
    email: string | null
    "isPinSet": boolean | null
    "isUsersFirst100": boolean | null,
    "isCouponViewed": boolean | null,
    "isUserOAuth": boolean | null,
    "user": string | null,
    sessionExpired: boolean | null
    isPinLocked: boolean | null
}

// // Define the type for the auth state
type AuthStateType = {
    "$id": string | null,
    "jwt": string | null,
    "user": string | null,
    "email": string | null
    "isSecurityQuestionSet": boolean | null,
    signUpCouponExpiryDate: null | Date,
    "isPinSet": boolean | null,
    "isUsersFirst100": boolean | null,
    "isCouponViewed": boolean | null
    "isUserOAuth": boolean | null,
    sessionExpired: boolean | null,
    isPinLocked: boolean | null
}

const initialState: AuthStateType = {
    "$id": null,
    "jwt": null,
    "user": null,
    email: null,
    "isSecurityQuestionSet": null,
    signUpCouponExpiryDate: null,
    "isPinSet": null,
    "isUsersFirst100": null,
    "isCouponViewed": null,
    isUserOAuth: null,
    sessionExpired: null,
    isPinLocked: null
}

// Create the Auth Slice
const AuthSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        // Set user token
        setUserDetails: (state, action: PayloadAction<Partial<UserTokenType>>) => {
            const { token, isSecurityQuestionSet, isPinSet, isCouponViewed, isUsersFirst100, email, isUserOAuth, user, signUpCouponExpiryDate, sessionExpired, isPinLocked } = action.payload
            if (token) state.jwt = token
            if (isSecurityQuestionSet !== undefined) state.isSecurityQuestionSet = isSecurityQuestionSet
            if (isPinSet !== undefined) state.isPinSet = isPinSet
            if (isCouponViewed !== undefined) state.isCouponViewed = isCouponViewed
            if (isUsersFirst100 !== undefined) state.isUsersFirst100 = isUsersFirst100
            if (email !== undefined) state.email = email
            if (isUserOAuth !== undefined) state.isUserOAuth = isUserOAuth
            if (user !== undefined) state.user = user
            if (signUpCouponExpiryDate) state.signUpCouponExpiryDate = signUpCouponExpiryDate
            if (sessionExpired) state.sessionExpired = sessionExpired
            if (isPinLocked) state.isPinLocked = isPinLocked
        },

        // Set user /admin state to null, all protected routes will redirect to login pages
        logout: () => {
            return initialState
        },

        lockUserPin: (state) => {
            state.isPinLocked = true
        },

        expireSession: (state) => {
            state.sessionExpired = true
        },

        resetSession: (state) => {
            state.sessionExpired = null
        },

        setCouponViewed: (state) => {
            state.isCouponViewed = true
        }
    },
});

// Export Slice Reducer
export const AuthSliceReducer = AuthSlice.reducer;

// Export Auth Slice Actions
export const AuthSliceActions = AuthSlice.actions;
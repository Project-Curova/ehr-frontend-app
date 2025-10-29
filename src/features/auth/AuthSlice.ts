import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SIGN_UP_TYPE } from "../../lib/definitions";

// Define type to set User Email
// type UserTokenType = {
//     token: string | null;
//     email: string | null
// }

// Define the type for the auth state
type AuthStateType = {
    "id": string | null,
    "token": string | null,
    "refresh": string | null,
    "user": string | null,
    "email": string | null,
    type: SIGN_UP_TYPE | null
}

const initialState: AuthStateType = {
    "id": null,
    "token": null,
    "refresh": null,
    "user": null,
    email: null,
    type: null,
}

// Create the Auth Slice
const AuthSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        // Set user token
        setUserDetails: (state, action: PayloadAction<Partial<AuthStateType>>) => {
            const { token, email, user, type, refresh } = action.payload
            if (refresh) state.refresh = refresh;
            if (token) state.token = token
            if (email !== undefined) state.email = email
            if (user !== undefined) state.user = user
            if (type !== undefined) state.type = type
        },

        // Set user /admin state to null, all protected routes will redirect to login pages
        logout: () => {
            return initialState
        },

        // lockUserPin: (state) => {
        //     state.isPinLocked = true
        // },

        // expireSession: (state) => {
        //     state.sessionExpired = true
        // },

        // resetSession: (state) => {
        //     state.sessionExpired = null
        // },

        // setCouponViewed: (state) => {
        //     state.isCouponViewed = true
        // }
    },
});

// Export Slice Reducer
export const AuthSliceReducer = AuthSlice.reducer;

// Export Auth Slice Actions
export const AuthSliceActions = AuthSlice.actions;
// jshint esversion:6
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// define type of initial state
type InitialStateType = {
    fullname: string,
    username: string,
    email: string,
    state: string,
    country: string,
    // dateOfBirth: Date | undefined,
    password: string
}

// Define the initial state
const initialState: InitialStateType = {
    fullname: "",
    username: "",
    email: "",
    state: "",
    country: "",
    // dateOfBirth: undefined,
    password: "",
}

// Create the slice
const registerUserSlice = createSlice({
    name: "register",

    initialState,

    reducers: {
        setFormData: ((state, action: PayloadAction<InitialStateType>) => {
            const { email, fullname, username, state: userState, country, password, } = action.payload;
            state.fullname = fullname
            state.username = username
            state.email = email;
            state.state = userState;
            state.password = password;
            state.country = country;
        }),

        // Set Email for password reset
        // setFormEmail: ((state, action: PayloadAction<string>) => {
        //     state.email = action.payload;
        // }),

        clearFormData: (() => {
            return initialState;
        })
    },
})

// Export Slice actions
export const registerUserSliceMethods = registerUserSlice.actions;

// Export Slice reducer
export const registerUserSliceReducer = registerUserSlice.reducer;

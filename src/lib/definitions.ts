import type { CSSProperties } from "react";

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || "";
export const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL || "";

export const MOBILE_CONSTRAINT = 1023;

export const APP_BASE_URL = "https://project-curova-2.onrender.com/userapi/";

export enum NAVIGATION {
    HOME = "/",

     /*************************** Login Routes ********************************************/
    LOGIN = "/login",
    ADMIN_LOGIN = "/login/admin",
    SIGNUP = "/signup",
    // VERIFY_EMAIL = `${LOGIN}/verify-email`,
    // VERIFY_OTP = `${LOGIN}/verify`,
    // VALIDATE_OTP = `${LOGIN}/validate`,
    FORGOT_PASSWORD = `${LOGIN}/authgen`,
    APPOINTMENTS = `/appointments`,
    PRESCRIPTIONS = `/prescriptions`,
    RECORDS = `/records`,
    BILLING = `/bill`,
    // PASSWORD_RESET = `${LOGIN}/reset`,
    // LOGIN_PROFILE_UPDATE = `${LOGIN}/update`,
    // LOGOUT = "/logout",
    // AUTHGEN = `${LOGIN}/authgen`,
    // AUTHVAL = `${LOGIN}/authval`,
    // PIN_SETUP = `${LOGIN}/pin`
}

export const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


export const MAX_DESKTOP_WIDTH =  900;
export const PAGE_PADDING_INLINE = 20;

export type MEDICATION = {
    name: string,
    dosage: string
}

export type SELECT_PHARMACY = {
    name: string,
    dist: string
}

export enum SIGN_UP_TYPE {
    H = "H",
    S = "S",
    P = "P"
}
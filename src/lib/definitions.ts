import type { CSSProperties } from "react";

export const MOBILE_CONSTRAINT = 1023;

export enum NAVIGATION {
    HOME = "/",

     /*************************** Login Routes ********************************************/
    LOGIN = "/login",
    SIGNUP = "/signup",
    // VERIFY_EMAIL = `${LOGIN}/verify-email`,
    // VERIFY_OTP = `${LOGIN}/verify`,
    // VALIDATE_OTP = `${LOGIN}/validate`,
    FORGOT_PASSWORD = `${LOGIN}/authgen`,
    APPOINTMENTS = `/appointments`
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
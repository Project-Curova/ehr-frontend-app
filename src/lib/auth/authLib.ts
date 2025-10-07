import { z } from "zod";
import type { SIGN_UP_TYPE } from "../definitions";

export const LoginSchema = z.object({
    password: z.string().min(1, "Password is required"),
    username: z.string().min(1, "Username is required"),
})

export const PatentDetailSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    dob: z.string().min(1, "Date of Birth"),
    phoneNumber: z.string().min(1, "Phone number"),
    symptoms: z.string().min(1, "Enter any symptom"),
    insurance: z.string().min(1, "Enter your Insurance provider"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string({ message: "Email is required", }).email({ message: "Invalid email address" }),
    acceptTerms: z.boolean(),
})


export const SignUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    fullname: z.string().min(1, "Fullname is required"),
    email: z.string({ message: "Email is required", }).email({ message: "Invalid email address" }),
    // dob: z.string().min(1, "Date of Birth"),
    state: z.string().min(1, "Enter your state"),
    country: z.string().min(1, "Enter your country"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
    password: z.string()
        .min(6, "Password must be at least 8 characters long")
    // .regex(/[^a-zA-Z0-9]/, "Password must contain at least one non-alphanumeric character")
    // .regex(/\d/, "Password must contain at least one digit")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
})
    .refine((data) => {
        return data.password === data.confirmPassword
    }, { message: "Passwords do not match", path: ["confirmPassword"] })

// Extract inferred type from schema
export type PatientDetailFormData = z.infer<typeof PatentDetailSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;

// Extract inferred type from schema
export type SignUpFormData = z.infer<typeof SignUpSchema>;

// Sign up request type 
export type SignupRequest = {
    full_name: string,
    username: string,
    email: string,
    dob: string,
    state: string,
    country: string,
    type: SIGN_UP_TYPE,
    password: string,
    is_superuser: boolean,
    is_staff: boolean
}


// Sign up response type
export type SignupResponse = {
    status: number,
    data: {
        id: string,
        success: boolean,
        message: string,
        statusCode: number,
        result: null | unknown
    }
}

export type SignInRequest = {
    username: string,
    password: string
}

export type SignInResponse = {
    password: string
    usernane: string
    tokens: string
}

export type SignOutRequest = {
    refresh: string
}

export type SignOutResponse = {
    status: number,
    data: {
        id: string,
        success: boolean,
        message: string,
        statusCode: number,
        result: null | unknown
    }
}
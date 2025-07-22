import { z } from "zod";

export const LoginSchema = z.object({
    password: z.string().min(1, "Password is required"),
    email: z.string({ required_error: "Email is required", }).email({ message: "Invalid email address" }),
})

export const PatentDetailSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    dob: z.string().min(1, "Date of Birth"),
    phoneNumber: z.string().min(1, "Phone number"),
    symptoms: z.string().min(1, "Enter any symptom"),
    insurance: z.string().min(1, "Enter your Insurance provider"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string({ required_error: "Email is required", }).email({ message: "Invalid email address" }),
    acceptTerms: z.boolean(),
})

// Extract inferred type from schema
export type PatientDetailFormData = z.infer<typeof PatentDetailSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
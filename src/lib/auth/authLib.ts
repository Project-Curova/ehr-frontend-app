import { z } from "zod";

export const LoginSchema = z.object({
    password: z.string().min(1, "Password is required"),
    email: z.string({ required_error: "Email is required", }).email({ message: "Invalid email address" }),
})


// Extract inferred type from schema
export type LoginFormData = z.infer<typeof LoginSchema>;
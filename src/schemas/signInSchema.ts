import z from "zod";

export const signInSchema = z.object({
        email: z.string('Email must be a string').email('Invalid Email').toLowerCase()
})
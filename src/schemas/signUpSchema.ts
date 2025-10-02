import z from "zod";

export const signUpSchema = z.object({
        name: z.string().min(2, 'name must have 2 caracters minimum').max(30, 'name must have 30 caracters minimum'),
        email: z.string().email('invalid email').toLowerCase()
})
import z from "zod";

export const useOtpSchema = z.object({
    id: z.string(),
    code: z.string().length(6, 'code must have 6 caracters')
})
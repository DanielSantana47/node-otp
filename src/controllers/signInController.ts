import { RequestHandler } from "express";
import z from "zod";
import { getUserByEmail } from "../services/user";

export const signIn: RequestHandler = async (req, res)=> {
    const { email } = req.body

    const signInSchema = z.object({
        email: z.string('Email must be a string').email('Invalid Email')
    })

    const data = signInSchema.safeParse(email)

    if (!data.success) {
        res.status(400).json({error: data.error.issues[0].message})
        return false
    }

    const user = await getUserByEmail(email)

    if (!user) {
        res.status(400).json({error: 'User not found'})
        return false
    }

    
}
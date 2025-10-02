import { RequestHandler } from "express";
import { createUser, getUserByEmail } from "../services/user";
import { generateOtp, validateOtp } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { signInSchema } from "../schemas/signInSchema";
import { signUpSchema } from "../schemas/signUpSchema";
import { useOtpSchema } from "../schemas/useOtpSchema";
import { createJwt } from "../libs/jwt";

export const signIn: RequestHandler = async (req, res)=> {
    const { email } = req.body

    const data = signInSchema.safeParse({email})

    if (!data.success) {
        res.status(400).json({error: data.error.issues[0].message})
        return false
    }

    const user = await getUserByEmail(email)

    if (!user) {
        res.status(400).json({error: 'User not found'})
        return false
    }

    const otp = await generateOtp(user.id)

    await sendEmail(
        user.email,
        'Código de acesso',
        'seu código de acesso é ' + otp.code
    )

    res.status(201).json({id: otp.id})
}

export const signUp:RequestHandler = async (req, res)=> {
    const {name, email} = req.body

    const data = signUpSchema.safeParse({name, email})

    if (!data.success) {
        res.status(400).json({error: data.error.issues[0].message})
        return false
    }

    const user = await getUserByEmail(data.data.email)

    if (user) {
        res.status(400).json({error: 'This email is already in use'})
        return false
    }

    const newUser = await createUser(data.data.name, data.data.email)

    res.status(201).json({newUser})
}

export const useOtp: RequestHandler = async (req, res)=> {
    const {id, code} = req.body

    const data = useOtpSchema.safeParse({id, code})

    if (!data.success) {
        res.status(400).json({error: data.error.issues[0].message})
        return false
    }

    const user = await validateOtp(data.data.id, data.data.code)

    if (!user) {
        res.status(400).json({error: 'Invalid or expired OTP'})
        return false
    }
    
    const jwt = createJwt(user.id)

    res.status(201).json({jwt, user})
}
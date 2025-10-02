import { v4 } from "uuid"
import { prisma } from "../libs/prisma"

export const generateOtp = async (userId: number)=> {
    let otpArray = [] as number[]

    for (let n = 0; n < 6; n++) {
        otpArray.push(Math.floor(Math.random() * 9))
    }

    const code = otpArray.join('')
    let expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30)

    const otp = await prisma.otp.create({
        data: {
            id: v4(),
            code,
            userId,
            expiresAt
        }
    })

    return otp
}

export const validateOtp = async (id: string, code: string)=> {
    const otp = await prisma.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id,
            code,
            expiresAt: {
                gt: new Date()
            },
            used: false,
        }
    })

    if (!otp || !otp.user) return false

    await prisma.otp.update({
        where: {
            id, code
        },
        data: {
            used: true
        }
    })

    return otp.user
}
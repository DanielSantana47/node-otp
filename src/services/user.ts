import { prisma } from "../libs/prisma"

export const getUserByEmail = async (email: string)=> {
    return await prisma.user.findFirst({where: {email}})
}

export const getUserById = async (id: number) => {
    return await prisma.user.findFirst({where: {id}})
}

export const createUser = async (name: string, email: string)=> {
    return await prisma.user.create({
        data: {
            name,
            email
        }
    })
}
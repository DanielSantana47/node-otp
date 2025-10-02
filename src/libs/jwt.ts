import jwt from "jsonwebtoken"
import { ExtendedRequest } from "../types/ExtendedRequest"
import { NextFunction, Response } from "express"

export const createJwt = (id: number)=> {
    return jwt.sign({id}, process.env.JWT_TOKEN as string)
}

export const validateJwt = (req: ExtendedRequest, res: Response, next: NextFunction)=> {

    const auth = req.headers['authorization']

    if (!auth) {
        res.status(401).json({error: 'Access forbidden'})
        return false
    }

    const token = auth.split(' ')[1]

    jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        (error, decoded: any)=> {
            if (error) {
                res.status(401).json({error: 'Access forbidden'})
                return false
            }
            req.userId = decoded.id
            next()
        }
    )

}
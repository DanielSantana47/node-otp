import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/ExtendedRequest";
import { getUserById } from "../services/user";

export const privateRoute = async (req: ExtendedRequest, res: Response)=> {
    if (!req.userId) {
        res.status(401).json({error: 'Access forbidden'})
        return false
    }

    const user = await getUserById(req.userId)

    if (!user) {
        res.status(401).json({error: 'Access forbidden'})
        return false
    }

    res.status(200).json({user})
}
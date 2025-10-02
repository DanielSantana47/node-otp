import { Router } from "express";
import * as pingController from '../controllers/pingController'
import * as authController from '../controllers/authController'
import * as privateController from '../controllers/privateController'
import { validateJwt } from "../libs/jwt";

export const mainRouter = Router()

mainRouter.get('/ping', pingController.ping)
mainRouter.post('/signin', authController.signIn)
mainRouter.post('/signup', authController.signUp)
mainRouter.post('/useotp', authController.useOtp)
mainRouter.get('/private', validateJwt, privateController.privateRoute)
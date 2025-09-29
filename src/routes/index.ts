import { Router } from "express";
import * as pingController from '../controllers/pingController'

export const mainRouter = Router()

mainRouter.get('/ping', pingController.ping)
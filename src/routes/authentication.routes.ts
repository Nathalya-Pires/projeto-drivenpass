import { validateBody } from "../middlewares/validation.middleware.js";
import { signIn } from "../controllers/authentication.controller.js";
import { Router } from "express";
import { signInSchema } from "../schemas/authentication.schemas.js";


const authenticationRouter = Router();


authenticationRouter.post('/sign-in', validateBody(signInSchema), signIn);

export default authenticationRouter;
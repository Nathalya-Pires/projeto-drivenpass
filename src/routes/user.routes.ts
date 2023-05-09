import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { UserSchema } from "../schemas/user.schemas.js";
import { validateBody } from "../middlewares/validation.middleware.js";


const user = Router();

user.post('/sign-up', validateBody(UserSchema), signUp);

export default user;
import Joi from 'joi';
import { NewUserParams } from "../services/user.service/index.js";

export const UserSchema = Joi.object<NewUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

import Joi from 'joi';
import { SignInParams } from '../services/authentication.service/index.js';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

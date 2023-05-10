import Joi from 'joi';
import { CreateCredentialParams } from "../services/credential.service/index.js";

export const credentialSchema = Joi.object<CreateCredentialParams>({
    title: Joi.string().required(),
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});
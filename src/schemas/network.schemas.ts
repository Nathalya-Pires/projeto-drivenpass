import Joi from 'joi';
import { CreateNetworkParams } from "../services/network.service/index.js";

export const networkSchema = Joi.object<CreateNetworkParams >({
    title: Joi.string().required(),
    network: Joi.string().required(),
    password: Joi.string().required()
})
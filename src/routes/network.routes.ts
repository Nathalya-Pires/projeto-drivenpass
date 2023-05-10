import { networkPost, deleteNetwork, getNetworks, getNetworksById } from "../controllers/network.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware.js";
import { networkSchema } from "../schemas/network.schemas.js";


const networkRouter = Router();


networkRouter
    .all('/network*', authenticateToken)
    .post('/network', validateBody(networkSchema), networkPost)
    .get('/network', getNetworks)
    .get('/network/:id', getNetworksById)
    .delete('/network/:id', deleteNetwork)
export default networkRouter;
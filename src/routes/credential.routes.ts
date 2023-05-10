import { credentialPost, getCredentials } from "../controllers/credential.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware.js";
import { credentialSchema } from "../schemas/credential.schemas.js";


const credentialRouter = Router();


credentialRouter
    .all('/credential*', authenticateToken)
    .post('/credential', validateBody(credentialSchema), credentialPost)
    .get('/credential', getCredentials);

export default credentialRouter;
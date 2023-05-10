import httpStatus from 'http-status';
import { Response } from 'express';
import credentialService, { CreateCredentialParams } from "../services/credential.service/index.js";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware.js";


export async function credentialPost(req: AuthenticatedRequest, res: Response) {
    const { title, url, username, password } = req.body as CreateCredentialParams;
    const { userId } = req;
  
    try {
      const newcredential = await credentialService.CreateNewCredential({ userId, title, url, username, password });
      return res.status(httpStatus.CREATED).json({
        credentialId: newcredential.id,
      });
    } catch (error) {
        return res.status(httpStatus.CONFLICT).send(error);
      }
      
    }
  
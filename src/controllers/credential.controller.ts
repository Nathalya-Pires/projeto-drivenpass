import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import credentialService, { CreateCredentialParams } from "../services/credential.service/index.js";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware.js";

export async function credentialPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { title, url, username, password } = req.body as CreateCredentialParams;
    const { userId } = req;
  
    try {
      await credentialService.CreateNewCredential({ userId, title, url, username, password });
      return res.sendStatus(httpStatus.CREATED);
    } catch (err) {
        next(err);
      }
      
}

export async function getCredentials(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const {userId} = req;

  try {
    const list = await credentialService.allCredentials(userId);
    return res.status(httpStatus.OK).send(list);
  } catch (err) {
    next(err);
  }

}

export async function getCredentialsById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const listId = await credentialService.listById(userId, parseInt(id));
    return res.status(httpStatus.OK).send(listId);

  } catch (err) {
    next(err);
  }
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { id } = req.params;

  try {
    await credentialService.DeleteById(userId, parseInt(id));
    return res.sendStatus(httpStatus.ACCEPTED);
  } catch (err) {
    next(err);
  }
}
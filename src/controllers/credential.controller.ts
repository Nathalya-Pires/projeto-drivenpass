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

export async function getCredentials(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;

  try {
    const list = await credentialService.allCredentials(userId);
    return res.status(httpStatus.OK).send(list);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }

}

export async function getCredentialsById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const listId = await credentialService.listById(userId, parseInt(id));
    return res.status(httpStatus.OK).send(listId);

  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;

  try {
    await credentialService.DeleteById(userId, parseInt(id));
    return res.sendStatus(httpStatus.ACCEPTED);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
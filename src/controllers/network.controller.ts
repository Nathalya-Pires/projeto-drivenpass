import httpStatus from 'http-status';
import { Response } from 'express';
import networkService, { CreateNetworkParams } from "../services/network.service/index.js";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware.js";


export async function networkPost(req: AuthenticatedRequest, res: Response) {
    const { title, network, password } = req.body as CreateNetworkParams;
    const { userId } = req;
  
    try {
      await networkService.CreateNewNetwork({ userId, title, network, password });
      return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        return res.status(httpStatus.CONFLICT).send(error);
      }
      
}

export async function getNetworks(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;

  try {
    const list = await networkService.allNetworks(userId);
    return res.status(httpStatus.OK).send(list);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }

}

export async function getNetworksById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const listId = await networkService.listById(userId, parseInt(id));
    return res.status(httpStatus.OK).send(listId);

  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;

  try {
    await networkService.DeleteById(userId, parseInt(id));
    return res.sendStatus(httpStatus.ACCEPTED);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
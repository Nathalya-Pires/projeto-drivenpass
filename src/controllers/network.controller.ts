import httpStatus from 'http-status';
import {  NextFunction, Response } from 'express';
import networkService, { CreateNetworkParams } from "../services/network.service/index.js";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware.js";


export async function networkPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { title, network, password } = req.body as CreateNetworkParams;
    const { userId } = req;
  
    try {
      await networkService.CreateNewNetwork({ userId, title, network, password });
      return res.sendStatus(httpStatus.CREATED);
    } catch (err) {
        next(err);
      }
      
}

export async function getNetworks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const {userId} = req;

  try {
    const list = await networkService.allNetworks(userId);
    return res.status(httpStatus.OK).send(list);
  } catch (err) {
    next(err);
  }

}

export async function getNetworksById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const listId = await networkService.listById(userId, parseInt(id));
    return res.status(httpStatus.OK).send(listId);

  } catch (err) {
    next(err);
  }
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { id } = req.params;

  try {
    await networkService.DeleteById(userId, parseInt(id));
    return res.sendStatus(httpStatus.ACCEPTED);
  } catch (err) {
    next(err);
  }
}
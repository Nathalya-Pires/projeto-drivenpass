import { Network } from "@prisma/client";
import { cryptrUtil } from "../../utils/crypt.utils.js";
import networkRepository from "../../repositories/network.repository/index.js";
import { notFoundError } from "../../errors/not.found.error.js";

async function CreateNewNetwork({ userId, title, network, password,
}: CreateNetworkParams): Promise<Network> {

    const encryptPassword = cryptrUtil.encrypt(password);
    return networkRepository.newNetwork({
        userId,
        title,
        network,
        password: encryptPassword,
    });
}

async function allNetworks(userId: number) {
  const list = await networkRepository.listAllNetworks(userId);
  if (list.length === 0) {
    throw notFoundError();
  }

  list.map((c) => (c.password = cryptrUtil.decrypt(c.password)));
    return list;
}

async function listById(userId: number, id: number) {
  const networkId = await networkRepository.networkById(id);
  if (!networkId || networkId.userId !== userId) {
    throw notFoundError();
  }

  networkId.password = cryptrUtil.decrypt(networkId.password);
  return networkId;
}

async function DeleteById(userId: number, id: number) {
  const networkId = await networkRepository.networkById(id);
  if (!networkId || networkId.userId !== userId) {
    throw notFoundError();
  }

  await networkRepository.deleteNetwork(id);
  return
}

export type CreateNetworkParams = Pick<Network, 'userId' | 'title' | 'network' | 'password'>;

const networkService = {
    CreateNewNetwork,
    allNetworks,
    listById,
    DeleteById
}

export default networkService;
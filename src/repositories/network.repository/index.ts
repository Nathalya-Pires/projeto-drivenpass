import prisma from "../../configs/database.js";
import { Prisma } from "@prisma/client";

async function newNetwork(data: Prisma.NetworkUncheckedCreateInput) {
    return prisma.network.create({
    data,
    });
};

async function findByTitle(userId: number, title: string) {
    return prisma.network.findFirst({
        where: {
        userId,
        title,
        },
    });
}

async function listAllNetworks(userId: number) {
    return prisma.network.findMany({
        where: {
            userId,
        }
    });
}

async function networkById(id: number) {
    return prisma.network.findUnique ({
        where: {
        id,
        },
    });
}

async function deleteNetwork(id: number) {
    return prisma.network.delete({
      where: {
        id
      },
    });
}


const networkRepository = {
    newNetwork,
    findByTitle,
    listAllNetworks,
    networkById,
    deleteNetwork
}

export default networkRepository;
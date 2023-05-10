import prisma from "../../configs/database.js";
import { Prisma } from "@prisma/client";

async function newCredential(data: Prisma.CredentialUncheckedCreateInput) {
    return prisma.credential.create({
    data,
    });
};

async function findByTitle(userId: number, title: string) {
    return prisma.credential.findFirst({
        where: {
        userId,
        title,
        },
    });
}

async function listAllCredentials(userId: number) {
    return prisma.credential.findMany({
        where: {
            userId,
        }
    });
}

async function credentialById(id: number) {
    return prisma.credential.findUnique ({
        where: {
        id,
        },
    });
}

async function deleteCredential(id: number) {
    return prisma.credential.delete({
      where: {
        id
      },
    });
}


const credentialRepository = {
    newCredential,
    findByTitle,
    listAllCredentials,
    credentialById,
    deleteCredential
}

export default credentialRepository;
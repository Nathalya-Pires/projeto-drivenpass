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


const credentialRepository = {
    newCredential,
    findByTitle,
}

export default credentialRepository;
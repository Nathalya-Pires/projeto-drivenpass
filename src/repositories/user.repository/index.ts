import { Prisma } from "@prisma/client";
import prisma from "../../configs/database.js";


async function findByEmail(email: string) {
    console.log("FIND")
    return prisma.user.findUnique({
        where: {
            email,
        },
    });    
}

async function create(data:Prisma.UserCreateInput) {
    return prisma.user.create({
        data,
    })
}

const userRepository = {
    findByEmail,
    create,
}

export default userRepository;
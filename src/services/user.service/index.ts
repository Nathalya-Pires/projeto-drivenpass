import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../../repositories/user.repository/index.js";
import { duplicatedEmailError } from "./errors.js";

export async function newUser({email, password }: NewUserParams): Promise<User> {
    
    await checkUniqueEmailOrFail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.create({
        email,
        password: hashedPassword,
    });
}

async function checkUniqueEmailOrFail(email: string) {
    const duplicateEmail = await userRepository.findByEmail(email);
    if (duplicateEmail) {
      throw duplicatedEmailError();
    }
  }

  export type NewUserParams = Pick<User, 'email' | 'password'>;

  const userService = {
    newUser,
  };

  export default userService;
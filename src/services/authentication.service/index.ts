import { User } from "@prisma/client";
import userRepository from "../../repositories/user.repository/index.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { exclude } from "../../utils/prisma.utils.js"
import { invalidCredentialsError } from "./errors.js";

async function signIn(params:SignInParams): Promise<SignInResult>{
    const { email, password } = params;
  
    const user = await getUser(email);

    await validatePassword(password, user.password);
  
    const token = await createSession(user.id);
  
    return {
      user: exclude(user, 'password'),
      token,
    };
}

async function getUser(email: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) throw invalidCredentialsError();
    
    return user;
}

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      
    return token;
}
  
async function validatePassword(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
    user: Pick<User, 'id' | 'email'>;
    token: string;
};
  
const authenticationService = {
    signIn,
};
  
export default authenticationService;

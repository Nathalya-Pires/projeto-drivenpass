import { Credential } from "@prisma/client";
import { cryptrUtil } from "../../utils/crypt.utils.js";
import credentialRepository from "../../repositories/credential.repository/index.js";
import { CredentialTitleError } from "../../errors/credential.title.error.js";

async function CreateNewCredential({ userId, title, url, username, password,
}: CreateCredentialParams): Promise<Credential> {
    await TitleIsUnique(userId, title);

    const encryptPassword = cryptrUtil.encrypt(password);
    return credentialRepository.newCredential({
        userId,
        title,
        url,
        username,
        password: encryptPassword,
    });
}

async function TitleIsUnique(userId: number, title: string) {
    const duplicatedTitle = await credentialRepository.findByTitle(userId, title);
    if (duplicatedTitle) {
      throw CredentialTitleError();
    }
  }



export type CreateCredentialParams = Pick<Credential, 'userId' | 'title' | 'url' | 'username' | 'password'>;



const credentialService = {
    CreateNewCredential,
}

export default credentialService;
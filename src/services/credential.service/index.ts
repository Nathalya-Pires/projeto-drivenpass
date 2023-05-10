import { Credential } from "@prisma/client";
import { cryptrUtil } from "../../utils/crypt.utils.js";
import credentialRepository from "../../repositories/credential.repository/index.js";
import { CredentialTitleError } from "../../errors/credential.title.error.js";
import { notFoundError } from "../../errors/not.found.error.js";

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

async function allCredentials(userId: number) {
  const list = await credentialRepository.listAllCredentials(userId);
  if (list.length === 0) {
    throw notFoundError();
  }

  list.map((c) => (c.password = cryptrUtil.decrypt(c.password)));
    return list;
}

export type CreateCredentialParams = Pick<Credential, 'userId' | 'title' | 'url' | 'username' | 'password'>;



const credentialService = {
    CreateNewCredential,
    allCredentials,
}

export default credentialService;
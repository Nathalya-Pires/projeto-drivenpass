import { ApplicationError } from '../protocols.js';

export function CredentialTitleError(): ApplicationError {
  return {
    name: 'CredentialTitleError',
    message: 'A Credential with this title already exists',
  };
}
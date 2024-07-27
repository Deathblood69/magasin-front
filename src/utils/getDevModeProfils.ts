import type {CredentialsInterface} from '~/types/credentials'

/**
 * Récupère la liste des profils en mode dev
 * Pour la connexion developpeur
 */
export function getDevModeProfils() {
  return [
    {
      username: 'd.dev',
      password: 'Azerty!123456',
    },
  ] satisfies CredentialsInterface[]
}

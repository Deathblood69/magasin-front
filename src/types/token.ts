export interface TokenInterface {
  username: string
  roles: Array<string>
  iat?: number
  exp?: number
}

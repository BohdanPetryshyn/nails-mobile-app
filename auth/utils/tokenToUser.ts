import { Role, User } from '../entities/user';

export function tokenToUser(accessToken: string): User {
  return {
    firstName: 'mock',
    lastName: 'mock',
    role: Role.MASTER,
  };
}

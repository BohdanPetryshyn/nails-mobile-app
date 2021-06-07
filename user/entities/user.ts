import { LoginData } from '../../auth/entities/LoginData';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface User {
  loginData: LoginData;

  role?: Role;
}

export class UserUtils {
  static indexByEmail<T extends User>(users: T[]): Map<string, T> {
    return new Map(users.map(user => [user.loginData.email, user]));
  }
}

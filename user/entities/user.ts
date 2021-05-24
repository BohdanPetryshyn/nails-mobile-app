import { LoginData } from '../../auth/entities/LoginData';

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface User {
  loginData: LoginData;

  role?: Role;
}

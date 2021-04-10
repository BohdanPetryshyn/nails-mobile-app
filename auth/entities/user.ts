export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

export interface User {
  readonly firstName: string;
  readonly lastName: string;
  readonly role: Role;
}

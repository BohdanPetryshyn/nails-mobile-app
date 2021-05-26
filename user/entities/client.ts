import { Role, User } from './user';
import { ClientData } from './client-data';

export interface Client extends User {
  clientData: ClientData;
}

export class ClientUtils {
  static isClient(user: User): user is Client {
    return user.role === Role.CLIENT;
  }
}

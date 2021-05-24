import { User } from './user';
import { ClientData } from './client-data';

export interface Client extends User {
  clientData: ClientData;
}

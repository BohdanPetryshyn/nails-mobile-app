import { Exclude } from 'class-transformer';
import { UserData, UserDataConstructorParams } from './user-data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ClientDataConstructorParams extends UserDataConstructorParams {}

@Exclude()
export class ClientData extends UserData {
  constructor({ city, bio }: ClientDataConstructorParams) {
    super({ city, bio });
  }
}
import { Exclude } from 'class-transformer';
import { UserData, UserDataConstructorParams } from './user-data';

type MasterDataConstructorParams = UserDataConstructorParams;

@Exclude()
export class MasterData extends UserData {
  constructor({ city, bio }: MasterDataConstructorParams) {
    super({ city, bio });
  }
}

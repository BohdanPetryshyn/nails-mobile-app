import { Exclude, Expose } from 'class-transformer';
import { UserData, UserDataConstructorParams } from './user-data';
import { IsNotEmpty, IsString } from 'class-validator';

interface MasterDataConstructorParams extends UserDataConstructorParams {
  address: string;
}

@Exclude()
export class MasterData extends UserData {
  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  constructor({ city, bio, address }: MasterDataConstructorParams) {
    super({ city, bio });
    this.address = address;
  }
}

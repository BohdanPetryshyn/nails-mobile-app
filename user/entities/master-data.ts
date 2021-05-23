import { Exclude, Expose, Type } from 'class-transformer';
import { UserData, UserDataConstructorParams } from './user-data';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Service } from './service';

interface MasterDataConstructorParams extends UserDataConstructorParams {
  address: string;
  services: Service[];
}

@Exclude()
export class MasterData extends UserData {
  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Expose()
  @Type(() => Service)
  @ValidateNested()
  services: Service[];

  constructor({
    city,
    bio,
    profilePhoto,
    address,
    services,
  }: MasterDataConstructorParams) {
    super({ city, bio, profilePhoto });
    this.address = address;
    this.services = services;
  }
}

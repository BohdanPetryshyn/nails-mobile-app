import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { City } from './city';

export interface UserDataConstructorParams {
  city: City;
  bio: string;
}

@Exclude()
export class UserData {
  @Expose()
  @IsEnum(City)
  city: City;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bio: string;

  constructor({ city, bio }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
  }
}

import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { City } from './city';

export interface UserDataConstructorParams {
  city: City;
  bio?: string;
  profilePhoto: string;
}

@Exclude()
export class UserData {
  @Expose()
  @IsEnum(City)
  city: City;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @Expose()
  @IsUrl()
  profilePhoto: string;

  constructor({ city, bio, profilePhoto }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
  }
}

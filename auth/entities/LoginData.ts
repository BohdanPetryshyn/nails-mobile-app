import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export interface LoginDataConstructorParams {
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  locale: string;
  profilePhoto: string;
}

@Exclude()
export class LoginData {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsOptional()
  gender?: string;

  @Expose()
  @IsLocale()
  locale: string;

  @Expose()
  @IsUrl()
  profilePhoto: string;

  constructor({
    email,
    firstName,
    lastName,
    gender,
    locale,
    profilePhoto,
  }: LoginDataConstructorParams) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.locale = locale;
    this.profilePhoto = profilePhoto;
  }
}

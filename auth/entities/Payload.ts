import { classToPlain, Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsLocale, IsOptional } from 'class-validator';
import jwtDecode from 'jwt-decode';

interface PayloadConstructorParams {
  role?: Role;
  email: string;
  locale: string;
}

export enum Role {
  CLIENT = 'CLIENT',
  MASTER = 'MASTER',
}

@Exclude()
export class Payload {
  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsLocale()
  locale: string;

  constructor({ role, email, locale }: PayloadConstructorParams) {
    this.role = role;
    this.email = email;
    this.locale = locale;
  }

  static fromAccessToken(accessToken: string): Payload {
    const payload = jwtDecode(accessToken) as PayloadConstructorParams;

    return new Payload(payload);
  }

  toPlain(): Payload {
    return classToPlain(this) as Payload;
  }
}

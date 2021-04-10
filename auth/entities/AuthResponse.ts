import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import instantiateAndValidate from '../../common/validation/instantiate-and-validate';

@Exclude()
export class AuthResponse {
  @Expose()
  @IsNotEmpty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  static fromPlain(plain: AuthResponse) {
    return instantiateAndValidate(AuthResponse, plain);
  }
}

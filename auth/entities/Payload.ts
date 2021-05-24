import jwtDecode from 'jwt-decode';
import { Role } from '../../user/entities/user';

export interface Payload {
  role?: Role;

  email: string;

  locale: string;
}

export class PayloadUtils {
  static fromAccessToken(accessToken: string): Payload {
    return jwtDecode(accessToken);
  }
}

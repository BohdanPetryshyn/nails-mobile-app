import authenticatedClient from '../../common/api/authenticatedClient';
import { LoginData } from '../entities/LoginData';

const BASE_PATH = '/auth';

export class AuthService {
  static async getMyLoginData(): Promise<LoginData> {
    const url = `${BASE_PATH}/my-login-data`;
    const userResponse = await authenticatedClient.get(url);

    return userResponse.data;
  }
}

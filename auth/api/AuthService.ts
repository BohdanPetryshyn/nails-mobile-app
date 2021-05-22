import authenticatedClient from '../../common/api/authenticatedClient';
import { LoginData } from '../entities/LoginData';

const BASE_PATH = '/auth';

export class AuthService {
  static async getMe(): Promise<LoginData> {
    const url = `${BASE_PATH}/me`;
    const userResponse = await authenticatedClient.get(url);

    return new LoginData(userResponse.data.loginData);
  }
}

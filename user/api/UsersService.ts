import authenticatedClient from '../../common/api/authenticatedClient';
import { User } from '../entities/user';

const BASE_PATH = '/users';

export class UsersService {
  static async getUser(): Promise<User> {
    const url = `${BASE_PATH}/me`;

    const userResponse = await authenticatedClient.get(url);

    return userResponse.data;
  }
}

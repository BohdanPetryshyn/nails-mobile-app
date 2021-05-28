import authenticatedClient from '../../common/api/authenticatedClient';
import { User } from '../entities/user';
import { UserData } from '../entities/user-data';

const BASE_PATH = '/users';

export class UsersService {
  static async getUser(): Promise<User> {
    const url = `${BASE_PATH}/me`;

    const userResponse = await authenticatedClient.get(url);

    return userResponse.data;
  }

  static async getUserData(email: string): Promise<UserData> {
    const url = `${BASE_PATH}/data/${email}`;

    const userDataResponse = await authenticatedClient.get(url);

    return userDataResponse.data;
  }
}

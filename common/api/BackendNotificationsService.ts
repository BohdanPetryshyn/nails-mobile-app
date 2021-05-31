import appClient from '../api/appClient';
import { withAccessToken } from './authenticatedClient';

const BASE_PATH = 'notifications';

export class BackendNotificationsService {
  static async subscribe(
    accessToken: string,
    pushToken: string,
  ): Promise<void> {
    const url = `${BASE_PATH}/subscribe`;

    await appClient.post(url, { pushToken }, withAccessToken(accessToken));
  }
}

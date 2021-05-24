import authenticatedClient from '../../common/api/authenticatedClient';
import { AuthResponse } from '../entities/AuthResponse';
import { ClientData } from '../../user/entities/client-data';
import { MasterData } from '../../user/entities/master-data';

const BASE_PATH = '/role';

export class RolesService {
  static async selectClientRole(userData: ClientData): Promise<AuthResponse> {
    const url = `${BASE_PATH}/select-client`;
    const response = await authenticatedClient.post(url, { userData });
    return response.data;
  }

  static async selectMasterRole(userData: MasterData): Promise<AuthResponse> {
    const url = `${BASE_PATH}/select-master`;
    const response = await authenticatedClient.post(url, { userData });
    return response.data;
  }
}

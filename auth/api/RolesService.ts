import authenticatedClient from '../../common/api/authenticatedClient';
import { AuthResponse } from '../entities/AuthResponse';
import { Role } from '../entities/Payload';
import { ClientData } from '../../user/entities/client-data';
import { MasterData } from '../../user/entities/master-data';

const BASE_PATH = '/role';

export async function selectRole(
  role: Role,
  userData: ClientData | MasterData,
): Promise<AuthResponse> {
  const url = `${BASE_PATH}/select`;
  const response = await authenticatedClient.post(url, { role, userData });
  return AuthResponse.fromPlain(response.data);
}

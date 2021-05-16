import authenticatedClient from '../../common/api/authenticatedClient';
import { AuthResponse } from '../entities/AuthResponse';
import { Role } from '../entities/Payload';

const BASE_PATH = '/role';

export async function selectRole(role: Role): Promise<AuthResponse> {
  const url = `${BASE_PATH}/select`;
  const response = await authenticatedClient.post(url, { role });
  return AuthResponse.fromPlain(response.data);
}

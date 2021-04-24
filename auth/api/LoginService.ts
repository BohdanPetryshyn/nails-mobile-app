import appClient from '../../common/api/appClient';
import { AuthResponse } from '../entities/AuthResponse';

const AUTH_BASE_PATH = '/login';

function withBasePath(subPath: string): string {
  return AUTH_BASE_PATH + subPath;
}

export async function loginWithGoogleAccessToken(
  accessToken: string,
): Promise<AuthResponse> {
  const url = withBasePath('/google');
  const response = await appClient.post(url, { accessToken });
  console.log('RESPONSE ', response);
  return AuthResponse.fromPlain(response.data);
}

import appClient from '../../common/api/appClient';
import { AuthResponse } from '../entities/AuthResponse';

const AUTH_BASE_PATH = '/auth';

function withBasePath(subPath: string): string {
  return AUTH_BASE_PATH + subPath;
}

export async function loginWithGoogleAccessToken(
  accessToken: string,
): Promise<AuthResponse> {
  const url = withBasePath('/google-login');
  const response = await appClient.post(url, { accessToken });
  return AuthResponse.fromPlain(response.data);
}

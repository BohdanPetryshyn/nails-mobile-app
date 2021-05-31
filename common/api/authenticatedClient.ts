import createAppClient from './createAppClient';
import { AxiosRequestConfig } from 'axios';
import { selectAccessToken } from '../../auth/store/slice';
import { store } from '../store/store';

const appClient = createAppClient();

export function withAccessToken(
  accessToken: string,
  config: AxiosRequestConfig = {},
): AxiosRequestConfig {
  return {
    ...config,
    headers: {
      ...config.headers,
      ['Authorization']: `Bearer ${accessToken}`,
    },
  };
}

function addAuthHeaderFromStore(
  config: AxiosRequestConfig,
): AxiosRequestConfig {
  const accessToken = selectAccessToken(store.getState());

  console.log('ACCESS_TOKEN', accessToken);

  if (!accessToken) {
    throw new Error(
      `Access tokes was not defined in store. AccessToken: ${accessToken}`,
    );
  }

  return withAccessToken(accessToken, config);
}

appClient.interceptors.request.use(addAuthHeaderFromStore);

export default appClient;

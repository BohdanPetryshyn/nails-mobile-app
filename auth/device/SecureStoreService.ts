import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_SECURE_STORE_KEY = 'ACCESS_TOKEN';

export class SecureStoreService {
  static getAccessToken() {
    return SecureStore.getItemAsync(ACCESS_TOKEN_SECURE_STORE_KEY);
  }

  static setAccessToken(accessToken: string) {
    return SecureStore.setItemAsync(ACCESS_TOKEN_SECURE_STORE_KEY, accessToken);
  }
}

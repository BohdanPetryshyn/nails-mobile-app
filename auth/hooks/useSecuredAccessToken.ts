import { useEffect, useState } from 'react';
import * as SecureStoreService from '../device/SecureStoreService';

export default function (): { ready: boolean; token: string | null } {
  const [ready, setReady] = useState(__DEV__);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const token = await SecureStoreService.getAccessToken();
      setReady(true);
      setToken(token);
    }

    __DEV__ || fetchToken();
  }, []);

  return { ready, token };
}

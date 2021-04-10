import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './common/store/store';
import useSecuredAccessToken from './auth/hooks/useSecuredAccessToken';
import { accessTokenReceived } from './auth/store/slice';

export default function App() {
  const colorScheme = useColorScheme();

  const cachedResourcesLoaded = useCachedResources();
  const accessToken = useSecuredAccessToken();

  const isLoadingComplete = cachedResourcesLoaded && accessToken.ready;

  if (!isLoadingComplete) {
    return null;
  } else {
    store.dispatch(accessTokenReceived({ accessToken: accessToken.token }));

    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

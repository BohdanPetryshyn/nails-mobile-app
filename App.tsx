import 'core-js/es7/reflect';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './common/store/store';
import useSecuredAccessToken from './auth/hooks/useSecuredAccessToken';
import { accessTokenReceived } from './auth/store/slice';
import { NotificationsService } from './common/device/NotificationsService';
import subscribeToMessages from './messages/store/subscriptions/subscribeToMessages';

export default function App() {
  const colorScheme = useColorScheme();

  const cachedResourcesLoaded = useCachedResources();
  const accessToken = useSecuredAccessToken();

  const isLoadingComplete = cachedResourcesLoaded && accessToken.ready;

  useEffect(() => subscribeToMessages(), []);

  useEffect(() => {
    if (isLoadingComplete) {
      store.dispatch(accessTokenReceived({ accessToken: accessToken.token }));
      accessToken.token &&
        NotificationsService.subscribeForNotifications(accessToken.token);
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Provider store={store}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}

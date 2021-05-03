import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Icon, Text } from '@ui-kitten/components';

import { useAppDispatch } from '../../common/store/hooks';
import loginWithGoogle from '../store/actions/loginWithGoogle';
import { LoginStackParamList } from '../navigation/types';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';

WebBrowser.maybeCompleteAuthSession();

export default function ({ navigation }: { navigation: NavigationProp }) {
  const dispatch = useAppDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '698921394069-pccjcjgp7iirh3127htoije5n8pknqk7.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    const optionalAccessToken = getAccessToken(response);
    if (optionalAccessToken) {
      console.log(optionalAccessToken);
      dispatch(loginWithGoogle(optionalAccessToken)).then(() => {
        return navigation.navigate('SelectRole');
      });
    }
  }, [response]);

  return (
    <SafeAreaLayout style={styles.container}>
      <Text style={styles.title} category="h1">
        AnyNails
      </Text>
      <Button
        size="large"
        onPress={() => promptAsync()}
        disabled={!request}
        accessoryLeft={props => <Icon name={'google'} {...props} />}
      >
        Sign in with Google
      </Button>
      <Text style={styles.licenceText}>
        Реєструючись, Ви підтверджуєте свою згоду на обробку персональних даних,
        а також підтверджуєте те, що ознайомились та погоджуєтесь з Угодою
        користувача та Згодою на збір та обробку персональних даних
      </Text>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 20,
  },
  licenceText: {
    textAlign: 'center',
  },
});

function getAccessToken(response: any): string | null {
  return (
    (response?.type == 'success' && response.authentication?.accessToken) ||
    null
  );
}

type NavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>;

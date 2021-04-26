import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../../components/Themed';
import { useAppDispatch } from '../../common/store/hooks';
import loginWithGoogle from '../store/actions/loginWithGoogle';
import { LoginStackParamList } from '../navigation/types';

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
    <View style={styles.container}>
      <Button title="Login" onPress={() => promptAsync()} disabled={!request} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

function getAccessToken(response: any): string | null {
  return (
    (response?.type == 'success' && response.authentication?.accessToken) ||
    null
  );
}

type NavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>;

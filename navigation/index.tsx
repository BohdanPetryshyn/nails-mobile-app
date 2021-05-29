import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { useAppSelector } from '../common/store/hooks';
import { selectIsLoggedIn } from '../auth/store/slice';
import { LoginNavigator } from '../auth/navigation/LoginNavigator';
import { RootStackParamList } from './types';
import NotFoundScreen from '../common/screens/NotFoundScreen';
import UserProfile from '../user/screens/UserProfile';
import Chat from '../messages/screens/Chat';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Chat" component={Chat} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

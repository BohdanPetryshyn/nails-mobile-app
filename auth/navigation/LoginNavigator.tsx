import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SelectRole from '../screens/SelectRole';
import { LoginStackParamList } from './types';
import FillUserData from '../screens/FillUserData';
import FillMasterData from '../screens/FillMasterData';

const Stack = createStackNavigator<LoginStackParamList>();

export function LoginNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'SelectRole'} component={SelectRole} />
      <Stack.Screen name={'FillUserData'} component={FillUserData} />
      <Stack.Screen name={'FillMasterData'} component={FillMasterData} />
    </Stack.Navigator>
  );
}

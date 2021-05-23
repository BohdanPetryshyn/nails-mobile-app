import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import Schedule from '../schedule/screens/Schedule';
import { BottomTabParamList } from './types';

const ScheduleIcon = (props: IconProps) => (
  <Icon {...props} name="calendar-outline" />
);

function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={{ paddingBottom: 20 }}
    >
      <BottomNavigationTab icon={ScheduleIcon} title="Розклад" />
    </BottomNavigation>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBar={BottomTabBar}>
      <BottomTab.Screen name="Schedule" component={Schedule} />
    </BottomTab.Navigator>
  );
}

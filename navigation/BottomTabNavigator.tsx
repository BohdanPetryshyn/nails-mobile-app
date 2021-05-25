import * as React from 'react';
import { useEffect } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import Schedule from '../schedule/screens/Schedule';
import { BottomTabParamList } from './types';
import { useAppDispatch } from '../common/store/hooks';
import fetchUser from '../user/store/acitons/fetchUser';

const ScheduleIcon = (props: IconProps) => (
  <Icon {...props} name="calendar-outline" />
);

const TAB_BAR_PADDING = 20;

function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={{ paddingBottom: TAB_BAR_PADDING }}
    >
      <BottomNavigationTab icon={ScheduleIcon} title="Розклад" />
    </BottomNavigation>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <BottomTab.Navigator tabBar={BottomTabBar}>
      <BottomTab.Screen name="Schedule" component={Schedule} />
    </BottomTab.Navigator>
  );
}

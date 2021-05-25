import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import Schedule from '../schedule/screens/Schedule';
import { BottomTabParamList } from './types';
import { useAppDispatch } from '../common/store/hooks';
import { useEffect } from 'react';
import fetchUser from '../user/store/acitons/fetchUser';
import { View } from 'react-native';

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

function bottomTabAware(screen: (props: any) => JSX.Element) {
  return (props: any) => {
    const bottomBarHeight = useBottomTabBarHeight();
    return (
      <View style={{ paddingBottom: bottomBarHeight + TAB_BAR_PADDING + 10 }}>
        {screen(props)}
      </View>
    );
  };
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <BottomTab.Navigator tabBar={BottomTabBar}>
      <BottomTab.Screen name="Schedule" component={bottomTabAware(Schedule)} />
    </BottomTab.Navigator>
  );
}

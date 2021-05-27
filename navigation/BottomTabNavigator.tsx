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
import { useSelector } from 'react-redux';
import { selectUserRole } from '../auth/store/slice';
import { Role } from '../user/entities/user';
import MasterSearch from '../master-search/screens/MasterSearch';

const ScheduleIcon = (props: IconProps) => (
  <Icon {...props} name="calendar-outline" />
);

const MasterSearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
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
      <BottomNavigationTab icon={MasterSearchIcon} title="Майстри" />
    </BottomNavigation>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <BottomTab.Navigator tabBar={BottomTabBar}>
      {userRole === Role.CLIENT ? (
        <>
          <BottomTab.Screen name="Schedule" component={Schedule} />
          <BottomTab.Screen name="MasterSearch" component={MasterSearch} />
        </>
      ) : (
        <BottomTab.Screen name="Schedule" component={Schedule} />
      )}
    </BottomTab.Navigator>
  );
}

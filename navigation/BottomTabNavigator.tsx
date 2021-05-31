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
import Chats from '../messages/screens/Chats';
import Photos from '../photos/screens/Photos';
import { selectUserData } from '../user/store/slice';
import ScreenLoader from '../common/components/ScreenLoader';

const tabIcon = (name: string) => (props: IconProps) => (
  <Icon {...props} name={name} />
);

interface TabProperties {
  iconName: string;
  title: string;
}

const TABS: Record<string, TabProperties> = {
  Schedule: {
    iconName: 'calendar-outline',
    title: 'Розклад',
  },
  Chats: {
    iconName: 'message-circle-outline',
    title: 'Повідомлення',
  },
  MasterSearch: {
    iconName: 'search-outline',
    title: 'Майстри',
  },
  Photos: {
    iconName: 'image-outline',
    title: 'Роботи',
  },
};

const TAB_BAR_PADDING = 20;

function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={{ paddingBottom: TAB_BAR_PADDING }}
    >
      {state.routeNames.map(routeName => (
        <BottomNavigationTab
          icon={tabIcon(TABS[routeName].iconName)}
          title={TABS[routeName].title}
          key={routeName}
        />
      ))}
    </BottomNavigation>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  const userRole = useSelector(selectUserRole);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user) return <ScreenLoader />;

  return (
    <BottomTab.Navigator tabBar={BottomTabBar}>
      {userRole === Role.CLIENT ? (
        <>
          <BottomTab.Screen name="MasterSearch" component={MasterSearch} />
          <BottomTab.Screen name="Photos" component={Photos} />
          <BottomTab.Screen name="Chats" component={Chats} />
        </>
      ) : (
        <>
          <BottomTab.Screen name="Schedule" component={Schedule} />
          <BottomTab.Screen name="Photos" component={Photos} />
          <BottomTab.Screen name="Chats" component={Chats} />
        </>
      )}
    </BottomTab.Navigator>
  );
}

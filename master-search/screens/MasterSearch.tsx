import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { FilterBlank, FilterUtils } from '../entities/Filter';
import { StyleSheet, View } from 'react-native';
import FilterSelect from '../components/FilterSelect';
import { Divider } from '@ui-kitten/components';
import MasterSearchResults from '../components/MasterSearchResults';
import { useAppSelector } from '../../common/store/hooks';
import { selectClientCity } from '../../user/store/slice';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabParamList, RootStackParamList } from '../../navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppointmentCreateRequest } from '../../user/entities/appointment';
import OrderSelect from '../components/OrderSelect';
import { Order } from '../entities/Order';

export default function ({ navigation }: { navigation: NavigationProp }) {
  const userCity = useAppSelector(selectClientCity);

  const [filter, setFilter] = useState<FilterBlank>({ city: userCity });
  const [order, setOrder] = useState<Order>(Order.DURATION_ASC);

  const navigateToMasterProfile = (createRequest: AppointmentCreateRequest) =>
    navigation.navigate('UserProfile', {
      email: createRequest.masterEmail,
      appointmentCreateRequest: createRequest,
    });

  return (
    <SafeAreaLayout style={styles.container}>
      <View style={styles.header}>
        <FilterSelect filter={filter} onFilterChange={setFilter} />
        <OrderSelect selectedOrder={order} onOrderChange={setOrder} />
      </View>
      <Divider />
      {FilterUtils.isFilled(filter) && (
        <MasterSearchResults
          filter={FilterUtils.toFilter(filter)}
          order={order}
          onMasterPress={navigateToMasterProfile}
        />
      )}
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-around',
  },
});

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'MasterSearch'>,
  StackNavigationProp<RootStackParamList>
>;

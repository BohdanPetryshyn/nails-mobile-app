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

export default function ({ navigation }: { navigation: NavigationProp }) {
  const userCity = useAppSelector(selectClientCity);

  const [filter, setFilter] = useState<FilterBlank>({ city: userCity });

  const navigateToMasterProfile = (createRequest: AppointmentCreateRequest) =>
    navigation.navigate('UserProfile', {
      email: createRequest.masterEmail,
      appointmentCreateRequest: createRequest,
    });

  return (
    <SafeAreaLayout style={styles.container}>
      <View style={styles.header}>
        <FilterSelect filter={filter} onFilterChange={setFilter} />
      </View>
      <Divider />
      {FilterUtils.isFilled(filter) && (
        <MasterSearchResults
          filter={FilterUtils.toFilter(filter)}
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
  },
});

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'MasterSearch'>,
  StackNavigationProp<RootStackParamList>
>;

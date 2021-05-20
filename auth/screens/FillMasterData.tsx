import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';

import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { LoginStackParamList } from '../navigation/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { useAppDispatch } from '../../common/store/hooks';
import { MasterData } from '../../user/entities/master-data';
import selectRole from '../store/actions/selectRole';
import { Role } from '../entities/Payload';
import { ServiceBlank } from '../components/ServiceInputGroup';
import MultipleServicesInputGroup from '../components/MultipleServicesInputGroup';

export default function ({ route }: { route: FillMasterDataRouteProp }) {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<string>();
  const [services, setServices] = useState<ServiceBlank[]>([
    new ServiceBlank({}),
  ]);

  const servicesFilled = () => {
    return !services.some(service => service.isNotFilled());
  };

  const masterDataFilled = () => {
    return Boolean(address) && servicesFilled();
  };

  const submit = () => {
    const masterData = new MasterData({
      ...route.params.userData,
      address: address!,
      services: services.map(service => service.toService()),
    });

    dispatch(selectRole(Role.MASTER, masterData));
  };

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text category="h5" style={styles.title}>
          Клієнти хотітимуть знати про вас більше...
        </Text>
        <View style={styles.inputsContainer}>
          <Input
            value={address}
            onChangeText={setAddress}
            label="Адреса"
            placeholder="Вкажіть адресу за якою ви приймаєте клієнтів"
            style={styles.input}
          />
          <MultipleServicesInputGroup
            services={services}
            onServicesChange={setServices}
            style={styles.input}
          />
          <Button
            onPress={submit}
            disabled={!masterDataFilled()}
            style={styles.submit}
          >
            Продовжити
          </Button>
        </View>
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginTop: 100,
  },
  inputsContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 100,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  submit: {
    width: '50%',
  },
});

type FillMasterDataRouteProp = RouteProp<LoginStackParamList, 'FillMasterData'>;

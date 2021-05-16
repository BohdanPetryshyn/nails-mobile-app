import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';

import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { LoginStackParamList } from '../navigation/types';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

export default function ({ route }: { route: FillMasterDataRouteProp }) {
  const [address, setAddress] = useState<string>();

  const masterDataFilled = () => {
    return Boolean(address);
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5">Клієнти хотітимуть знати про вас більше...</Text>
      <View style={styles.inputsContainer}>
        <Input
          value={address}
          onChangeText={setAddress}
          label="Адреса"
          placeholder="Вкажіть адресу за якою ви приймаєте клієнтів"
          style={styles.input}
        />
      </View>
      <Button disabled={!masterDataFilled()} style={styles.submit}>
        Продовжити
      </Button>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputsContainer: {
    width: '100%',
  },
  input: {
    margin: 10,
  },
  submit: {
    width: '50%',
  },
});

type FillMasterDataRouteProp = RouteProp<LoginStackParamList, 'FillMasterData'>;

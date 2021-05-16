import * as React from 'react';
import { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { StyleSheet, View } from 'react-native';
import CitySelect from '../components/CitySelect';
import { City } from '../../user/entities/city';

export default function () {
  const [city, setCity] = useState<City>();

  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5">Додайте деталей...</Text>
      <View style={styles.inputsContainer}>
        <CitySelect
          selectedCity={city}
          onCitySelect={setCity}
          label={'Місто'}
          placeholder={'Оберіть місто'}
          style={styles.input}
        />
      </View>
      <Button style={styles.submit}>Продовжити</Button>
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

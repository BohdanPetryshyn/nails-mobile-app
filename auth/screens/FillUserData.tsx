import * as React from 'react';
import { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { StyleSheet, View } from 'react-native';
import CitySelect from '../components/CitySelect';
import { City } from '../../user/entities/city';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '../navigation/types';
import { UserData } from '../../user/entities/user-data';
import { Role } from '../entities/Payload';

export default function ({
  navigation,
  route,
}: {
  navigation: NavigationProp;
  route: FillUserDataRouteProp;
}) {
  const [city, setCity] = useState<City>();

  const userDataFilled = () => {
    return Boolean(city);
  };

  const navigateToMasterDataFillScreenOrSubmit = () => {
    const userData = new UserData({ city: city! });
    if (route.params.userRole === Role.MASTER) {
      navigation.navigate('FillMasterData', { userData });
    }
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5">Додайте деталей...</Text>
      <View style={styles.inputsContainer}>
        <CitySelect
          selectedCity={city}
          onCitySelect={setCity}
          label="Місто"
          placeholder="Оберіть місто"
          style={styles.input}
        />
      </View>
      <Button
        onPress={navigateToMasterDataFillScreenOrSubmit}
        disabled={!userDataFilled()}
        style={styles.submit}
      >
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

type NavigationProp = StackNavigationProp<LoginStackParamList, 'FillUserData'>;
type FillUserDataRouteProp = RouteProp<LoginStackParamList, 'FillUserData'>;

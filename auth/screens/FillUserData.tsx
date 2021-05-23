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
import { useAppDispatch } from '../../common/store/hooks';
import selectRole from '../store/actions/selectRole';
import { ClientData } from '../../user/entities/client-data';
import useDefaultUserData from '../hooks/useDefaultUserData';
import ScreenLoader from '../../common/components/ScreenLoader';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker';

export default function ({
  navigation,
  route,
}: {
  navigation: NavigationProp;
  route: FillUserDataRouteProp;
}) {
  const dispatch = useAppDispatch();

  const [userDataBlank, setUserData] = useDefaultUserData();

  if (!userDataBlank) {
    return <ScreenLoader />;
  }

  const setCity = (city: City) => {
    setUserData(userDataBlank.withCity(city));
  };

  const setProfilePhoto = (profilePhoto: string) => {
    setUserData(userDataBlank.withProfilePhoto(profilePhoto));
  };

  const userDataFilled = () => {
    return userDataBlank.isFilled();
  };

  const navigateToMasterDataFillScreenOrSubmit = () => {
    const userData = userDataBlank.toUserData();
    const userRole = route.params.userRole;
    if (userRole === Role.MASTER) {
      navigation.navigate('FillMasterData', { userData });
    } else if (userRole === Role.CLIENT) {
      dispatch(selectRole(Role.CLIENT, new ClientData(userData)));
    }
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5">Додайте деталей...</Text>
      <View style={styles.inputsContainer}>
        <ProfilePhotoPicker
          photoUri={userDataBlank.profilePhoto}
          onPhotoUriChange={setProfilePhoto}
        />
        <CitySelect
          selectedCity={userDataBlank.city}
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

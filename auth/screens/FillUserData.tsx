import * as React from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { ScrollView, StyleSheet, View } from 'react-native';
import CitySelect from '../components/CitySelect';
import { City } from '../../user/entities/city';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '../navigation/types';
import { useAppDispatch } from '../../common/store/hooks';
import selectRole from '../store/actions/selectRole';
import useDefaultUserData from '../hooks/useDefaultUserData';
import ScreenLoader from '../../common/components/ScreenLoader';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker';
import { Role } from '../../user/entities/user';

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

  const setFirstName = (firstName: string) => {
    setUserData(userDataBlank.withFirstName(firstName));
  };

  const setLastName = (lastName: string) => {
    setUserData(userDataBlank.withLastName(lastName));
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
      dispatch(selectRole(Role.CLIENT, userData));
    }
  };

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsContainer}
      >
        <Text category="h5" style={styles.title}>
          Додайте деталей...
        </Text>
        <View style={styles.inputsContainer}>
          <ProfilePhotoPicker
            photoUri={userDataBlank.profilePhoto}
            onPhotoUriChange={setProfilePhoto}
          />
          <Input
            value={userDataBlank.firstName}
            onChangeText={setFirstName}
            label="Ім'я"
            placeholder="Ваше ім'я"
            style={styles.input}
          />
          <Input
            value={userDataBlank.lastName}
            onChangeText={setLastName}
            label="Прізвище"
            placeholder="Ваше прізвище"
            style={styles.input}
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
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
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
    margin: 10,
  },
  submit: {
    marginTop: 50,
    width: '50%',
  },
});

type NavigationProp = StackNavigationProp<LoginStackParamList, 'FillUserData'>;
type FillUserDataRouteProp = RouteProp<LoginStackParamList, 'FillUserData'>;

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { useAppSelector } from '../../common/store/hooks';
import { selectUserData } from '../store/slice';
import ProfilePhotoPicker from '../../auth/components/ProfilePhotoPicker';
import { Button, Input } from '@ui-kitten/components';
import CitySelect from '../../auth/components/CitySelect';
import { City } from '../entities/city';
import { MasterData, MasterDataUtils } from '../entities/master-data';
import { ClientData } from '../entities/client-data';
import MultipleServicesInputGroup from '../../auth/components/MultipleServicesInputGroup';
import { ServiceBlank } from '../../auth/components/ServiceInputGroup';
import { Service } from '../entities/service';
import { UserData } from '../entities/user-data';

export default function () {
  const [updatedUserData, setUpdatedUserData] = useState<
    UserData | ClientData | MasterData
  >(useAppSelector(selectUserData)!);

  const setCity = (city: City) => {
    setUpdatedUserData({ ...updatedUserData, city });
  };

  const setProfilePhoto = (profilePhoto: string) => {
    setUpdatedUserData({ ...updatedUserData, profilePhoto });
  };

  const setFirstName = (firstName: string) => {
    setUpdatedUserData({ ...updatedUserData, firstName });
  };

  const setLastName = (lastName: string) => {
    setUpdatedUserData({ ...updatedUserData, lastName });
  };

  const setBio = (bio: string) => {
    setUpdatedUserData({ ...updatedUserData, bio });
  };

  const setAddress = (address: string) => {
    setUpdatedUserData({ ...updatedUserData, address });
  };

  const setServices = (serviceBlanks: ServiceBlank[]) => {
    const services = serviceBlanks.map(serviceBlank =>
      serviceBlank.toService(),
    );
    setUpdatedUserData({
      ...updatedUserData,
      services,
    });
  };

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ProfilePhotoPicker
          photoUri={updatedUserData.profilePhoto}
          onPhotoUriChange={setProfilePhoto}
        />
        <Input
          value={updatedUserData.firstName}
          onChangeText={setFirstName}
          label="Ім'я"
          placeholder="Ваше ім'я"
          style={styles.input}
        />
        <Input
          value={updatedUserData.lastName}
          onChangeText={setLastName}
          label="Прізвище"
          placeholder="Ваше прізвище"
          style={styles.input}
        />
        <CitySelect
          selectedCity={updatedUserData.city}
          onCitySelect={setCity}
          label="Місто"
          placeholder="Оберіть місто"
          style={styles.input}
        />
        <Input
          value={updatedUserData.bio}
          onChangeText={setBio}
          label="Про себе"
          placeholder="Розкажіть про себе"
          multiline={true}
          style={styles.input}
          textStyle={styles.multiline}
        />
        {MasterDataUtils.isMasterData(updatedUserData) && (
          <>
            <Input
              value={updatedUserData.address}
              onChangeText={setAddress}
              label="Адреса"
              placeholder="Вкажіть адресу за якою ви приймаєте клієнтів"
              style={styles.input}
            />
            <MultipleServicesInputGroup
              services={updatedUserData.services.map(ServiceBlank.fromService)}
              onServicesChange={setServices}
              style={styles.input}
            />
          </>
        )}
        <Button style={styles.submit}>Зберегти</Button>
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 50,
  },
  input: {
    width: '100%',
    margin: 10,
  },
  multiline: {
    minHeight: 64,
  },
  submit: {
    marginTop: 50,
    marginBottom: 80,
    width: '50%',
  },
});

import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { UserData, UserDataUtils } from '../entities/user-data';
import { Avatar, Divider, Text } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import ScreenLoader from '../../common/components/ScreenLoader';
import { MasterDataUtils } from '../entities/master-data';
import LabeledText from '../components/LabeledText';
import { UsersService } from '../api/UsersService';
import CreateAppointmentButton from '../components/CreateAppointmentButton';
import StartConversationButton from '../components/StartConversationButton';
import { StackNavigationProp } from '@react-navigation/stack';

export default function ({
  route,
  navigation,
}: {
  route: FillMasterDataRouteProp;
  navigation: NavigationProp;
}) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const { email, appointmentCreateRequest } = route.params;

  useEffect(() => {
    async function fetchUser() {
      setUserData(undefined);
      const userData = await UsersService.getUserData(email);

      setUserData(userData);
    }
    fetchUser();
  }, [email]);

  if (!userData) {
    return <ScreenLoader />;
  }

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Avatar
          source={{ uri: userData?.profilePhoto }}
          style={styles.profilePhoto}
        />

        <Text category="h5">{UserDataUtils.getFullName(userData)}</Text>
        {MasterDataUtils.isMasterData(userData) && (
          <Text>{userData.address}</Text>
        )}
        <Divider />

        {appointmentCreateRequest && (
          <View style={styles.masterActions}>
            <CreateAppointmentButton createRequest={appointmentCreateRequest} />
            <StartConversationButton
              chatPreview={{
                toEmail: email,
                toFullName: UserDataUtils.getFullName(userData),
                toProfilePhoto: userData.profilePhoto,
              }}
              navigation={navigation}
            />
          </View>
        )}

        <View style={styles.additionalInfo}>
          <LabeledText label="Про себе:" text={userData.bio} />
        </View>
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profilePhoto: {
    height: 200,
    width: 200,
    marginVertical: 50,
  },
  masterActions: {
    marginTop: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  additionalInfo: {
    marginTop: 50,
    marginHorizontal: 5,
  },
});

type FillMasterDataRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

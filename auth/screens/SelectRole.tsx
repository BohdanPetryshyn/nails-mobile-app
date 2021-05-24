import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonProps, Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../navigation/types';
import { Role } from '../../user/entities/user';

export default function ({ navigation }: { navigation: NavigationProp }) {
  const navigateToUserDataFillScreen = (userRole: Role) => {
    navigation.navigate('FillUserData', { userRole });
  };

  return (
    <SafeAreaLayout style={styles.detailsContainer}>
      <Text category="h5" style={styles.title}>
        Хто Ви?
      </Text>
      <View style={styles.optionsContainer}>
        <RoleButton onPress={() => navigateToUserDataFillScreen(Role.CLIENT)}>
          Клієнт
        </RoleButton>
        <RoleButton onPress={() => navigateToUserDataFillScreen(Role.MASTER)}>
          Майстер
        </RoleButton>
      </View>
    </SafeAreaLayout>
  );
}

const RoleButton: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <Button
      size="giant"
      appearance="outline"
      style={styles.button}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 100,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: { marginBottom: 15 },
  button: { margin: 10, width: '50%' },
});

type NavigationProp = StackNavigationProp<LoginStackParamList, 'SelectRole'>;

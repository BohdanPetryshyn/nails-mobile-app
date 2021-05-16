import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { RoleButton } from '../components/RoleButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../navigation/types';

export default function ({ navigation }: { navigation: NavigationProp }) {
  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5" style={styles.title}>
        Хто Ви?
      </Text>
      <View style={styles.optionsContainer}>
        <RoleButton text="Клієнт" />
        <RoleButton
          onPress={() => navigation.navigate('FillUserData')}
          text="Майстер"
        />
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

type NavigationProp = StackNavigationProp<LoginStackParamList, 'SelectRole'>;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { RoleButton } from '../components/RoleButton';
import { Role } from '../entities/Payload';

export default function () {
  return (
    <SafeAreaLayout style={styles.container}>
      <Text category="h5" status="primary" style={styles.text}>
        Хто Ви?
      </Text>
      <RoleButton role={Role.CLIENT} text="Клієнт" />
      <RoleButton role={Role.MASTER} text="Майстер" />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  text: { marginBottom: 15 },
});

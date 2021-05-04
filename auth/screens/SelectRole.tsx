import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import selectRole from '../store/actions/selectRole';
import { Role } from '../entities/User';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { RoleButton } from '../components/RoleButton';

export default function () {
  const dispatch = useDispatch();
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

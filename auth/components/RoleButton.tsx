import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '@ui-kitten/components';
import selectRole from '../store/actions/selectRole';
import { Role } from '../entities/Payload';

export function RoleButton({ role, text }: { role: Role; text: string }) {
  const dispatch = useDispatch();

  return (
    <Button
      size="giant"
      appearance="outline"
      onPress={() => dispatch(selectRole(role))}
      style={styles.button}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { margin: 10, width: '50%' },
});

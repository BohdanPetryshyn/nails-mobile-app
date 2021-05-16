import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from '@ui-kitten/components';

export function RoleButton({
  text,
  ...restButtonProps
}: {
  text: string;
} & ButtonProps) {
  return (
    <Button
      size="giant"
      appearance="outline"
      style={styles.button}
      {...restButtonProps}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { margin: 10, width: '50%' },
});

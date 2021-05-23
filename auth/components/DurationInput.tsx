import React from 'react';
import { Input, InputProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function ({
  duration,
  onDurationChange,
  ...inputProps
}: {
  duration?: number;
  onDurationChange: (duration: number) => void;
} & InputProps) {
  const value = duration ? String(duration) : '';
  const onChange = (duration: string) => {
    onDurationChange(Number(duration));
  };
  return (
    <Input
      value={value}
      onChangeText={onChange}
      keyboardType="number-pad"
      style={styles.input}
      {...inputProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 100,
  },
});

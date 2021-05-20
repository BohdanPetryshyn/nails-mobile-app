import React from 'react';
import { Input, InputProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function ({
  amount,
  onAmountChange,
  ...inputProps
}: {
  amount?: number;
  onAmountChange: (amount: number) => void;
} & InputProps) {
  const stringAmount = amount ? String(amount) : '';
  const onChange = (newAmount: string) => {
    onAmountChange(Number(newAmount));
  };
  return (
    <Input
      value={stringAmount}
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

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
  const stringAmount = (amount && centsToStringAmount(amount)) || undefined;
  const onChange = (value: string) => {
    onAmountChange(stringAmountToCents(value));
  };

  return (
    <Input
      value={stringAmount}
      onChangeText={onChange}
      keyboardType="decimal-pad"
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

function stringAmountToCents(value: string) {
  const [units, cents] = value.split(/[\.,]/);
  const centsNormalized = cents && cents.substring(0, 2);

  return Number(units) * 100 + Number(centsNormalized);
}

function centsToStringAmount(cents: number): string {
  const units = Math.floor(cents / 100);
  const resultCents = cents % (units * 100);

  return `${units}.${resultCents}`;
}

import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View } from 'react-native';
import { DatepickerProps, Text } from '@ui-kitten/components';

type Mode = 'date' | 'time' | 'datetime' | 'countdown';

export default function ({
  time,
  onTimeChange,
  label,
  mode = 'time',
  ...datePickerProps
}: {
  time?: Date;
  onTimeChange?: (date: Date) => void;
  label?: string;
  mode?: Mode;
} & DatepickerProps) {
  const value = time || new Date();
  const onChange = (event: unknown, date?: Date) =>
    date && onTimeChange && onTimeChange(date);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        {...datePickerProps}
        mode={mode}
        value={value}
        onChange={onChange}
        style={[styles.timePicker, datePickerProps.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  timePicker: {
    width: 70,
  },
});

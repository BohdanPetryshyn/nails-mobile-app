import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View } from 'react-native';
import { DatepickerProps, Text } from '@ui-kitten/components';

export default function ({
  time,
  onTimeChange,
  label,
  ...datePickerProps
}: {
  time?: Date;
  onTimeChange?: (date: Date) => void;
  label?: string;
} & DatepickerProps) {
  const value = time || new Date();
  const onChange = (event: unknown, date?: Date) =>
    date && onTimeChange && onTimeChange(date);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        mode={'time'}
        is24Hour={false}
        value={value}
        onChange={onChange}
        style={styles.timePicker}
        {...datePickerProps}
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

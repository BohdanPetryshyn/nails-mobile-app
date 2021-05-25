import React, { useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import {
  WorkingHours,
  WorkingHoursUtils,
} from '../../user/entities/working-hours';
import TimePicker from './TimePicker';
import { Button } from '@ui-kitten/components';

export default function ({
  day,
  onSubmit,
  ...viewProps
}: {
  day: Date;
  onSubmit: (workingHours: WorkingHours) => void;
} & ViewProps) {
  const [fromTime, setFromTime] = useState(
    WorkingHoursUtils.getDefaultFromTime(day),
  );
  const [toTime, setToTime] = useState(WorkingHoursUtils.getDefaultToTime(day));

  const onFormSubmit = () => {
    const workingHours = WorkingHoursUtils.fromDates(fromTime, toTime);
    onSubmit(workingHours);
  };

  return (
    <View {...viewProps}>
      <View style={styles.container}>
        <View style={styles.datesContainer}>
          <TimePicker time={fromTime} onTimeChange={setFromTime} label="Від:" />
          <TimePicker time={toTime} onTimeChange={setToTime} label="До:" />
        </View>
        <Button onPress={onFormSubmit} appearance="ghost" style={styles.submit}>
          Додати
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  datesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submit: {
    marginTop: 10,
  },
});

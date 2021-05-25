import React from 'react';
import { View } from 'react-native';
import { Appointment } from '../../user/entities/appointment';
import { WorkingHours } from '../../user/entities/working-hours';
import { Interval, IntervalUtils } from '../../user/entities/interval';

export default function ({
  workingHours,
  appointments,
}: {
  workingHours: WorkingHours;
  appointments: Appointment[];
}) {
  const intervals = IntervalUtils.toWorkingHoursIntervals(
    workingHours,
    appointments,
  );

  console.log('INTERVALS: ', intervals);

  const getRelativeHeight = (interval: Interval) => {
    const intervalDuration = IntervalUtils.getDurationMillis(interval);
    const dayDuration = IntervalUtils.getDurationMillis(workingHours);
    return intervalDuration / dayDuration;
  };

  return (
    <View style={{ flexGrow: 1 }}>
      {intervals.map((interval, index) => (
        <View style={{ flex: getRelativeHeight(interval) }} key={index} />
      ))}
    </View>
  );
}

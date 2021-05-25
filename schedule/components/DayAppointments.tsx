import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appointment, AppointmentUtils } from '../../user/entities/appointment';
import { WorkingHours } from '../../user/entities/working-hours';
import { Interval, IntervalUtils } from '../../user/entities/interval';
import AppointmentCard from './AppointmentCard';
import { Layout } from '@ui-kitten/components';

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

  const getRelativeHeight = (interval: Interval) => {
    const intervalDuration = IntervalUtils.getDurationMillis(interval);
    const dayDuration = IntervalUtils.getDurationMillis(workingHours);
    return intervalDuration / dayDuration;
  };

  return (
    <Layout level="2" style={{ flexGrow: 1 }}>
      {intervals.map((interval, index) =>
        AppointmentUtils.isAppointment(interval) ? (
          <AppointmentCard
            appointment={interval}
            style={{ ...styles.appointment, flex: getRelativeHeight(interval) }}
            key={index}
          />
        ) : (
          <View style={{ flex: getRelativeHeight(interval) }} key={index} />
        ),
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  appointment: {
    margin: 5,
  },
});

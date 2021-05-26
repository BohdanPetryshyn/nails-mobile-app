import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppointmentUtils } from '../../user/entities/appointment';
import { WorkingHours } from '../../user/entities/working-hours';
import { Interval, IntervalUtils } from '../../user/entities/interval';
import AppointmentCard from './AppointmentCard';
import { Layout } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../common/store/hooks';
import { selectDayAppointments } from '../store/slice';
import fetchDayAppointments from '../store/actions/fetchDayAppointments';
import ScreenLoader from '../../common/components/ScreenLoader';
import CreateAppointmentInterval from './CreateAppointmentInterval';

export default function ({
  day,
  workingHours,
}: {
  day: Date;
  workingHours: WorkingHours;
}) {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectDayAppointments(day));

  console.log('appointments: ', appointments);

  useEffect(() => {
    if (!appointments) {
      dispatch(fetchDayAppointments(day));
    }
  }, [day]);

  if (!appointments) {
    return <ScreenLoader />;
  }

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
          <CreateAppointmentInterval
            from={new Date(interval.from)}
            to={new Date(interval.to)}
            style={{ flex: getRelativeHeight(interval) }}
            key={index}
          />
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

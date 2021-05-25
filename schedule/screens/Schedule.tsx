import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import PopoverCalendar from '../components/PopoverCalendar';
import { useSelector } from 'react-redux';
import { selectDayWorkingHours } from '../store/slice';
import AddWorkingHoursBanner from '../components/AddWorkingHoursBanner';
import { WorkingHoursUtils } from '../../user/entities/working-hours';
import DayAppointments from '../components/DayAppointments';
import { ServiceType } from '../../user/entities/service-type';
import { StyleSheet } from 'react-native';

export default function () {
  const [selectedDay, setDay] = useState<Date>(
    WorkingHoursUtils.getStartOfDay(new Date()),
  );

  const selectedDayWorkingHours = useSelector(
    selectDayWorkingHours(selectedDay),
  );

  const appointments = [
    {
      ...WorkingHoursUtils.fromDates(
        new Date('2021-05-25T08:00:00Z'),
        new Date('2021-05-25T10:00:00Z'),
      ),
      clientFullName: 'Оксана Петришин',
      services: [
        ServiceType.REMOVAL,
        ServiceType.CLEANING,
        ServiceType.COATING,
      ],
      price: 800,
    },
    {
      ...WorkingHoursUtils.fromDates(
        new Date('2021-05-25T13:00:00Z'),
        new Date('2021-05-25T15:00:00Z'),
      ),
      clientFullName: 'Марія Вовк',
      services: [ServiceType.CLEANING, ServiceType.COATING],
      price: 600,
    },
    {
      ...WorkingHoursUtils.fromDates(
        new Date('2021-05-25T15:00:00Z'),
        new Date('2021-05-25T17:00:00Z'),
      ),
      clientFullName: 'Марія Вовк',
      services: [ServiceType.CLEANING, ServiceType.COATING],
      price: 600,
    },
  ];

  return (
    <SafeAreaLayout style={styles.container}>
      <PopoverCalendar date={selectedDay} onDateSelect={setDay} />
      {selectedDayWorkingHours ? (
        <DayAppointments
          workingHours={selectedDayWorkingHours}
          appointments={appointments}
        />
      ) : (
        <AddWorkingHoursBanner day={selectedDay} />
      )}
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import PopoverCalendar from '../components/PopoverCalendar';
import { useSelector } from 'react-redux';
import AddWorkingHoursBanner from '../components/AddWorkingHoursBanner';
import DayAppointments from '../components/DayAppointments';
import { StyleSheet } from 'react-native';
import { DateUtils } from '../../common/utils/DateUtils';
import { selectDayWorkingHours } from '../../user/store/slice';

export default function () {
  const [selectedDay, setDay] = useState<Date>(
    DateUtils.getStartOfDay(new Date()),
  );

  const selectedDayWorkingHours = useSelector(
    selectDayWorkingHours(selectedDay),
  );

  return (
    <SafeAreaLayout style={styles.container}>
      <PopoverCalendar date={selectedDay} onDateSelect={setDay} />
      {selectedDayWorkingHours ? (
        <DayAppointments
          day={selectedDay}
          workingHours={selectedDayWorkingHours}
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

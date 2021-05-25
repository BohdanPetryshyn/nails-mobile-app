import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import PopoverCalendar from '../components/PopoverCalendar';
import { useSelector } from 'react-redux';
import { selectDayWorkingHours } from '../store/slice';
import AddWorkingHoursBanner from '../components/AddWorkingHoursBanner';
import { WorkingHoursUtils } from '../../user/entities/working-hours';

export default function () {
  const [selectedDay, setDay] = useState<Date>(
    WorkingHoursUtils.getStartOfDay(new Date()),
  );

  const selectedDayWorkingHours = useSelector(
    selectDayWorkingHours(selectedDay),
  );

  return (
    <SafeAreaLayout>
      <PopoverCalendar date={selectedDay} onDateSelect={setDay} />
      {selectedDayWorkingHours ? null : (
        <AddWorkingHoursBanner day={selectedDay} />
      )}
    </SafeAreaLayout>
  );
}

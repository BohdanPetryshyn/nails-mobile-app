import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import PopoverCalendar from '../components/PopoverCalendar';

export default function () {
  const [selectedDate, setDate] = useState<Date>(new Date());

  return (
    <SafeAreaLayout>
      <PopoverCalendar date={selectedDate} onDateSelect={setDate} />
    </SafeAreaLayout>
  );
}

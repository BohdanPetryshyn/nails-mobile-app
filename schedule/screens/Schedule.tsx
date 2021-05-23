import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { Calendar } from '@ui-kitten/components';

export default function () {
  const [selectedDate, setDate] = useState<Date>(new Date());
  return (
    <SafeAreaLayout>
      <Calendar date={selectedDate} onSelect={setDate} />
    </SafeAreaLayout>
  );
}

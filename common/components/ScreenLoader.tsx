import React from 'react';
import { SafeAreaLayout } from './SafeAreaLayout';
import { Spinner } from '@ui-kitten/components';

export default function () {
  return (
    <SafeAreaLayout
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Spinner />
    </SafeAreaLayout>
  );
}

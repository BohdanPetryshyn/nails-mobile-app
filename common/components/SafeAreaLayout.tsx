import React from 'react';
import { FC } from 'react';
import { SafeAreaView, ViewProps } from 'react-native';
import { Layout } from '@ui-kitten/components';

export const SafeAreaLayout: FC<ViewProps> = props => {
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView {...props} />
    </Layout>
  );
};

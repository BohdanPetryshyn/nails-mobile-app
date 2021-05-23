import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default function ({ date }: { date: Date }) {
  return (
    <View style={styles.container}>
      <Text>Сьогодні ви не приймаєте клієнтів</Text>
      <Button appearance="ghost">Додати робоі години</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

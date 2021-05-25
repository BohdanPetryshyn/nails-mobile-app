import React, { useState } from 'react';
import { Button, Popover, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import AddWorkingHoursForm from './AddWorkingHoursForm';
import { useAppDispatch } from '../../common/store/hooks';
import addWorkingHours from '../store/actions/addWorkingHours';

export default function ({ day }: { day: Date }) {
  const dispatch = useAppDispatch();

  const [popoverVisible, setVisible] = useState(false);

  const renderAddWorkingHoursButton = () => (
    <Button size="large" appearance="ghost" onPress={() => setVisible(true)}>
      Додати робочі години
    </Button>
  );

  return (
    <View style={styles.container}>
      <Text category="h6">Сьогодні ви не приймаєте клієнтів</Text>
      <Popover
        visible={popoverVisible}
        anchor={renderAddWorkingHoursButton}
        onBackdropPress={() => setVisible(false)}
      >
        <AddWorkingHoursForm
          day={day}
          onSubmit={workingHours => dispatch(addWorkingHours(workingHours))}
          style={{ width: 250 }}
        />
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

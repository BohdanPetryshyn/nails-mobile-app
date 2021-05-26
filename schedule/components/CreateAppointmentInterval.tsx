import { StyleSheet, View, ViewProps } from 'react-native';
import React, { useState } from 'react';
import { Button, Popover } from '@ui-kitten/components';
import CreateAppointmentForm from './CreateAppointmentForm';
import { useAppDispatch } from '../../common/store/hooks';
import { addMasterAppointment } from '../store/actions/addAppointment';
import { useSelector } from 'react-redux';
import { selectMasterServices } from '../../user/store/slice';

export default function ({
  from,
  to,
  ...viewProps
}: { from: Date; to: Date } & ViewProps) {
  const dispatch = useAppDispatch();
  const masterServices = useSelector(selectMasterServices);

  const [formVisible, setFormVisible] = useState(false);

  const renderCreateButton = () => (
    <Button onPress={() => setFormVisible(true)} appearance="ghost">
      Створити запис
    </Button>
  );

  return (
    <View {...viewProps} style={[viewProps.style, styles.container]}>
      <Popover
        visible={formVisible}
        onBackdropPress={() => setFormVisible(false)}
        anchor={renderCreateButton}
      >
        <CreateAppointmentForm
          minFrom={from}
          maxTo={to}
          masterServices={masterServices!}
          onSubmit={appointment => dispatch(addMasterAppointment(appointment))}
        />
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

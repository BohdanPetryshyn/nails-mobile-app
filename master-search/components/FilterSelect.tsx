import React, { useState } from 'react';
import { Button, Layout, Popover } from '@ui-kitten/components';
import { FilterBlank } from '../entities/Filter';
import ServiceTypeSelect from '../../common/components/ServiceTypeSelect';
import { StyleSheet } from 'react-native';
import TimePicker from '../../common/components/TimePicker';
import { ServiceType } from '../../user/entities/service-type';

export default function ({
  filter,
  onFilterChange,
}: {
  filter: FilterBlank;
  onFilterChange: (filter: FilterBlank) => void;
}) {
  const [visible, setVisible] = useState(false);

  const onServicesChange = (services: ServiceType[]) =>
    onFilterChange({ ...filter, services });
  const onFromChange = (from: Date) => onFilterChange({ ...filter, from });

  const renderButton = () => (
    <Button onPress={() => setVisible(true)} size="giant" appearance="ghost">
      Фільтри
    </Button>
  );

  return (
    <Popover
      anchor={renderButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout level="2" style={styles.container}>
        <ServiceTypeSelect
          selectedServiceTypes={filter.services}
          onServiceTypesSelected={onServicesChange}
          multiSelect={true}
          label="Послуги"
          placeholder="Оберіть послуги"
          style={[styles.input, styles.servicesSelect]}
        />
        <TimePicker
          time={filter.from}
          onTimeChange={onFromChange}
          mode={'datetime'}
          label="Час візиту:"
          style={[styles.input, styles.timePicker]}
        />
      </Layout>
    </Popover>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  servicesSelect: {
    width: '100%',
  },
  timePicker: {
    width: 200,
  },
});

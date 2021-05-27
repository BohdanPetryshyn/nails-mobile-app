import React, { useState } from 'react';
import { Button, Layout, Popover } from '@ui-kitten/components';
import { Filter } from '../entities/Filter';
import ServiceTypeSelect from '../../common/components/ServiceTypeSelect';
import { StyleSheet } from 'react-native';

export default function ({
  filter,
  onFilterChange,
}: {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}) {
  const [visible, setVisible] = useState(false);

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
      <Layout style={styles.container}>
        <ServiceTypeSelect
          selectedServiceTypes={filter.services}
          onServiceTypesSelected={services => onFilterChange({ services })}
          multiSelect={true}
          label="Послуги"
          placeholder="Оберіть послуги"
        />
      </Layout>
    </Popover>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

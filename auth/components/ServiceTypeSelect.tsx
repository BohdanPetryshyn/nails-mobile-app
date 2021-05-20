import {
  SERVICE_TYPE_LABELS,
  ServiceType,
} from '../../user/entities/service-type';
import EnumSelect from './EnumSelect';
import React from 'react';
import { SelectProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function ({
  selectedServiceType,
  onServiceTypeSelected,
  ...selectProps
}: {
  selectedServiceType?: ServiceType;
  onServiceTypeSelected: (serviceType: ServiceType) => void;
} & SelectProps) {
  return (
    <EnumSelect
      selectedValue={selectedServiceType}
      onValueSelect={onServiceTypeSelected}
      enumValues={ServiceType}
      enumLabels={SERVICE_TYPE_LABELS}
      style={styles.select}
      {...selectProps}
    />
  );
}

const styles = StyleSheet.create({
  select: {
    width: 255,
  },
});

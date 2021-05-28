import {
  SERVICE_TYPE_LABELS,
  ServiceType,
} from '../../user/entities/service-type';
import React from 'react';
import { SelectProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import EnumSelect from '../../common/components/EnumSelect';

export default function ({
  selectedServiceType,
  selectedServiceTypes,
  onServiceTypeSelected,
  onServiceTypesSelected,
  ...selectProps
}: {
  selectedServiceType?: ServiceType;
  selectedServiceTypes?: ServiceType[];
  onServiceTypeSelected?: (serviceType: ServiceType) => void;
  onServiceTypesSelected?: (serviceTypes: ServiceType[]) => void;
} & SelectProps) {
  return (
    <EnumSelect
      {...selectProps}
      selectedValue={selectedServiceType}
      onValueSelect={onServiceTypeSelected}
      selectedValues={selectedServiceTypes}
      onValuesSelect={onServiceTypesSelected}
      enumValues={ServiceType}
      enumLabels={SERVICE_TYPE_LABELS}
      style={[styles.select, selectProps.style]}
    />
  );
}

const styles = StyleSheet.create({
  select: {
    width: 255,
  },
});

import React from 'react';
import { SelectProps } from '@ui-kitten/components';
import { City, CITY_LABELS } from '../../user/entities/city';
import EnumSelect from './EnumSelect';

export default function ({
  selectedCity,
  onCitySelect,
  ...selectProps
}: {
  selectedCity?: City;
  onCitySelect: (city: City) => void;
} & SelectProps) {
  return (
    <EnumSelect
      selectedValue={selectedCity}
      onValueSelect={onCitySelect}
      enumValues={City}
      enumLabels={CITY_LABELS}
      {...selectProps}
    />
  );
}

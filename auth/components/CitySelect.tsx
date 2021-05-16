import React from 'react';
import {
  IndexPath,
  Select,
  SelectItem,
  SelectProps,
} from '@ui-kitten/components';
import { City, CITY_LABELS } from '../../user/entities/city';

const CITIES = Object.values(City) as Array<City>;

const CITY_INDEXES = CITIES.reduce(
  (result, city, index) => ({ ...result, [city]: index }),
  {} as Record<City, number>,
);

function toIndexPath(city?: City): IndexPath | undefined {
  return city && new IndexPath(CITY_INDEXES[city]);
}

export default function ({
  selectedCity,
  onCitySelect,
  ...selectProps
}: {
  selectedCity?: City;
  onCitySelect: (city: City) => void;
} & SelectProps) {
  return (
    <Select
      selectedIndex={toIndexPath(selectedCity)}
      onSelect={index => onCitySelect(CITIES[(index as IndexPath).row])}
      value={selectedCity && CITY_LABELS[selectedCity]}
      {...selectProps}
    >
      {CITIES.map(city => (
        <SelectItem title={CITY_LABELS[city]} />
      ))}
    </Select>
  );
}

import React, { useMemo } from 'react';
import {
  IndexPath,
  Select,
  SelectItem,
  SelectProps,
} from '@ui-kitten/components';

export default function <
  T extends Record<string, V>,
  V extends string | number
>({
  selectedValue,
  onValueSelect,
  enumValues,
  enumLabels,
  ...selectProps
}: {
  selectedValue?: V;
  onValueSelect: (value: V) => void;
  enumValues: T;
  enumLabels: Record<V, string>;
} & SelectProps) {
  const VALUES = useMemo(() => Object.values(enumValues) as Array<V>, [
    enumValues,
  ]);
  const VALUE_INDEXES = useMemo(
    () =>
      VALUES.reduce(
        (result, value, index) => ({ ...result, [value]: index }),
        {} as Record<V, number>,
      ),
    [VALUES],
  );

  const toIndexPath = (value?: V) => {
    return value && new IndexPath(VALUE_INDEXES[value]);
  };

  return (
    <Select
      selectedIndex={toIndexPath(selectedValue)}
      onSelect={index => onValueSelect(VALUES[(index as IndexPath).row])}
      value={selectedValue && enumLabels[selectedValue]}
      {...selectProps}
    >
      {VALUES.map(value => (
        <SelectItem title={enumLabels[value]} key={value} />
      ))}
    </Select>
  );
}

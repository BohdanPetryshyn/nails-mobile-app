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
  selectedValues,
  onValuesSelect,
  enumValues,
  enumLabels,
  ...selectProps
}: {
  selectedValues?: V[];
  onValuesSelect?: (value: V[]) => void;
  selectedValue?: V;
  onValueSelect?: (value: V) => void;
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

  const toIndexPaths = (values: V[]) => {
    return values.map(value => new IndexPath(VALUE_INDEXES[value]));
  };

  const toLabels = (values: V[]) =>
    values.map(value => enumLabels[value]).join(', ');

  const toValues = (indexes: IndexPath[]) => {
    return indexes.map(index => VALUES[index.row]);
  };

  const selectedIndex = selectedValue && toIndexPaths([selectedValue])[0];
  const selectedIndexes = selectedValues && toIndexPaths(selectedValues);

  const selectedValueLabel = selectedValue && toLabels([selectedValue]);
  const selectedValueLabels = selectedValues && toLabels(selectedValues);

  const onSelect = (indexes: IndexPath | IndexPath[]) => {
    if (indexes instanceof IndexPath) {
      onValueSelect && onValueSelect(toValues([indexes])[0]);
    } else {
      onValuesSelect && onValuesSelect(toValues(indexes));
    }
  };

  return (
    <Select
      selectedIndex={selectedIndex || selectedIndexes}
      onSelect={onSelect}
      value={selectedValueLabel || selectedValueLabels}
      {...selectProps}
    >
      {VALUES.map(value => (
        <SelectItem title={enumLabels[value]} key={value} />
      ))}
    </Select>
  );
}

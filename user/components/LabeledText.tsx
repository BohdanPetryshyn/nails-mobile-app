import React from 'react';
import { Text, TextProps } from '@ui-kitten/components';
import { View, ViewProps } from 'react-native';

export default function ({
  label,
  text,
  textProps,
  ...viewProps
}: { label: string; text?: string; textProps?: TextProps } & ViewProps) {
  if (!text) {
    return null;
  }
  return (
    <View {...viewProps}>
      <Text>{label}</Text>
      <Text {...textProps}>{text}</Text>
    </View>
  );
}

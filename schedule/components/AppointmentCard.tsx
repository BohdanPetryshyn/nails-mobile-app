import React from 'react';
import { Appointment } from '../../user/entities/appointment';
import { Card, CardProps, Text } from '@ui-kitten/components';
import { SERVICE_TYPE_LABELS } from '../../user/entities/service-type';
import { View, ViewProps } from 'react-native';
import { DateUtils } from '../../common/utils/DateUtils';

function Header({
  name,
  from,
  to,
  ...viewProps
}: {
  name: string;
  from: string;
  to: string;
} & ViewProps) {
  const fromString = DateUtils.toLocalTimeString(new Date(from));
  const toString = DateUtils.toLocalTimeString(new Date(to));
  const timeString = `${fromString} - ${toString}`;

  return (
    <View {...viewProps}>
      <Text category="s1">{name}</Text>
      <Text>{timeString}</Text>
    </View>
  );
}

export default function ({
  appointment,
  ...cardProps
}: { appointment: Appointment } & CardProps) {
  const servicesString = appointment.services
    .map(service => SERVICE_TYPE_LABELS[service])
    .join(', ');
  const priceString = `₴${appointment.price}`;

  return (
    <Card
      header={props => (
        <Header
          name={appointment.clientFullName}
          from={appointment.from}
          to={appointment.to}
          {...props}
        />
      )}
      {...cardProps}
    >
      <Text category="s1">{servicesString}</Text>
      <Text>{priceString}</Text>
    </Card>
  );
}

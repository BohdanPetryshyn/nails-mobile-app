import React from 'react';
import { Appointment } from '../../user/entities/appointment';
import { Avatar, Button, Card, CardProps, Text } from '@ui-kitten/components';
import { View, ViewProps } from 'react-native';
import { DateUtils } from '../../common/utils/DateUtils';
import { MasterDataUtils } from '../../user/entities/master-data';
import { IntervalUtils } from '../../user/entities/interval';

function Header({
  appointment,
  onAppointmentDelete,
  ...viewProps
}: {
  appointment: Appointment;
  onAppointmentDelete: (day: string, appointmentId: string) => void;
} & ViewProps) {
  const fromString = DateUtils.toLocalTimeString(new Date(appointment.from));
  const toString = DateUtils.toLocalTimeString(new Date(appointment.to));
  const timeString = `${fromString} - ${toString}`;

  const onDeleteClick = () => {
    onAppointmentDelete(
      IntervalUtils.getDayString(appointment),
      appointment.id,
    );
  };

  return (
    <View
      {...viewProps}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}
    >
      <Avatar
        source={{ uri: appointment.clientProfilePhoto }}
        style={{ marginLeft: 25 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text category="s1">{appointment.clientFullName}</Text>
        <Text>{timeString}</Text>
      </View>
      <Button onPress={onDeleteClick} appearance="ghost">
        Скасувати
      </Button>
    </View>
  );
}

export default function ({
  appointment,
  onAppointmentDelete,
  ...cardProps
}: {
  appointment: Appointment;
  onAppointmentDelete: (day: string, appointmentId: string) => void;
} & CardProps) {
  const services = appointment.services.map(service => service.serviceType);
  const servicesString = MasterDataUtils.getServicesString(services);

  const priceString = MasterDataUtils.getPriceString(appointment.price);

  return (
    <Card
      header={props => (
        <Header
          appointment={appointment}
          onAppointmentDelete={onAppointmentDelete}
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

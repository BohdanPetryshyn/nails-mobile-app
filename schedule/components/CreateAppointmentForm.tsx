import React, { useState } from 'react';
import { ServiceType } from '../../user/entities/service-type';
import { Button, Input, Layout } from '@ui-kitten/components';
import { Service, ServiceUtils } from '../../user/entities/service';
import { StyleSheet, View } from 'react-native';
import { DateUtils } from '../../common/utils/DateUtils';
import ServiceTypeSelect from '../../common/components/ServiceTypeSelect';
import { MasterAppointmentCreateRequest } from '../store/actions/addAppointment';
import TimePicker from '../../common/components/TimePicker';

export default function ({
  minFrom,
  maxTo,
  onSubmit,
  masterServices,
}: {
  minFrom: Date;
  maxTo: Date;
  onSubmit: (appointment: MasterAppointmentCreateRequest) => void;
  masterServices: Service[];
}) {
  const [clientEmail, setClientEmail] = useState<string>();
  const [from, setFrom] = useState<Date>(minFrom);
  const [services, setServices] = useState<ServiceType[]>();

  const to =
    services &&
    DateUtils.addMinutes(
      from,
      ServiceUtils.getTotalDuration(services, masterServices!),
    );

  const validated = to && to <= maxTo;

  const formFilled = clientEmail && from && services;
  const onFormSubmit = () => {
    const createRequest = {
      clientEmail: clientEmail!,
      services: services!,
      from: from?.toISOString(),
    };
    onSubmit(createRequest);
  };

  return (
    <Layout style={styles.container}>
      <Input
        value={clientEmail}
        onChangeText={setClientEmail}
        label="Email клієнта"
        placeholder="Введіть Email клієнта"
        style={styles.input}
      />
      <View style={[styles.timeContainer, styles.input]}>
        <TimePicker time={from} onTimeChange={setFrom} label="Від:" />
        <TimePicker time={to} disabled={true} label="До:" />
      </View>
      <ServiceTypeSelect
        selectedServiceTypes={services}
        onServiceTypesSelected={setServices}
        multiSelect={true}
        label="Послуги"
        placeholder="Оберіть послуги"
        style={styles.input}
      />
      <Button
        onPress={onFormSubmit}
        disabled={!Boolean(formFilled && validated)}
        appearance="ghost"
      >
        Створити
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  timeContainer: {
    width: 260,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 10,
  },
});

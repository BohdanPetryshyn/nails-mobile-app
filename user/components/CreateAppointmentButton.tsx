import React from 'react';
import { AppointmentCreateRequest } from '../entities/appointment';
import { Button, ButtonProps } from '@ui-kitten/components';
import { AppointmentsService } from '../../schedule/api/AppointmentsService';

export default function ({
  createRequest,
  ...buttonProps
}: {
  createRequest: AppointmentCreateRequest;
} & ButtonProps) {
  const createAppointment = () =>
    AppointmentsService.createAppointment(createRequest);
  return (
    <Button {...buttonProps} onPress={createAppointment}>
      Записатись
    </Button>
  );
}
